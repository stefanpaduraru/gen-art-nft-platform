import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchContractDetails } from "../../../api/admin/contract";
import { AdminContract } from "../../../types/contract";
import { Web3ContractDetails } from "../../../types/web3Contract";
import ContractDetailsPresentational from "./ContractDetailsPresentational";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { checkNetworkAndSwitch, isConnected } from "../../../util/web3";
import CoreContract from "../../../web3/CoreContract";
import { useNotification } from "../../../context/NotificationContext";
import { Web3Receipt, Web3Error } from "../../../types/web3";
import NewProjectForm from "./NewProjectForm";
import MintTokenForm from "./MintTokenForm";
import { Formik, Form } from "formik";
import { Network, Networks } from "../../../types/network";
import { Web3ProjectDetails } from "../../../types/web3Project";
import { useAuth } from "../../../context/UserContext";
import Routes from "../../../constants/routes";
import { MintoriaGalleries } from "../../../types/galleries";
import { USER_NOT_CONNECTED } from "../../../constants/text";
import { ethers } from "ethers";
import ConfirmMetamaskTransactionDialog from "../../App/Projects/common/ConfirmMetamaskTransactionDialog";
import TransactionPendingDialog from "../../App/Projects/common/TransactionPendingDialog";

type NewProjectValues = {
  name: string;
  artistAddress: string;
  pricePerTokenInWei: string;
  feePercentage: string;
  useStorage: string;
};

const ContractDetails = () => {
  const { id, network } = useParams<{ id: string; network: Network }>();
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const [contract, setContract] = useState<AdminContract>();
  const [showNewProjectForm, setShowNewProjectForm] = useState<boolean>(false);
  const [showProjectDetails, setShowProjectDetails] = useState<boolean>(false);
  const [showMintForm, setShowMintForm] = useState<boolean>(false);
  const [
    showConfirmMetamaskTransactionDialog,
    setShowConfirmMetamaskTransactionDialog,
  ] = useState(false);
  const [showTransactionPendingDialog, setShowTransactionPendingDialog] =
    useState(false);
  const currentAddress =
    network === Networks.Mainnet
      ? contract?.address || ""
      : contract?.testnetAddress || "";

  const [web3ContractDetails, setWeb3ContractDetails] =
    useState<Web3ContractDetails>();

  const [web3ProjectDetails, setWeb3ProjectDetails] =
    useState<Web3ProjectDetails>();

  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
    setNotificationTimeout,
  } = useNotification();

  const getData = useCallback(async () => {
    try {
      const contract = await fetchContractDetails(id, user.token);
      setContract(contract);
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
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const userConnected = await handleUserCheck();
    if (!userConnected) return;

    if (contract) {
      const web3Contract = new CoreContract(currentAddress, network);
      const contractDetails = await web3Contract.getContractDetails();
      if (contractDetails) {
        setWeb3ContractDetails(contractDetails);
      }
    }
  }, [contract, currentAddress, handleNetworkCheck, handleUserCheck, network]);

  const getWeb3ProjectDetails = useCallback(
    async (projectId: number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;

      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        const projectDetails = await web3Contract.getProjectDetails(projectId);
        if (projectDetails) {
          setWeb3ProjectDetails(projectDetails);
        }
      }
    },
    [contract, currentAddress, handleNetworkCheck, handleUserCheck, network]
  );

  useEffect(() => {
    contract && contract.type === "core" && getWeb3ContractDetails();
  }, [contract, getWeb3ContractDetails]);

  const contractFetchValueSucces = useCallback(
    (result: any) => {
      setNotificationMessage(`${result}`);
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      setShowNewProjectForm(false);
    },
    [
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      setShowNewProjectForm,
    ]
  );

  const contractUpdateSucces = useCallback(
    (receipt: Web3Receipt) => {
      setNotificationMessage("Contract updated");
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      setShowNewProjectForm(false);
      setShowConfirmMetamaskTransactionDialog(false);
      setShowTransactionPendingDialog(false);
    },
    [
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      setShowNewProjectForm,
    ]
  );

  const projectCreateSucces = useCallback(
    (receipt: Web3Receipt) => {
      const projectId = receipt.events.CreateProject.returnValues._projectId;

      setNotificationMessage(`Project created: ${projectId}`);
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      setShowNewProjectForm(false);
      setNotificationTimeout(10000);
      setShowConfirmMetamaskTransactionDialog(false);
      setShowTransactionPendingDialog(false);
    },
    [
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      setNotificationTimeout,
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

  const mintTokenSuccess = useCallback(
    (receipt: Web3Receipt) => {
      setNotificationMessage(`Token minted`);
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      setShowMintForm(false);
      setNotificationTimeout(10000);
      setShowConfirmMetamaskTransactionDialog(false);
    },
    [
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      setNotificationTimeout,
    ]
  );

  const mintTokenError = useCallback(
    (error: Web3Error, receipt: Web3Receipt) => {
      setNotificationMessage(
        "Error minting token: " +
          error.message.replace("MetaMask Tx Signature: ", "")
      );
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      setShowConfirmMetamaskTransactionDialog(false);
      setShowTransactionPendingDialog(false);
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const updateRandomizerAddress = useCallback(
    async (newAddress: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.setRandomizerAddress(
          newAddress as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const updateAdminPercentageAddress = useCallback(
    async (newPercentage: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.setAdminFeeSplitPercentage(
          newPercentage as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const updateMNAAddress = useCallback(
    async (newAddress: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.setMintoriaAddress(
          newAddress as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const updateMNAPercentage = useCallback(
    async (newPercentage: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.setMintoriaFeeSplitPercentage(
          newPercentage as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const createNewProject = useCallback(
    async (values: NewProjectValues) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const priceInWei = ethers.utils
          .parseEther(`${values.pricePerTokenInWei}`)
          .toString();
        const web3Contract = new CoreContract(currentAddress, network);
        await web3Contract.createProject(
          values.artistAddress,
          values.name,
          priceInWei,
          values.feePercentage,
          values.useStorage === "yes",
          projectCreateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
      projectCreateSucces,
    ]
  );

  const addOperator = useCallback(
    async (newValue: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.addOperatingRights(
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const checkOperator = useCallback(
    async (newValue: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        const result = await web3Contract.checkOperatingRights(
          newValue as string
        );

        contractFetchValueSucces(result);
      }
    },
    [
      contract,
      contractFetchValueSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const removeOperator = useCallback(
    async (newValue: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.removeOperatingRights(
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const addMinter = useCallback(
    async (newValue: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.addMintRights(
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const checkMinter = useCallback(
    async (newValue: string | number) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        const result = await web3Contract.checkMintRights(newValue as string);

        contractFetchValueSucces(result);
      }
    },
    [
      contract,
      contractFetchValueSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const removeMinter = useCallback(
    async (newValue: string | number) => {
      if (contract) {
        const validNetwork = await handleNetworkCheck(network);
        if (!validNetwork) return;
        const userConnected = await handleUserCheck();
        if (!userConnected) return;
        const web3Contract = new CoreContract(currentAddress, network);
        web3Contract.removeMintRights(
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      contractUpdateEror,
      contractUpdateSucces,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      network,
    ]
  );

  const mintCallback = useCallback(
    async (fromAddress: string, projectId: number, toAddress: string) => {
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const userConnected = await handleUserCheck();
      if (!userConnected) return;
      if (contract) {
        const web3Contract = new CoreContract(currentAddress, network);
        await web3Contract.mintToken(
          fromAddress,
          projectId,
          toAddress,
          mintTokenSuccess,
          mintTokenError,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [
      contract,
      contractUpdateConfirmation,
      currentAddress,
      handleNetworkCheck,
      handleUserCheck,
      mintTokenError,
      mintTokenSuccess,
      network,
    ]
  );

  const initialValues = {
    name: "",
    artistAddress: "",
    pricePerTokenInWei: "0",
    useStorage: "no",
    feePercentage: "0",
    gallery: MintoriaGalleries.Selected,
  };

  const validateForm = (values: Partial<NewProjectValues>) => {
    const errors: Partial<NewProjectValues> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.artistAddress) {
      errors.artistAddress = "Artist address is required";
    }

    if (!values.pricePerTokenInWei) {
      errors.pricePerTokenInWei = "Price per token is required";
    }

    if (!values.feePercentage) {
      errors.feePercentage = "Project fee percentage is required";
    }

    if (!values.useStorage) {
      errors.useStorage = "Use IPFS Storage is required";
    }

    return errors;
  };

  const onSubmit = async (
    values: NewProjectValues,
    { setSubmitting }: { setSubmitting: Function }
  ) => {
    setSubmitting(true);
    try {
      createNewProject(values);
    } catch (e) {
      setNotificationMessage("Error creating project");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  };

  const closeProjectDetailsDialog = () => {
    setShowProjectDetails(false);
    setWeb3ProjectDetails(undefined);
  };

  return (
    <>
      {contract && (
        <ContractDetailsPresentational
          contract={contract}
          web3ContractDetails={web3ContractDetails}
          updateRandomizerAddress={updateRandomizerAddress}
          updateAdminPercentageAddress={updateAdminPercentageAddress}
          updateMNAAddress={updateMNAAddress}
          updateMNAPercentage={updateMNAPercentage}
          toggleShowNewProjectForm={setShowNewProjectForm}
          toggleShowProjectDetails={setShowProjectDetails}
          toggleShowMintForm={setShowMintForm}
          addOperator={addOperator}
          checkOperator={checkOperator}
          removeOperator={removeOperator}
          addMinter={addMinter}
          checkMinter={checkMinter}
          removeMinter={removeMinter}
          network={network}
        />
      )}
      {showNewProjectForm && (
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting, values, setValues }) => (
            <Form>
              <NewProjectForm
                submitForm={submitForm}
                isSubmitting={isSubmitting}
                handleClose={() => setShowNewProjectForm(false)}
              />
            </Form>
          )}
        </Formik>
      )}
      {showProjectDetails && (
        <ProjectDetailsDialog
          projectDetails={web3ProjectDetails}
          handleClose={closeProjectDetailsDialog}
          fetchDetailsCallback={getWeb3ProjectDetails}
        />
      )}
      {showMintForm && (
        <MintTokenForm
          handleClose={() => setShowMintForm(false)}
          mintCallback={mintCallback}
        />
      )}
      {showConfirmMetamaskTransactionDialog && (
        <ConfirmMetamaskTransactionDialog />
      )}

      {showTransactionPendingDialog && <TransactionPendingDialog />}
    </>
  );
};
export default ContractDetails;
