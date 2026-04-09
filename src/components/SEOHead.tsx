import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const SITE_URL = "https://matheo.dusong.ch";
const DEFAULT_TITLE = "Matheo Dusong | Industrial Design";
const DEFAULT_DESCRIPTION =
  "Portfolio of Matheo Dusong — industrial designer focusing on technical precision, material research, and refined aesthetics.";

const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  image,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} — Matheo Dusong` : DEFAULT_TITLE;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEOHead;
