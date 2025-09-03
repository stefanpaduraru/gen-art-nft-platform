/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DropType,
  ExtendedProject,
  ProjectMetadata,
  ProjectTypes,
} from "../../../../types/project";
import ProjectEditPresentational from "./ProjectEditPresentational";
import ScriptView from "./ScriptView";
import {
  fetchMyProjectEdit,
  projectRequestTransfer,
  updateProject,
  updateProjectSettings,
} from "../../../../api/app/project";
import { DEFAULT_ROYALTY_PERCENTAGE } from "../../../../constants/default";
import { Formik, Form } from "formik";
import { ethers } from "ethers";
import { useAuth } from "../../../../context/UserContext";
import ProjectValues from "./ProjectValues.interface";
import { useNotification } from "../../../../context/NotificationContext";
import { Network, Networks } from "../../../../types/network";
import { checkNetworkAndSwitch, isConnected } from "../../../../util/web3";
import CoreContract from "../../../../web3/CoreContract";
import { Web3ProjectDetails } from "../../../../types/web3Project";
import { Web3Error, Web3Receipt } from "../../../../types/web3";
import { TransferStateTypes } from "../../../../types/transferRequest";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { MintoriaGallery } from "../../../../types/galleries";
import { getGalleryByContractName } from "../../../../util/gallery";
import config from "../../../../config/config";
import { defaultStringMetadata } from "../../../../util/project";
import ConfirmMetamaskTransactionDialog from "../common/ConfirmMetamaskTransactionDialog";
import TransactionPendingDialog from "../common/TransactionPendingDialog";
import MetaTags from "../../../Common/MetaTags";
import getLogoURL from "../../../../util/logo";

/* 
const validationSchema = yup.object({
  name: yup
    .string()
    .min(8, "Project name should be of minimum 8 characters length")
    .required("Project name is required"),
  description: yup
    .string()
    .min(100, "Project descriptions should be of minimum 100 characters length")
    .required("Project description is required"),
  website: yup.string().required("Website is required"),
  maxIterations: yup
    .number()
    .max(100000)
    .required("Max iterations is required"),
  pricePerTokenInWei: yup
    .number()
    .max(100)
    .required("Price per token is required"),
}); */

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();
  const { formatEther } = ethers.utils;
  const [project, setProject] = useState<ExtendedProject>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(true);
  const [
    showConfirmMetamaskTransactionDialog,
    setShowConfirmMetamaskTransactionDialog,
  ] = useState(false);
  const [showTransferButton, setShowTransferButton] = useState(false);
  const [showTransactionPendingDialog, setShowTransactionPendingDialog] =
    useState(false);
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const [isScriptViewShown, setIsScriptViewShown] = useState<boolean>(false);
  const [testnetProjectDetails, setTestnetProjectDetails] =
    useState<Web3ProjectDetails>();

  const [mainnetProjectDetails, setMainnetProjectDetails] =
    useState<Web3ProjectDetails>();

  const [network, setNetwork] = useState<Network>();
  const [gallery, setGallery] = useState<MintoriaGallery>();

  const getProjectDetails = useCallback(async () => {
    if (!user.token) {
      errorFetchingData();
      return;
    }
    try {
      const project = await fetchMyProjectEdit(id, user.token);
      setNetwork(project.isMainnet ? Networks.Mainnet : Networks.Testnet);
      setProject(project);
      setGallery(getGalleryByContractName(project.contract.name));
      if (!project.testnetId && !project.mainnetId) {
        setIsLoading(false);
      }
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

  const shouldShowTransferButton = (project: ExtendedProject) => {
    const chainProject =
      project.mainnetProject || project.testnetProject || project;
    const metadata: ProjectMetadata = JSON.parse(project.metadata);

    return (
      chainProject.type !== ProjectTypes.Mainnet &&
      !!chainProject.name &&
      !!chainProject.description &&
      !!chainProject.pricePerTokenInWei &&
      !!chainProject.license &&
      !!chainProject.maxIterations &&
      !!chainProject.baseURI &&
      !!metadata?.scriptType &&
      !!metadata?.aspectRatio &&
      !!chainProject.script &&
      !!(chainProject.type === ProjectTypes.Template
        ? chainProject.features.length
        : true) &&
      (chainProject.type === ProjectTypes.Template
        ? !!project.termsAccepted
        : true) &&
      !project?.transferRequests?.filter(
        (t) => t.state === TransferStateTypes.Created
      ).length &&
      !project?.transferRequests?.filter(
        (t) => t.state === TransferStateTypes.Denied
      ).length
    );
  };

  const getTestnetProjectDetails = useCallback(async () => {
    if (!project || !project.testnetProject || !project.testnetProject.chainId)
      return;
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const chainId = project.testnetProject.chainId;
    const userConnected = await isConnected(network);
    const canView = userConnected;

    if (canView) {
      setIsLoading(true);
      const contractAddress = project.contract.testnetAddress;
      const web3Contract = new CoreContract(contractAddress, network);
      const projectDetails = await web3Contract.getProjectDetails(chainId);

      setTestnetProjectDetails(projectDetails);
      if (!project.mainnetProject) {
        setIsLoading(false);
      }
    }
  }, [project]);

  const getMainnetProjectDetails = useCallback(async () => {
    if (!project || !project.mainnetProject || !project.mainnetProject.chainId)
      return;
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;

    const chainId = project.mainnetProject.chainId;
    const userConnected = await isConnected(network);
    const canView = userConnected;

    if (canView) {
      setIsLoading(true);
      const contractAddress = project.contract.address;
      const web3Contract = new CoreContract(contractAddress, network);
      const projectDetails = await web3Contract.getProjectDetails(chainId);

      setMainnetProjectDetails(projectDetails);
      setIsLoading(false);
    }
  }, [project]);

  const metadata = JSON.parse(
    project?.metadata || defaultStringMetadata
  ) as ProjectMetadata;

  const baseURI = project?.isMainnet
    ? `${config.API_URL}/token/${gallery}/`
    : `${config.API_URL}/token/${gallery}/testnet/`;

  const initialValues = {
    name: project?.name || "",
    description: project?.description || "",
    website: project?.website || "",
    maxIterations: project?.maxIterations || "0",
    pricePerTokenInEth: formatEther(project?.pricePerTokenInWei || "0"),
    startingAt: project?.startingAt || new Date(),
    license: project?.license || "",
    scriptType: metadata.scriptType || "",
    aspectRatio: `${metadata.aspectRatio}` || "1",
    script: project?.script || "",
    collaboratorAddress: project?.collaboratorAddress || "",
    collaboratorPercentage: project?.collaboratorPercentage || 0,
    royaltyFeePercentage:
      project?.royaltyFeePercentage || DEFAULT_ROYALTY_PERCENTAGE,
    maxTokensPerAddress: project?.maxTokensPerAddress || 0,
    metadata: metadata,
    active: project?.active || false,
    paused: project?.paused || true,
    locked: project?.locked || false,
    useStorage: project?.useStorage || false,
    deployed: project?.deployed || false,
    features: project?.features || [],
    newLabel: "",
    baseURI: baseURI,
    termsAccepted: project?.termsAccepted,
  };

  const onSubmit = async (
    values: Partial<ProjectValues>,
    { setSubmitting }: { setSubmitting: Function }
  ) => {
    if (!user.isAuthenticated || !user.token) {
      setNotificationMessage("You are not logged in");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      setSubmitting(false);
      return;
    }

    const captchaToken = await handleReCaptchaVerify("update_project");
    if (!captchaToken) {
      setNotificationMessage("Please complete the captcha challenge");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }
    const data = {
      ...values,
      metadata: {
        scriptType: values.scriptType,
        aspectRatio: values.aspectRatio
          ? parseFloat(values.aspectRatio)
          : undefined,
      },
      pricePerTokenInWei: ethers.utils
        .parseEther(`${values.pricePerTokenInEth}` || "0")
        .toString(),
    };
    setSubmitting(true);
    const { token } = user;

    const response = await updateProject(
      `${project?.id}`,
      data,
      token,
      captchaToken
    );

    if (response) {
      setNotificationMessage("Project updated");
      setNotificationSeverity("success");
      setProject(response);
    } else {
      setNotificationMessage("Failed to update the project");
      setNotificationSeverity("error");
    }
    setIsNotificationOpen(true);
    setSubmitting(false);
  };

  const validateForm = (values: Partial<ProjectValues>) => {
    const errors: Partial<ProjectValues> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (values.name && values.name.length < 3) {
      errors.name = "Project name must be at least 3 characters in length";
    }
    if (!values.maxIterations || values.maxIterations < 1) {
      errors.maxIterations = "Max iterations must be greater than zero";
    }
    return errors;
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  useEffect(() => {
    if (project) {
      setShowTransferButton(shouldShowTransferButton(project));
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      if (project.mainnetProject) {
        getMainnetProjectDetails();
      } else if (project.testnetProject) {
        getTestnetProjectDetails();
      }
    }
  }, [project]);

  const executeScriptCallback = () => {
    setIsScriptViewShown(true);
  };

  const closeScriptViewWindow = () => {
    setIsScriptViewShown(false);
  };

  const contractUpdateSucces = useCallback(
    (receipt: Web3Receipt) => {
      setShowConfirmMetamaskTransactionDialog(false);
      setShowTransactionPendingDialog(false);
      setNotificationMessage("Project updated");
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      getTestnetProjectDetails();
      getMainnetProjectDetails();
    },
    [
      getTestnetProjectDetails,
      getMainnetProjectDetails,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
    ]
  );

  const contractUpdateEror = useCallback(
    (error: Web3Error, receipt: Web3Receipt) => {
      setShowConfirmMetamaskTransactionDialog(false);
      setNotificationMessage(
        "Error updating contract: " +
          error.message.replace("MetaMask Tx Signature: ", "")
      );
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const contractUpdateConfirmation = useCallback((hash: string) => {
    setShowTransactionPendingDialog(true);
    setShowConfirmMetamaskTransactionDialog(false);
  }, []);

  const handleNetworkCheck = async (network: Network) => {
    const validNetwork = await checkNetworkAndSwitch(network);
    if (!validNetwork) {
      setNotificationMessage("Wrong network");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
    return validNetwork;
  };

  const updateProjectName = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;

      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectName(
          chainProject.chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );

        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateArtistName = useCallback(
    async (newName: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectArtistName(
          chainProject.chainId,
          newName as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateDescription = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectDescription(
          chainProject.chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateWebsite = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectWebsite(
          chainProject.chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updatePricePerTokenInWei = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectPricePerTokenInWei(
          chainProject.chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateLicense = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectLicense(
          chainProject.chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateMaxIterations = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectMaxIterations(
          chainProject.chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateMaxTokensPerAddress = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectMaxTokensPerAddress(
          chainProject.chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateSecondaryPercentage = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjectRoyaltyFeePercentage(
          chainProject.chainId,
          newValue as number,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateCollaboratorInfo = useCallback(
    async (address: string, percentage: number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const contractAddress =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(contractAddress, network);
        web3Contract.setProjectCollaborator(
          chainProject.chainId,
          address,
          percentage,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateBaseURI = useCallback(
    async (uri: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const contractAddress =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(contractAddress, network);
        web3Contract.setProjectBaseURI(
          chainProject.chainId,
          uri as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const addScriptChunk = useCallback(
    async (scriptChunk: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const contractAddress =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(contractAddress, network);
        web3Contract.addProjectScriptChunk(
          chainProject.chainId,
          scriptChunk as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const updateProjectScriptChunk = useCallback(
    async (index: number, newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const contractAddress =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(contractAddress, network);
        web3Contract.updateProjectScriptChunk(
          chainProject.chainId,
          index,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const removeLastProjectScriptChunk = useCallback(async () => {
    if (!network) return;
    const validNetwork = await handleNetworkCheck(network);
    if (!validNetwork) return;
    const chainProject = project?.mainnetProject || project?.testnetProject;
    if (!chainProject) {
      return;
    }
    if (chainProject && chainProject.contract && chainProject.chainId) {
      const contractAddress =
        chainProject.type === ProjectTypes.Mainnet
          ? project.contract.address
          : project.contract.testnetAddress;
      const web3Contract = new CoreContract(contractAddress, network);
      web3Contract.removeLastProjectScriptChunk(
        chainProject.chainId,
        contractUpdateSucces,
        contractUpdateEror,
        contractUpdateConfirmation
      );
      setShowConfirmMetamaskTransactionDialog(true);
    }
  }, [project, contractUpdateSucces, contractUpdateEror]);

  const updateMetadata = useCallback(
    async (newValue: string | number) => {
      if (!network) return;
      const validNetwork = await handleNetworkCheck(network);
      if (!validNetwork) return;
      const chainProject = project?.mainnetProject || project?.testnetProject;
      if (!chainProject) {
        return;
      }
      if (chainProject && chainProject.contract && chainProject.chainId) {
        const address =
          chainProject.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const web3Contract = new CoreContract(address, network);
        web3Contract.setProjecScriptMetadata(
          chainProject.chainId,
          newValue as string,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [project, contractUpdateSucces, contractUpdateEror]
  );

  const requestTransfer = async () => {
    if (!user.isAuthenticated || !user.token) {
      setNotificationMessage("You are not logged in");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    const captchaToken = await handleReCaptchaVerify("transfer_project");
    if (!captchaToken) {
      setNotificationMessage("Please complete the captcha challenge");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    const { token } = user;
    const response = await projectRequestTransfer(
      `${project?.id}`,
      token,
      captchaToken
    );

    if (response) {
      setNotificationMessage("Transfer requested");
      setNotificationSeverity("success");
      getProjectDetails();
    } else {
      setNotificationMessage("Failed to request transfer");
      setNotificationSeverity("error");
    }
    setIsNotificationOpen(true);
  };

  const handleReCaptchaVerify = useCallback(
    async (action: "update_project" | "transfer_project") => {
      if (!executeRecaptcha) {
        const token = await window.grecaptcha.execute(config.RECAPTCHA_KEY, {
          action: action,
        });
        return token;
      }

      const token = await executeRecaptcha(action);
      return token;
    },
    []
  );

  const aspectRatio = parseFloat(`${metadata.aspectRatio}` || "1");

  const submitProjectSettings = async (
    dropType: DropType,
    dropDetails: string,
    additionalDetails: string,
    renderDelay: number
  ) => {
    if (!user.isAuthenticated || !user.token) {
      setNotificationMessage("You are not logged in");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    const captchaToken = await handleReCaptchaVerify("update_project");
    if (!captchaToken) {
      setNotificationMessage("Please complete the captcha challenge");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
      return;
    }

    const chainProject =
      project?.mainnetProject || project?.testnetProject || project;
    if (!chainProject) {
      return;
    }
    const data = { dropType, dropDetails, additionalDetails, renderDelay };
    const response = await updateProjectSettings(
      chainProject.id,
      data,
      user.token,
      captchaToken
    );

    if (response) {
      setNotificationMessage("Project updated");
      setNotificationSeverity("success");
      setProject(response);
    } else {
      setNotificationMessage("Failed to update the project");
      setNotificationSeverity("error");
    }
    setIsNotificationOpen(true);
  };

  return (
    <>
      {project && (
        <MetaTags
          title={project.name}
          imageURL={getLogoURL()}
          pageURL={`/projects/${gallery}/${project.id}`}
          description={project.description}
        />
      )}
      {project &&
        gallery &&
        (!project.mainnetProject && !project.testnetProject ? (
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, values, setValues }) => (
              <Form>
                <ProjectEditPresentational
                  executeScriptCallback={executeScriptCallback}
                  showViewButton={!!project.script && !!project.script?.length}
                  project={project}
                  submitCallback={submitForm}
                  isSubmitting={isSubmitting}
                  values={values}
                  setValues={setValues}
                  testnetProjectDetails={testnetProjectDetails}
                  mainnetProjectDetails={mainnetProjectDetails}
                  isLoading={isLoading}
                  requestTransfer={requestTransfer}
                  showTransferButton={showTransferButton}
                  submitProjectSettings={submitProjectSettings}
                />
              </Form>
            )}
          </Formik>
        ) : (
          <ProjectEditPresentational
            executeScriptCallback={executeScriptCallback}
            showViewButton={!!project.script && !!project.script?.length}
            project={project}
            submitCallback={() => {}}
            requestTransfer={requestTransfer}
            isSubmitting={false}
            values={initialValues}
            setValues={() => {}}
            testnetProjectDetails={testnetProjectDetails}
            mainnetProjectDetails={mainnetProjectDetails}
            updateProjectName={updateProjectName}
            updateArtistName={updateArtistName}
            updateDescription={updateDescription}
            updateWebsite={updateWebsite}
            updatePricePerTokenInWei={updatePricePerTokenInWei}
            updateLicense={updateLicense}
            updateMaxIterations={updateMaxIterations}
            updateMaxTokensPerAddress={updateMaxTokensPerAddress}
            updateSecondaryPercentage={updateSecondaryPercentage}
            updateCollaboratorInfo={updateCollaboratorInfo}
            addScriptChunk={addScriptChunk}
            updateProjectScriptChunk={updateProjectScriptChunk}
            removeLastProjectScriptChunk={removeLastProjectScriptChunk}
            updateBaseURI={updateBaseURI}
            updateMetadata={updateMetadata}
            isLoading={isLoading}
            showTransferButton={showTransferButton}
            submitProjectSettings={submitProjectSettings}
          />
        ))}

      {showConfirmMetamaskTransactionDialog && (
        <ConfirmMetamaskTransactionDialog />
      )}

      {showTransactionPendingDialog && <TransactionPendingDialog />}

      {isScriptViewShown && (
        <ScriptView
          project={project}
          height={aspectRatio > 1 ? 500 / aspectRatio : 500}
          width={aspectRatio < 1 ? 500 * aspectRatio : 500}
          closeScriptViewWindow={closeScriptViewWindow}
        />
      )}
    </>
  );
};

export default ProjectEdit;
