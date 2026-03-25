export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  description: string;
  materiality: string;
  /** Folder name under /images/ — images inside must be named image-1.jpg, image-2.jpg, image-3.jpg */
  imageFolder: string;
}

/** Helper: returns the path for a project image by index (1-based). */
export const getProjectImage = (folder: string, index: number) =>
  `/images/${folder}/image-${index}.jpeg`;

export const projects: ProjectData[] = [
  {
    slug: "alumine",
    title: "Alumine",
    subtitle: "Mechanical pencils",
    description:
      "A collection of mechanical pencils that share the same base pattern, but their thickness evolves in relation to the lead's diameter. ",
    description:
      "A collection of mechanical pencils that share the same base pattern, but their thickness evolves in relation to the lead's diameter.",
    materiality: "3D printed Aluminium.",
    imageFolder: "alumine",
  },
  {
    slug: "rpr",
    title: "RPR",
    subtitle: "CNC Fabrication",
    description:
      "Precision CNC-fabricated components designed for seamless assembly, balancing industrial efficiency with refined surface finish.",
    description:
      "RPR is a M.2 based ssd which can be opened by its user to change the storage capacity when full.",
    materiality: "3D printed Aluminium and TPU",
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
