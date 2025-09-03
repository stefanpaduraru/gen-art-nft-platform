/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as io from "socket.io-client";
import { Project } from "../../../../types/project";
import ConfirmDialog from "../../../Common/Dialogs/Confirmation";
import GalleryProjectPresentational from "./GalleryProjectPresentational";
import TransactionConfirmationDialog from "../common/TransactionConfirmationDialog";
import TokenDialog from "../../../Common/Dialogs/TokenDialog";
import {
  fetchProjectDetails,
  submitProjectVote,
} from "../../../../api/app/project";
import { fetchTokenDetails } from "../../../../api/app/token";
import {
  MintWarningTitle,
  TRANSACTION_PENDING,
  TRANSACTION_CONFIRMED,
  USER_NOT_CONNECTED,
  MINTING_PAUSED,
} from "../../../../constants/text";
import {
  getLatestBlock,
  getCurrentAccount,
  isConnected,
  checkNetworkAndSwitch,
} from "../../../../util/web3";
import { Web3Error, Web3Event, Web3Receipt } from "../../../../types/web3";
import { useNotification } from "../../../../context/NotificationContext";
import { Network, Networks } from "../../../../types/network";
import { MintoriaGallery } from "../../../../types/galleries";
import CoreContract from "../../../../web3/CoreContract";
import MintContract from "../../../../web3/MintContract";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ProjectDetailsSkeleton from "../common/ProjectDetailsSkeleton";
import ConfirmMetamaskTransactionDialog from "../common/ConfirmMetamaskTransactionDialog";
import { Token } from "../../../../types/token";
import TransactionPendingDialog from "../common/TransactionPendingDialog";
import config from "../../../../config/config";
import MintWarning from "../common/MintWarning";
import MetaTags from "../../../Common/MetaTags";

function GalleryProjectDetails({ gallery }: { gallery: MintoriaGallery }) {
  const { id } = useParams<{ id: string }>();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const [project, setProject] = useState<Project>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [
    showConfirmMetamaskTransactionDialog,
    setShowConfirmMetamaskTransactionDialog,
  ] = useState(false);
  const [showTransactionPendingDialog, setShowTransactionPendingDialog] =
    useState(false);
  const [randomToken, setRandomToken] = useState<Token | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState(-1);
  const [mintedHash, setMintedHash] = useState("");
  const [awaitingConfirmations, setAwaitingConfirmations] = useState(false);
  const [transferConfirmation, setTransferConfirmation] = useState(false);
  const [mintConfirmation, setMintConfirmation] = useState(false);
  const [isTokenWindowOpen, setIsTokenWindowOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getProjectDetails = useCallback(async () => {
    const project = await fetchProjectDetails(id, gallery);
    setProject(project);

    const renderedTokens = (project.tokens || []).filter(
      (token) => token.rendered
    );
    const randomTokenId = Math.floor(
      Math.random() * (renderedTokens.length || 0)
    );
    const randomToken = renderedTokens[randomTokenId] || null;
    setRandomToken(randomToken);
  }, []);

  const confirmMintTransaction = async () => {
    setShowConfirmMetamaskTransactionDialog(true);
    setShowConfirmDialog(false);
    if (project) {
      setIsLoading(true);
      sendMintTransaction(project);
    }
  };

  const cancelMintTransaction = () => {
    setShowConfirmDialog(false);
  };

  const handleNetworkCheck = useCallback(
    async (network: Network) => {
      const validNetwork = await checkNetworkAndSwitch(network);
      if (!validNetwork) {
        setNotificationMessage("Wrong network");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
      return validNetwork;
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const handleUserCheck = useCallback(
    async (network: Network) => {
      const userConnected = await isConnected(network);
      if (!userConnected) {
        setNotificationMessage(USER_NOT_CONNECTED);
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
      return userConnected;
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const mintCallback = async () => {
    const validNetwork = await handleNetworkCheck(Networks.Mainnet);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck(Networks.Mainnet);
    if (!userConnected) return;

    if (project?.paused) {
      setNotificationMessage(MINTING_PAUSED);
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    setShowConfirmDialog(true);
  };

  const mintSuccess = async (receipt: Web3Receipt) => {
    setIsLoading(false);
    setShowConfirmMetamaskTransactionDialog(false);
    setShowTransactionPendingDialog(false);
    if (receipt.status) {
      setNotificationMessage(TRANSACTION_CONFIRMED);
    } else {
      setNotificationMessage(TRANSACTION_PENDING);
    }
    setNotificationSeverity("success");
    setIsNotificationOpen(true);
    setAwaitingConfirmations(true);

    const latestBlock = await getLatestBlock();
    const address = project?.contract?.address;
    const coreContract = new CoreContract(address || "", Networks.Mainnet);
    coreContract.contract.events.Mint(
      {
        filter: {},
        fromBlock: latestBlock,
      },
      callbackMintEvent
    );

    coreContract.contract.events.Transfer(
      {
        filter: {},
        fromBlock: latestBlock,
      },
      callbackTransferEvent
    );
  };

  const callbackMintEvent = async (error: Web3Error, event: Web3Event) => {
    if (error) return;
    const { _projectId, _to, _tokenId } = event.returnValues;
    const account = await getCurrentAccount();
    if (_projectId === id && _to === account) {
      setMintedTokenId(_tokenId);
      setMintConfirmation(true);
    }
  };

  const callbackTransferEvent = async (error: Web3Error, event: Web3Event) => {
    if (error) return;
    const { to } = event.returnValues;
    const account = await getCurrentAccount();
    if (to === account) {
      setTransferConfirmation(true);
    }
  };

  const mintError = (error: Web3Error, receipt: Web3Receipt) => {
    setIsLoading(false);
    setShowConfirmMetamaskTransactionDialog(false);
    setNotificationMessage(
      "Transaction error: " +
        error.message.replace("MetaMask Tx Signature: ", "")
    );
    setNotificationSeverity("error");
    setIsNotificationOpen(true);
  };

  const mintTransactionHash = useCallback((hash: string) => {
    setShowTransactionPendingDialog(true);
    setShowConfirmMetamaskTransactionDialog(false);
  }, []);

  const sendMintTransaction = async (project: Project) => {
    if (!project.chainId) {
      return;
    }
    const currentAddress = project.minterContract?.address || "";
    const web3Contract = new MintContract(currentAddress);
    const projectId = project.chainId;

    web3Contract.purchase(
      projectId,
      project.pricePerTokenInWei,
      mintSuccess,
      mintError,
      mintTransactionHash
    );
  };

  const handleTokenViewClose = () => {
    setIsTokenWindowOpen(false);
    setMintConfirmation(false);
    setTransferConfirmation(false);
    setMintedHash("");
    setMintedTokenId(-1);
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  const getBETokenDetails = async () => {
    if (mintedTokenId >= 0) {
      try {
        const tokenDetails = await fetchTokenDetails(
          mintedTokenId,
          id,
          Networks.Mainnet,
          gallery
        );
        setAwaitingConfirmations(false);
        setIsTokenWindowOpen(true);
        setMintedHash(tokenDetails.hash);

        getProjectDetails();
      } catch (e: any) {
        window.setTimeout(getBETokenDetails, 3000);
      }
    }
  };

  useEffect(() => {
    if (mintConfirmation && transferConfirmation) {
      getBETokenDetails();
    }
  }, [mintConfirmation, transferConfirmation]);

  const handleReCaptchaVerify = useCallback(async () => {
    const action = "vote";
    if (!executeRecaptcha) {
      const token = await window.grecaptcha.execute(config.RECAPTCHA_KEY, {
        action: action,
      });
      return token;
    }

    const token = await executeRecaptcha(action);
    return token;
  }, []);

  const voteCallback = async () => {
    if (project) {
      const token = await handleReCaptchaVerify();
      if (!token) {
        setNotificationMessage(
          "Please complete the captcha challenge in order to vote"
        );
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
        return;
      }

      const result = await submitProjectVote(project.id, token);
      if (result && result.votes >= 0) {
        const newProject = { ...project, votes: result.votes };

        setProject(newProject);
      }
    }
  };

  return (
    <>
      {!project && <ProjectDetailsSkeleton />}
      {project && (
        <MetaTags
          title={project.name}
          imageURL={randomToken?.imageURL}
          pageURL={`/projects/${gallery}/${project.id}`}
          description={project.description}
        />
      )}
      {project && (
        <GalleryProjectPresentational
          project={project}
          tokens={project?.tokens || []}
          randomToken={randomToken}
          mintCallback={mintCallback}
          loading={isLoading}
          gallery={gallery}
          voteCallback={voteCallback}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          confirmCallback={confirmMintTransaction}
          cancelCallback={cancelMintTransaction}
          title={MintWarningTitle}
          description={<MintWarning />}
        />
      )}
      {showConfirmMetamaskTransactionDialog && (
        <ConfirmMetamaskTransactionDialog />
      )}
      {showTransactionPendingDialog && <TransactionPendingDialog />}

      {awaitingConfirmations && (
        <TransactionConfirmationDialog
          confirmations={+transferConfirmation + +mintConfirmation}
        />
      )}
      {!awaitingConfirmations && isTokenWindowOpen && mintedTokenId >= 0 && (
        <TokenDialog
          tokenId={mintedTokenId}
          tokenHash={mintedHash}
          handleClose={handleTokenViewClose}
          script={project?.script || ""}
          gallery={gallery}
          network={Networks.Mainnet}
          showFullScreenButton={false}
        />
      )}
    </>
  );
}

export default GalleryProjectDetails;
