/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Link, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import NewProjectCard from "./NewProjectCard";
import NewProjectPlaceholder from "./NewProjectPlaceholder";
import ProjectCardSkeleton from "../common/ProjectCardSkeleton";
import {
  ExtendedProject,
  Project,
  ProjectTypes,
} from "../../../../types/project";
import {
  createProjectTemplate,
  fetchProjectsByArtistAddress,
} from "../../../../api/app/project";
import { useAuth } from "../../../../context/UserContext";
import { PROJECTS_PAGE_TITLE } from "../../../../constants/text";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import { Network, Networks } from "../../../../types/network";
import { Web3Error, Web3Receipt } from "../../../../types/web3";
import CoreContract from "../../../../web3/CoreContract";
import { useNotification } from "../../../../context/NotificationContext";
import NewProjectModal from "./NewProjectModal";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import Routes from "../../../../constants/routes";
import config from "../../../../config/config";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ConfirmMetamaskTransactionDialog from "../common/ConfirmMetamaskTransactionDialog";
import TransactionPendingDialog from "../common/TransactionPendingDialog";
import MyProjectsPlaceholder from "./MyProjectsPlaceholder";

function MyProjects() {
  const { user } = useAuth();
  const history = useHistory();
  const [projects, setProjects] = useState<Array<ExtendedProject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [
    showConfirmMetamaskTransactionDialog,
    setShowConfirmMetamaskTransactionDialog,
  ] = useState(false);
  const [showTransactionPendingDialog, setShowTransactionPendingDialog] =
    useState(false);
  const [newProjectGallery, setNewProjectGallery] = useState<MintoriaGallery>(
    MintoriaGalleries.OpenWorld
  );
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getProjects = useCallback(async () => {
    if (user.token) {
      const projects = await fetchProjectsByArtistAddress(user.token);

      setProjects(projects);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user.isAuthenticated && user.address && user.token) {
      getProjects();
    }
  }, [user.isAuthenticated, user.address, user.token]);

  const contractUpdateSucces = useCallback(
    (receipt: Web3Receipt) => {
      setNotificationMessage("Project updated");
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      setShowTransactionPendingDialog(false);
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const displayError = (text: string) => {
    setNotificationMessage(text);
    setNotificationSeverity("error");
    setIsNotificationOpen(true);
  };

  const contractUpdateEror = useCallback(
    (error: Web3Error, receipt: Web3Receipt) => {
      displayError(
        "Error updating contract: " +
          error.message.replace("MetaMask Tx Signature: ", "")
      );
    },
    [displayError]
  );

  const contractUpdateConfirmation = useCallback((hash: string) => {
    setShowTransactionPendingDialog(true);
    setShowConfirmMetamaskTransactionDialog(false);
  }, []);

  const toggleMintingPaused = useCallback(
    (project: Project) => {
      if (project && project.contract && project.chainId) {
        const address =
          project.type === ProjectTypes.Mainnet
            ? project.contract.address
            : project.contract.testnetAddress;
        const network =
          project.type === ProjectTypes.Mainnet
            ? Networks.Mainnet
            : Networks.Testnet;
        const web3Contract = new CoreContract(address, network);
        web3Contract.togglePausedProject(
          project.chainId,
          contractUpdateSucces,
          contractUpdateEror,
          contractUpdateConfirmation
        );
        setShowConfirmMetamaskTransactionDialog(true);
      }
    },
    [contractUpdateSucces, contractUpdateEror]
  );

  const openCreateModalCallback = (gallery: MintoriaGallery) => {
    setNewProjectGallery(gallery);
    setShowNewProjectModal(true);
  };

  const submitNewProjectForm = async (
    name: string,
    pricePerTokenInETH: number,
    gallery: MintoriaGallery
  ) => {
    const token = user.token;
    const pricePerTokenInWei = ethers.utils.parseEther(`${pricePerTokenInETH}`);
    if (token) {
      const captchaToken = await handleReCaptchaVerify();
      if (!captchaToken) {
        displayError("Please complete the captcha challenge");
        return;
      }

      if (!name || name.length < 3) {
        displayError("Project name must be at least 3 characters in length");
        return;
      }

      const result = await createProjectTemplate(
        name,
        pricePerTokenInWei.toString(),
        gallery,
        token,
        captchaToken
      );

      if (result) {
        history.push(Routes.getMyProjectEdit(result.id));
      } else {
        displayError(
          `Cannot have more than ${config.MAX_NUMBER_OF_PROJECTS} projects running at the same time`
        );
      }
    } else {
      displayError("Invalid token. Please re-login");
    }
  };

  const handleReCaptchaVerify = useCallback(async () => {
    const action = "new_project";
    if (!executeRecaptcha) {
      const token = await window.grecaptcha.execute(config.RECAPTCHA_KEY, {
        action: action,
      });
      return token;
    }

    const token = await executeRecaptcha(action);
    return token;
  }, []);

  return (
    <>
      <Box>
        {!!user.isAuthenticated && !!projects.length && (
          <Typography variant="h3" component="div" sx={{ mt: 8 }}>
            {PROJECTS_PAGE_TITLE}
          </Typography>
        )}
        {!!user.isAuthenticated && !!projects.length && (
          <>
            <Typography variant="h6" sx={{ mt: 2.5 }}>
              Welcome to your projects page.
            </Typography>
            <Typography variant="body1" sx={{ mt: 0, fontWeight: "light" }}>
              Here you can manage your work: create templates, request
              transfers, or update on-chain data.
            </Typography>
            <Typography variant="body1" sx={{ mt: 0, fontWeight: "light" }}>
              If you get stuck setting up a project, check out this{" "}
              <Link href="https://docs.mintoria.io/" target={"_blank"}>
                documentation
              </Link>{" "}
              we've prepared for you.
            </Typography>
          </>
        )}
        <Grid container spacing={4} sx={{ mt: 1.5 }}>
          {!isLoading &&
            user.isAuthenticated &&
            (projects.length ? (
              <>
                <Grid item xs={12} md={6} lg={4} key={"new-project"}>
                  <NewProjectCard
                    openCreateModalCallback={openCreateModalCallback}
                  />
                </Grid>
                {[...projects].map((project, i) => {
                  const chainProject =
                    project.mainnetProject || project.testnetProject || project;
                  const gallery =
                    project.contract?.name === "Mintoria Selected"
                      ? MintoriaGalleries.Selected
                      : MintoriaGalleries.OpenWorld;
                  let network: Network;
                  if (!!project.mainnetProject) {
                    network = Networks.Mainnet;
                  } else if (!!project.testnetProject) {
                    network = ProjectTypes.Testnet;
                  } else {
                    network = Networks.Template;
                  }

                  return (
                    <Grid item xs={12} md={6} lg={4} key={i}>
                      <ProjectCard
                        project={chainProject}
                        gallery={gallery}
                        network={network}
                        projectId={project.id}
                        toggleMintingPaused={toggleMintingPaused}
                      />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Grid item xs={12}>
                <NewProjectPlaceholder
                  openCreateModalCallback={openCreateModalCallback}
                />
              </Grid>
            ))}

          {isLoading && user.isAuthenticated && (
            <>
              <Grid item>
                <ProjectCardSkeleton />{" "}
              </Grid>
              <Grid item>
                <ProjectCardSkeleton />{" "}
              </Grid>
              <Grid item>
                <ProjectCardSkeleton />{" "}
              </Grid>
            </>
          )}

          {!user.isAuthenticated && (
            <Grid item xs={12} lg={12} sx={{ mt: 5 }}>
              <MyProjectsPlaceholder />
            </Grid>
          )}
        </Grid>
      </Box>
      {showNewProjectModal && (
        <NewProjectModal
          gallery={newProjectGallery}
          handleClose={() => setShowNewProjectModal(false)}
          submitForm={submitNewProjectForm}
        />
      )}

      {showConfirmMetamaskTransactionDialog && (
        <ConfirmMetamaskTransactionDialog />
      )}

      {showTransactionPendingDialog && <TransactionPendingDialog />}
    </>
  );
}

export default MyProjects;
