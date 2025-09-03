import { Route } from "react-router-dom";
import Routes from "../../constants/routes";
import GalleryProjectList from "../App/Projects/GalleryProjects/GalleryProjectList";
import GalleryProjectDetails from "../App/Projects/GalleryProjects/GalleryProjectDetails";
import { MintoriaGalleries } from "../../types/galleries";

const GalleryRoutes = () => (
  <Route>
    <Route exact path={Routes.mintoriaSelected}>
      <GalleryProjectList gallery={MintoriaGalleries.Selected} />
    </Route>
    <Route exact path={Routes.mintoriaOpenWorld}>
      <GalleryProjectList gallery={MintoriaGalleries.OpenWorld} />
    </Route>

    <Route exact path={Routes.mintoriaSelectedProject}>
      <GalleryProjectDetails gallery={MintoriaGalleries.Selected} />
    </Route>

    <Route exact path={Routes.mintoriaOpenWorldProject}>
      <GalleryProjectDetails gallery={MintoriaGalleries.OpenWorld} />
    </Route>
  </Route>
);

export default GalleryRoutes;
