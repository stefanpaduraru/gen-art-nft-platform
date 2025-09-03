import React from "react";
import { Helmet } from "react-helmet";
import config from "../../config/config";
type Props = {
  title?: string;
  description?: string;
  imageURL?: string;
  pageURL?: string;
};

const SITE_NAME = "mintoria.io";

const MetaTags = ({ title, description, pageURL, imageURL }: Props) => {
  const pageTitle = `${title} - ${SITE_NAME}`;
  const pageHref = `${config.FRONT_CLIENT_URL}${pageURL}`;

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageHref} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageURL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:url" content={pageHref} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageURL} />
        <meta name="twitter:site" content="@mintoria-io" />
        <meta name="twitter:creator" content="@mintoria-io" />
        <meta name="twitter:card" content="summary" />

        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={imageURL} />

        <link rel="canonical" href={pageHref} />
      </Helmet>
    </>
  );
};

export default MetaTags;
