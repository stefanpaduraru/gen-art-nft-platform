import { Formik, Form } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjectList } from "../../../api/admin/project";
import { createAdminProject } from "../../../api/admin/project";
import { useNotification } from "../../../context/NotificationContext";
import { ExtendedProject } from "../../../types/project";
import NewProjectForm from "./NewProjectForm";
import ProjectListPresentational from "./ProjectListPresentational";
import { useAuth } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import Routes from "../../../constants/routes";

type NewProjectValues = {
  name: string;
};

const ProjectList = () => {
  const [projects, setProjects] = useState<ExtendedProject[]>();
  const [showNewProjectForm, setShowNewProjectForm] = useState<boolean>(false);
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const getData = useCallback(async () => {
    try {
      const projects = await fetchProjectList(user.token);
      setProjects(projects);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  const initialProjectValues = {
    name: "",
    artistAddress: "",
    gallery: "",
  };

  const validateForm = (values: Partial<NewProjectValues>) => {
    const errors: Partial<NewProjectValues> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    return errors;
  };

  const onSubmit = async (
    values: NewProjectValues,
    { setSubmitting }: { setSubmitting: Function }
  ) => {
    setSubmitting(true);
    createNewProject(values);
  };

  const createNewProject = useCallback(
    async (values: NewProjectValues) => {
      if (!user.isAuthenticated || !user.token) {
        setNotificationMessage("You are not logged in");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
        return;
      }
      const { token } = user;
      const response = await createAdminProject(values, token);
      if (response) {
        setNotificationMessage("Project created");
        setNotificationSeverity("success");
        setIsNotificationOpen(true);
        await getData();
        setShowNewProjectForm(false);
        return;
      }
    },
    [
      getData,
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      user,
    ]
  );

  return (
    <>
      {projects && (
        <ProjectListPresentational
          projects={projects}
          toggleShowNewProjectForm={setShowNewProjectForm}
        />
      )}

      {showNewProjectForm && (
        <Formik
          initialValues={initialProjectValues}
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
    </>
  );
};
export default ProjectList;
