import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const SITE_URL = "https://matheo.dusong.ch";

const DEFAULTS = {
  fr: {
    title: "Matheo Dusong (MD) | Designer industriel suisse",
    description:
      "Site officiel et portfolio de Matheo Dusong (MD), designer industriel suisse — objets techniques, mobilier, bijoux et recherche matérielle.",
  },
  en: {
    title: "Matheo Dusong (MD) | Swiss Industrial Designer",
    description:
      "Official website and portfolio of Matheo Dusong (MD), Swiss industrial designer — technical objects, furniture, jewellery and material research.",
  },
} as const;

const KEYWORDS = [
  "Matheo Dusong",
  "Mathéo Dusong",
  "MD",
  "designer industriel suisse",
  "Swiss industrial designer",
  "industrial design portfolio",
].join(", ");

const SEOHead = ({
  title,
  description,
  path = "/",
  type = "website",
  image,
}: SEOHeadProps) => {
  const { lang } = useLanguage();
  const defaults = DEFAULTS[lang];
  const fullTitle = title ? `${title} — Matheo Dusong` : defaults.title;
  const desc = description ?? defaults.description;
  const url = `${SITE_URL}${path}`;
  const socialImage = new URL(image ?? "/og-image.jpg", SITE_URL).toString();
  const ogLocale = lang === "fr" ? "fr_CH" : "en_US";
  const altLocale = lang === "fr" ? "en_US" : "fr_CH";

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="author" content="Matheo Dusong" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MD — Matheo Dusong" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={altLocale} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={`${fullTitle} — portfolio image`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} — portfolio image`} />
    </Helmet>
  );
};

export default SEOHead;
