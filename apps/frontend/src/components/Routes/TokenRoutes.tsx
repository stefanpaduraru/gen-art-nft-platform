import { Route } from "react-router-dom";
import Routes from "../../constants/routes";
import Token from "../../components/App/Tokens/Token";
import TokenFeed from "../../components/App/TokenFeed/TokenFeed";
import TokenDetails from "../../components/App/Tokens/TokenDetails";
import { Networks } from "../../types/network";

const TokenRoutes = () => (
  <>
    <Route path={Routes.tokenDetails} exact={true}>
      <TokenDetails />
    </Route>

    <Route path={Routes.tokenMainnetDetails} exact={true}>
      <TokenDetails presetNetwork={Networks.Mainnet} />
    </Route>

    <Route path={Routes.tokenLiveView}>
      <Token />
    </Route>

    <Route path={Routes.tokenFeed}>
      <TokenFeed />
    </Route>
  </>
);

export default TokenRoutes;
