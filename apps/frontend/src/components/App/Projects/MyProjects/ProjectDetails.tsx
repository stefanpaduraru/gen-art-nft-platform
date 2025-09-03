/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtendedProject } from "../../../../types/project";
import ConfirmDialog from "../../../Common/Dialogs/Confirmation";
import ProjectPresentational from "./ProjectPresentational";
import TransactionConfirmationDialog from "../common/TransactionConfirmationDialog";
import TokenDialog from "../../../Common/Dialogs/TokenDialog";
import { fetchMyProjectDetails } from "../../../../api/app/project";
import { fetchTokenDetails } from "../../../../api/app/token";
import {
  MintWarningTitle,
  TRANSACTION_PENDING,
  TRANSACTION_CONFIRMED,
  USER_NOT_CONNECTED,
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
import CoreContract from "../../../../web3/CoreContract";
import MintContract from "../../../../web3/MintContract";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import { getGalleryByContractName } from "../../../../util/gallery";
import { useAuth } from "../../../../context/UserContext";
import ProjectDetailsSkeleton from "../common/ProjectDetailsSkeleton";
import ConfirmMetamaskTransactionDialog from "../common/ConfirmMetamaskTransactionDialog";
import { Token } from "../../../../types/token";
import TransactionPendingDialog from "../common/TransactionPendingDialog";
import MintWarning from "../common/MintWarning";
import MetaTags from "../../../Common/MetaTags";

function MyProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const { user } = useAuth();
  const [project, setProject] = useState<ExtendedProject>();
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
  const [network, setNetwork] = useState<Network>(Networks.Template);
  const [gallery, setGallery] = useState<MintoriaGallery>(
    MintoriaGalleries.Selected
  );

  const getProjectDetails = useCallback(async () => {
    if (!user.token) {
      errorFetchingData();
      return;
    }
    try {
      const project = await fetchMyProjectDetails(id, user.token);
      setProject(project);

      const renderedTokens = (project.tokens || []).filter(
        (token) => token.rendered
      );
      const randomTokenId = Math.floor(
        Math.random() * (renderedTokens.length || 0)
      );
      const randomToken = renderedTokens[randomTokenId] || null;
      setRandomToken(randomToken);

      let currentNetwork = Networks.Template;
      if (!!project?.mainnetId) {
        currentNetwork = Networks.Mainnet;
      } else if (!!project?.testnetId) {
        currentNetwork = Networks.Testnet;
      }
      setNetwork(currentNetwork);
      setGallery(getGalleryByContractName(project.contract.name));
    } catch (e) {
      errorFetchingData();
      return;
    }
  }, []);

  const errorFetchingData = () => {
    setNotificationMessage("Error fetching project data");
    setNotificationSeverity("error");
    setIsNotificationOpen(true);
  };

  const confirmMintTransaction = async () => {
    setShowConfirmDialog(true);
    setShowConfirmMetamaskTransactionDialog(true);
    if (project) {
      setIsLoading(true);
      sendMintTransaction(project);
    }
  };

  const cancelMintTransaction = () => {
    setShowConfirmDialog(false);
  };

  const handleNetworkCheck = async (network: Network) => {
    const validNetwork = await checkNetworkAndSwitch(network);
    if (!validNetwork) {
      setNotificationMessage("Wrong network");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
    return validNetwork;
  };

  const mintCallback = async () => {
    const network = project?.mainnetProject
      ? Networks.Mainnet
      : Networks.Testnet;

    const userConnected = await isConnected(network);
    if (!userConnected) {
      setNotificationMessage(USER_NOT_CONNECTED);
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;

    setShowConfirmDialog(true);
  };

  const mintSuccess = async (receipt: Web3Receipt) => {
    setIsLoading(false);
    setShowConfirmMetamaskTransactionDialog(false);
    setShowTransactionPendingDialog(false);
    setAwaitingConfirmations(true);
    if (receipt.status) {
      setNotificationMessage(TRANSACTION_CONFIRMED);
    } else {
      setNotificationMessage(TRANSACTION_PENDING);
    }
    setNotificationSeverity("success");
    setIsNotificationOpen(true);

    const latestBlock = await getLatestBlock();
    const currentAddress = project?.isMainnet
      ? project.contract?.address || ""
      : project?.contract?.testnetAddress || "";
    const coreContract = new CoreContract(currentAddress, network);

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

    const chainProject =
      project?.mainnetProject || project?.testnetProject || project;

    // eslint-disable-next-line eqeqeq
    if (_projectId == chainProject?.chainId && _to === account) {
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

  const sendMintTransaction = async (project: ExtendedProject) => {
    setShowConfirmDialog(false);
    const currentAddress = project.isMainnet
      ? project.minterContract?.address || ""
      : project.minterContract?.testnetAddress || "";
    const web3Contract = new MintContract(currentAddress);
    const chainProject =
      project?.mainnetProject || project?.testnetProject || project;
    const projectId = chainProject.chainId || 0;

    web3Contract.purchase(
      projectId,
      chainProject.pricePerTokenInWei,
      mintSuccess,
      mintError,
      mintTransactionHash
    );
    setAwaitingConfirmations(false);
    setShowConfirmMetamaskTransactionDialog(true);
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
          network,
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
        <ProjectPresentational
          project={project}
          randomToken={randomToken}
          mintCallback={mintCallback}
          loading={isLoading}
          gallery={getGalleryByContractName(project.contract?.name || "")}
          network={network}
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
          script={
            (project?.mainnetProject || project?.testnetProject || project)
              ?.script || ""
          }
          gallery={getGalleryByContractName(project?.contract?.name || "")}
          network={network}
          showFullScreenButton={false}
        />
      )}
    </>
  );
}

export default MyProjectDetails;
