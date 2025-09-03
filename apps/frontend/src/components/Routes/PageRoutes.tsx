import { Route } from "react-router-dom";
import Routes from "../../constants/routes";
import HomePage from "../App/Pages/Homepage/HomePage";
import AboutPage from "../App/Pages/AboutPage";
import ForArtists from "../App/Pages/Community/ForArtists/ForArtists";
import ForCollectors from "../App/Pages/Community/ForCollectors/ForCollectors";
import ArtistList from "../App/Pages/Community/ArtistList";
import NotFoundPage from "../App/Pages/NotFoundPage";
import TermsPage from "../App/Pages/TermsPage";
import PrivacyPage from "../App/Pages/PrivacyPage";
import MetaTags from "../Common/MetaTags";
import getLogoURL from "../../util/logo";
import { ABOUT_SHORT_TEXT } from "../../constants/text";

const PageRoutes = () => (
  <Route>
    <Route exact path={Routes.homePage}>
      {/*  <MetaTags
        title={`Generative art`}
        imageURL={getLogoURL()}
        pageURL={`/`}
        description={ABOUT_SHORT_TEXT}
      /> */}
      <HomePage />
    </Route>

    <Route exact path={Routes.aboutPage}>
      <MetaTags
        title={`About Us`}
        imageURL={getLogoURL()}
        pageURL={`/about`}
        description={ABOUT_SHORT_TEXT}
      />
      <AboutPage />
    </Route>

    <Route exact path={Routes.forArtists}>
      <MetaTags
        title={`For Artists`}
        imageURL={getLogoURL()}
        pageURL={`/for-artists`}
        description={ABOUT_SHORT_TEXT}
      />
      <ForArtists />
    </Route>

    <Route exact path={Routes.forCollectors}>
      <MetaTags
        title={`For Collectors`}
        imageURL={getLogoURL()}
        pageURL={`/for-collectos`}
        description={ABOUT_SHORT_TEXT}
      />
      <ForCollectors />
    </Route>

    <Route exact path={Routes.artistsList}>
      <MetaTags
        title={`Artists`}
        imageURL={getLogoURL()}
        pageURL={`/artists`}
        description={ABOUT_SHORT_TEXT}
      />
      <ArtistList />
    </Route>

    <Route exact path={Routes.notFoundPage}>
      <NotFoundPage />
    </Route>

    <Route exact path={Routes.termsPage}>
      <MetaTags
        title={`Terms`}
        imageURL={getLogoURL()}
        pageURL={`/terms`}
        description={ABOUT_SHORT_TEXT}
      />
      <TermsPage />
    </Route>

    <Route exact path={Routes.privacyPage}>
      <MetaTags
        title={`Privacy`}
        imageURL={getLogoURL()}
        pageURL={`/privacy`}
        description={ABOUT_SHORT_TEXT}
      />
      <PrivacyPage />
    </Route>
  </Route>
);

export default PageRoutes;
