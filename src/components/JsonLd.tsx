import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";

const SITE_URL = "https://matheo.dusong.ch";
const PERSON_ID = `${SITE_URL}/#matheo-dusong`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const JsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Matheo Dusong",
    alternateName: ["Mathéo Dusong", "MD", "md"],
    identifier: "MD",
    description:
      "Swiss industrial designer and ECAL graduate, currently completing the ECAL MAS Design for Luxury & Craftsmanship.",
    jobTitle: "Industrial Designer",
    url: SITE_URL,
    email: "mailto:matheo.dusong@gmail.com",
    nationality: {
      "@type": "Country",
      name: "Switzerland",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "ECAL — École cantonale d'art de Lausanne",
      url: "https://ecal.ch",
    },
    sameAs: [
      "https://www.instagram.com/matheodusong/",
      "https://www.linkedin.com/in/math%C3%A9o-dusong-060a291b5/",
    ],
    knowsAbout: [
      "Industrial Design",
      "Product Design",
      "CNC Fabrication",
      "Material Research",
      "Luxury Design",
      "Craftsmanship",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "MD — Matheo Dusong",
    alternateName: ["Matheo Dusong Portfolio", "Mathéo Dusong Portfolio"],
    inLanguage: ["fr-CH", "en"],
    author: { "@id": PERSON_ID },
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Matheo Dusong — Industrial Design Portfolio",
    description:
      "Official portfolio of Matheo Dusong (MD), a Swiss industrial designer focusing on technical precision and material-driven aesthetics.",
    url: SITE_URL,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: `${SITE_URL}/project/${p.slug}`,
      image: `${SITE_URL}/images/${p.imageFolder}/image-1.webp`,
      creator: { "@id": PERSON_ID },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
    </Helmet>
  );
};

export default JsonLd;
