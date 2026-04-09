import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";

const SITE_URL = "https://matheo.dusong.ch";

const JsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matheo Dusong",
    jobTitle: "Industrial Designer",
    url: SITE_URL,
    email: "hello@matheodusong.com",
    sameAs: [],
    knowsAbout: [
      "Industrial Design",
      "Product Design",
      "CNC Fabrication",
      "Material Research",
    ],
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Matheo Dusong — Industrial Design Portfolio",
    description:
      "Portfolio of Matheo Dusong, industrial designer focusing on technical precision and material-driven aesthetics.",
    url: SITE_URL,
    author: { "@type": "Person", name: "Matheo Dusong" },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: `${SITE_URL}/project/${p.slug}`,
      image: `${SITE_URL}/images/${p.imageFolder}/image-1.jpeg`,
      creator: { "@type": "Person", name: "Matheo Dusong" },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
    </Helmet>
  );
};

export default JsonLd;
