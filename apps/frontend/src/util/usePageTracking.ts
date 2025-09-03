import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import config from "../config/config";

const usePageTracking = () => {
  const location = useLocation();
  const [currentURL, setCurrentURL] = useState("");
  const newURL = location.pathname + location.search;

  useEffect(() => {
    if (currentURL !== newURL) {
      ReactGA.initialize(config.GA_ID);
      ReactGA.send("pageview"); //(location.pathname + location.search);
      setCurrentURL(newURL);
    }
  }, [currentURL, newURL]);

  useEffect(() => {}, [currentURL]);
};

export default usePageTracking;
