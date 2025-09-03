import config from "../config/config";

function getLogoURL() {
  return `${config.FRONT_CLIENT_URL}/images/logo.png?format=871w`;
}
export default getLogoURL;
