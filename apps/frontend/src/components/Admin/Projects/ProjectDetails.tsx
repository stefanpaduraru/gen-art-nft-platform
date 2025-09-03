import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchAdminProjectDetails,
  adminAddProjectMainnetId,
  adminAddProjectTestnetId,
  updateTransferRequest,
} from "../../../api/admin/project";
import { Web3ProjectDetails } from "../../../types/web3Project";
import ProjectDetailsPresentational from "./ProjectDetailsPresentational";
import { checkNetworkAndSwitch, isConnected } from "../../../util/web3";
import CoreContract from "../../../web3/CoreContract";
import { useNotification } from "../../../context/NotificationContext";
import { Web3Receipt, Web3Error } from "../../../types/web3";
import { ExtendedProject } from "../../../types/project";
import { Network, Networks } from "../../../types/network";
import { MintoriaGalleries } from "../../../types/galleries";
import { useAuth } from "../../../context/UserContext";
import Routes from "../../../constants/routes";
import { TransferStateTypes } from "../../../types/transferRequest";
import { USER_NOT_CONNECTED } from "../../../constants/text";
import ConfirmMetamaskTransactionDialog from "../../App/Projects/common/ConfirmMetamaskTransactionDialog";
import TransactionPendingDialog from "../../App/Projects/common/TransactionPendingDialog";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<ExtendedProject>();
  const [chainId, setChainId] = useState<number>(-1);
  const [network, setNetwork] = useState<Network>();
  const [
    showConfirmMetamaskTransactionDialog,
    setShowConfirmMetamaskTransactionDialog,
  ] = useState(false);
  const [showTransactionPendingDialog, setShowTransactionPendingDialog] =
    useState(false);
  const [web3ProjectDetails, setWeb3ProjectDetails] =
    useState<Web3ProjectDetails>();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const getData = useCallback(async () => {
    try {
      const project = await fetchAdminProjectDetails(id, user.token);
      setProject(project);
      let chainID;

      if (project.isDeployed) {
        chainID = project.isMainnet
          ? project.mainnetProject?.chainId
          : project.testnetProject?.chainId;
        setNetwork(project.isMainnet ? Networks.Mainnet : Networks.Testnet);
      } else {
        setNetwork(Networks.Template);
      }
      setChainId(chainID || -1);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    id,
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

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

  const handleUserCheck = useCallback(async () => {
    if (!network) return;
    const userConnected = await isConnected(network);
    if (!userConnected) {
      setNotificationMessage(USER_NOT_CONNECTED);
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
    return userConnected;
  }, [
    network,
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
  ]);

  const getWeb3ContractDetails = useCallback(async () => {
    if (!network) return;
    if (!project || !project.isDeployed) return;

    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;

    const contractAddress = project.isMainnet
      ? project.contract.address
      : project.contract.testnetAddress;

    const web3Contract = new CoreContract(contractAddress, network);
    const projectDetails = await web3Contract.getProjectDetails(chainId);
    setWeb3ProjectDetails(projectDetails);
  }, [chainId, handleNetworkCheck, handleUserCheck, network, project]);

  useEffect(() => {
    project &&
      project.contract &&
      project.contract.type === "core" &&
      getWeb3ContractDetails();
  }, [project, getWeb3ContractDetails]);

  const contractUpdateSucces = useCallback(
    (receipt: Web3Receipt) => {
      setNotificationMessage("Contract updated");
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      getWeb3ContractDetails();
      setShowConfirmMetamaskTransactionDialog(false);
      setShowTransactionPendingDialog(false);
    },
    [
      getWeb3ContractDetails,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
    ]
  );

  const contractUpdateEror = useCallback(
    (error: Web3Error, receipt: Web3Receipt) => {
      setNotificationMessage(
        "Error updating contract: " +
          error.message.replace("MetaMask Tx Signature: ", "")
      );
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      setShowConfirmMetamaskTransactionDialog(false);
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const contractUpdateConfirmation = useCallback((hash: string) => {
    setShowTransactionPendingDialog(true);
    setShowConfirmMetamaskTransactionDialog(false);
  }, []);

  const updateProjectName = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;

      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectName(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      network,
      handleNetworkCheck,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateArtistAddress = useCallback(
    async (newAddress: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectArtistAddress(
          chainId,
          newAddress as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      network,
      handleNetworkCheck,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateArtistName = useCallback(
    async (newName: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectArtistName(
          chainId,
          newName as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      network,
      handleNetworkCheck,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateDescription = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectDescription(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updatePricePerTokenInWei = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectPricePerTokenInWei(
          chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateWebsite = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectWebsite(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateLicense = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectLicense(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateMaxIterations = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectMaxIterations(
          chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateMaxTokensPerAddress = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectMaxTokensPerAddress(
          chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const setProjectFeePercentage = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectFeePercentage(
          chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateCollaboratorAddress = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      const percentage = web3ProjectDetails?.collaboratorPercentage;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectCollaborator(
          chainId,
          newValue as string,
          percentage || 0,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      web3ProjectDetails?.collaboratorPercentage,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateCollaboratorPercentage = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      const collaboratorAddress = web3ProjectDetails?.collaboratorAddress;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectCollaborator(
          chainId,
          collaboratorAddress as string,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      web3ProjectDetails?.collaboratorAddress,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateSecondaryPercentage = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectRoyaltyFeePercentage(
          chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateProjectScriptChunk = useCallback(
    async (index: number, newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);

        web3Contract.updateProjectScriptChunk(
          chainId,
          index,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const addProjectScriptChunk = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.addProjectScriptChunk(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const removeLastProjectScriptChunk = useCallback(async () => {
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;

    if (project && project.contract) {
      const address =
        network === Networks.Mainnet
          ? project.contract.address
          : project.contract.testnetAddress;
      const web3Contract = new CoreContract(address, network);
      web3Contract.removeLastProjectScriptChunk(
        chainId,
        contractUpdateSucces,
        contractUpdateEror,
        contractUpdateConfirmation
      );
      setShowConfirmMetamaskTransactionDialog(true);
    }
  }, [
    handleNetworkCheck,
    network,
    handleUserCheck,
    project,
    chainId,
    contractUpdateSucces,
    contractUpdateEror,
    contractUpdateConfirmation,
  ]);

  const toggleActiveProject = useCallback(async () => {
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;
    if (project && project.contract) {
      const address =
        network === Networks.Mainnet
          ? project.contract.address
          : project.contract.testnetAddress;
      const web3Contract = new CoreContract(address, network);
      web3Contract.toggleActiveProject(
        chainId,
        contractUpdateSucces,
        contractUpdateEror,
        contractUpdateConfirmation
      );
      setShowConfirmMetamaskTransactionDialog(true);
    }
  }, [
    handleNetworkCheck,
    network,
    handleUserCheck,
    project,
    chainId,
    contractUpdateSucces,
    contractUpdateEror,
    contractUpdateConfirmation,
  ]);

  const togglePausedProject = useCallback(async () => {
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;
    if (project && project.contract) {
      const address =
        network === Networks.Mainnet
          ? project.contract.address
          : project.contract.testnetAddress;
      const web3Contract = new CoreContract(address, network);
      web3Contract.togglePausedProject(
        chainId,
        contractUpdateSucces,
        contractUpdateEror,
        contractUpdateConfirmation
      );
      setShowConfirmMetamaskTransactionDialog(true);
    }
  }, [
    handleNetworkCheck,
    network,
    handleUserCheck,
    project,
    chainId,
    contractUpdateSucces,
    contractUpdateEror,
    contractUpdateConfirmation,
  ]);

  const toggleLockedProject = useCallback(async () => {
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;
    if (project && project.contract) {
      const address =
        network === Networks.Mainnet
          ? project.contract.address
          : project.contract.testnetAddress;
      const web3Contract = new CoreContract(address, network);
      web3Contract.toggleLockedProject(
        chainId,
        contractUpdateSucces,
        contractUpdateEror,
        contractUpdateConfirmation
      );
      setShowConfirmMetamaskTransactionDialog(true);
    }
  }, [
    handleNetworkCheck,
    network,
    handleUserCheck,
    project,
    chainId,
    contractUpdateSucces,
    contractUpdateEror,
    contractUpdateConfirmation,
  ]);

  const updateBaseURI = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectBaseURI(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateBaseIpfsURI = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectBaseIpfsURI(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const updateProjectScriptMetadata = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (project && project.contract) {
        const address =
          network === Networks.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjecScriptMetadata(
          chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      handleNetworkCheck,
      network,
      handleUserCheck,
      project,
      chainId,
      contractUpdateSucces,
      contractUpdateEror,
      contractUpdateConfirmation,
    ]
  );

  const addProjectMainnetId = useCallback(
    async (chainId: number) => {
      try {
        if (project && user.token) {
          await adminAddProjectMainnetId(chainId, project.id, user.token);
          setNotificationMessage("Project updated");
          setNotificationSeverity("success");
          setIsNotificationOpen(true);
          getData();
        }
      } catch (e) {
        setNotificationMessage("Error updating project");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
    },
    [
      getData,
      project,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      user.token,
    ]
  );

  const addProjectTestnetId = useCallback(
    async (chainId: number) => {
      try {
        if (project && user.token) {
          await adminAddProjectTestnetId(chainId, project.id, user.token);
          setNotificationMessage("Project updated");
          setNotificationSeverity("success");
          setIsNotificationOpen(true);
          getData();
        }
      } catch (e) {
        setNotificationMessage("Error updating project");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
    },
    [
      getData,
      project,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      user.token,
    ]
  );

  const updateRequestCallback = useCallback(
    async (id: number, state: TransferStateTypes, comments: string) => {
      if (project) {
        try {
          if (user.token) {
            await updateTransferRequest(
              project.id,
              id,
              state,
              comments,
              user.token
            );
            setNotificationMessage("Project updated");
            setNotificationSeverity("success");
            setIsNotificationOpen(true);
            getData();
          }
        } catch (e) {
          setNotificationMessage("Error updating project");
          setNotificationSeverity("error");
          setIsNotificationOpen(true);
        }
      }
    },
    [
      getData,
      project,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      user.token,
    ]
  );

  return (
    <>
      {project && (
        <ProjectDetailsPresentational
          project={project}
          web3ProjectDetails={web3ProjectDetails}
          updateProjectName={updateProjectName}
          updateArtistAddress={updateArtistAddress}
          updateArtistName={updateArtistName}
          updateDescription={updateDescription}
          updateWebsite={updateWebsite}
          updateLicense={updateLicense}
          updateMaxIterations={updateMaxIterations}
          updateMaxTokensPerAddress={updateMaxTokensPerAddress}
          updateCollaboratorAddress={updateCollaboratorAddress}
          updateCollaboratorPercentage={updateCollaboratorPercentage}
          updateSecondaryPercentage={updateSecondaryPercentage}
          updateProjectScriptChunk={updateProjectScriptChunk}
          addProjectScriptChunk={addProjectScriptChunk}
          removeLastProjectScriptChunk={removeLastProjectScriptChunk}
          toggleActiveProject={toggleActiveProject}
          togglePausedProject={togglePausedProject}
          toggleLockedProject={toggleLockedProject}
          updatePricePerTokenInWei={updatePricePerTokenInWei}
          updateProjectBaseURI={updateBaseURI}
          updateProjectBaseIpfsURI={updateBaseIpfsURI}
          updateProjectScriptMetadata={updateProjectScriptMetadata}
          gallery={
            project.contract.name === "Mintoria Selected"
              ? MintoriaGalleries.Selected
              : MintoriaGalleries.OpenWorld
          }
          addProjectMainnetId={addProjectMainnetId}
          addProjectTestnetId={addProjectTestnetId}
          updateRequestCallback={updateRequestCallback}
          setProjectFeePercentage={setProjectFeePercentage}
        />
      )}

      {showConfirmMetamaskTransactionDialog && (
        <ConfirmMetamaskTransactionDialog />
      )}

      {showTransactionPendingDialog && <TransactionPendingDialog />}
    </>
  );
};
export default ProjectDetails;
