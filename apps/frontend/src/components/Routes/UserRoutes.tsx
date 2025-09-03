import { Route } from "react-router-dom";
import Routes from "../../constants/routes";
import MyProjects from "../App/Projects/MyProjects/MyProjects";
import MyProjectDetails from "../App/Projects/MyProjects/ProjectDetails";
import UserPage from "../App/User/UserPage";
import ProjectEdit from "../App/Projects/ProjectEdit/ProjectEdit";

const UserRoutes = () => (
  <Route>
    <Route exact path={Routes.myProjectDetails}>
      <MyProjectDetails />
    </Route>

    <Route exact path={Routes.myProjects}>
      <MyProjects />
    </Route>

    <Route exact path={Routes.myProjectEdit}>
      <ProjectEdit />
    </Route>

    <Route exact path={Routes.userPage}>
      <UserPage />
    </Route>
  </Route>
);

export default UserRoutes;
