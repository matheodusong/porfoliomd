export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  materiality: string;
  /** Folder name under /images/ — images inside must be named image-1.jpg, image-2.jpg, image-3.jpg */
  imageFolder: string;
}

/** Helper: returns the path for a project image by index (1-based). */
export const getProjectImage = (folder: string, index: number) =>
  `/images/${folder}/image-${index}.jpg`;

export const projects: ProjectData[] = [
  {
    slug: "alumine",
    title: "Alumine",
    subtitle: "Technical Study",
    description:
      "An in-depth technical study exploring the structural and aesthetic properties of anodized aluminum in high-performance product applications.",
    objective:
      "Investigation into tactile relationships between raw materials and functional performance in high-stress environments.",
    materiality: "Anodized Aluminum, Borosilicate Glass, Machined Carbon Fiber.",
    imageFolder: "alumine",
  },
  {
    slug: "rpr",
    title: "RPR",
    subtitle: "CNC Fabrication",
    description:
      "Precision CNC-fabricated components designed for seamless assembly, balancing industrial efficiency with refined surface finish.",
    objective:
      "Development of a modular system optimized for CNC manufacturing, reducing material waste while maintaining structural integrity.",
    materiality: "Machined Steel, Acetal Copolymer, Vapor-Blasted Titanium.",
    imageFolder: "rpr",
  },
  {
    slug: "mille-foil",
    title: "Mille-foil",
    subtitle: "Structure Design",
    description:
      "A layered structural design inspired by natural lamination patterns, translating organic complexity into manufacturable form.",
    objective:
      "Exploration of multi-layered construction techniques to achieve maximum strength with minimal material volume.",
    materiality: "Laser-Cut Stainless Steel, Laminated Birch Plywood, Pressed Felt.",
    imageFolder: "mille-foil",
  },
  {
    slug: "zephyr",
    title: "Zéphyr",
    subtitle: "Aerodynamic Study",
    description:
      "An aerodynamic study translating airflow simulation data into physical form, where performance dictates geometry.",
    objective:
      "CFD-driven form development targeting drag reduction and thermal dissipation in compact product enclosures.",
    materiality: "Rotational-Molded HDPE, Wind-Tunnel Tested ABS, Brushed Copper Accents.",
    imageFolder: "zephyr",
  },
  {
    slug: "peony",
    title: "Peony",
    subtitle: "Organic Form",
    description:
      "An organic form study drawing from botanical growth patterns to create objects that feel alive yet precisely engineered.",
    objective:
      "Translating biological morphogenesis into injection-moldable geometries without sacrificing organic character.",
    materiality: "Bio-Based PLA, Hand-Finished Ceramic, Oxidized Bronze.",
    imageFolder: "peony",
  },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined =>
  projects.find((p) => p.slug === slug);
