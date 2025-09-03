import { Route } from "react-router-dom";
import Routes from "../../constants/routes";
import AdminDashboard from "../Admin/Dashboard";
import PartnerList from "../Admin/Partners/PartnerList";
import UserList from "../Admin/Users/UserList";
import UserDetails from "../Admin/Users/UserDetails";
import PartnerDetails from "../Admin/Partners/PartnerDetails";
import ContractList from "../Admin/Contracts/ContractList";
import ContractDetails from "../Admin/Contracts/ContractDetails";
import AdminProjectList from "../Admin/Projects/ProjectList";
import AdminProjectDetails from "../Admin/Projects/ProjectDetails";
import StatusDashboard from "../Admin/Status/Status";
import TokenList from "../Admin/Tokens/TokenList";

const AdminRoutes = () => (
  <>
    <Route exact path={Routes.adminPage}>
      <AdminDashboard />
    </Route>
    <Route exact path={Routes.adminStatusPage}>
      <StatusDashboard />
    </Route>
    <Route exact path={Routes.adminPartnerDetails}>
      <PartnerDetails />
    </Route>
    <Route exact path={Routes.adminPartners}>
      <PartnerList />
    </Route>
    <Route exact path={Routes.adminContractDetails}>
      <ContractDetails />
    </Route>
    <Route exact path={Routes.adminContracts}>
      <ContractList />
    </Route>
    <Route exact path={Routes.adminProjectDetails}>
      <AdminProjectDetails />
    </Route>
    <Route exact path={Routes.adminProjects}>
      <AdminProjectList />
    </Route>
    <Route exact path={Routes.adminUsers}>
      <UserList />
    </Route>
    <Route exact path={Routes.adminUserDetails}>
      <UserDetails />
    </Route>
    <Route exact path={Routes.adminTokens}>
      <TokenList />
    </Route>
  </>
);

export default AdminRoutes;
