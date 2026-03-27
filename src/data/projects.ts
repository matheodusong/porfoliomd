export interface ProjectData {
  slug: string;
  /** Fixed display number (01, 02, etc.) */
  number: number;
  title: string;
  subtitle: string;
  description: string;
  objective?: string;
  materiality: string;
  /** Folder name under /images/ — images inside must be named image-1.jpeg, image-2.jpeg, image-3.jpeg */
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
      "A collection of mechanical pencils that share the same base pattern, but their thickness evolves in relation to the lead's diameter.",
        objective:
      "A collection of mechanical pencils that share the same base pattern, but their thickness evolves in relation to the lead's diameter.",
    materiality: "3D printed Aluminium.",
    imageFolder: "alumine",
  },
  {
    slug: "rpr",
    title: "RPR",
    subtitle: "CNC Fabrication",
    description:
      "RPR is a M.2 based ssd which can be opened by its user to change the storage capacity when full.",
    objective:
      "RPR is a M.2 based ssd which can be opened by its user to change the storage capacity when full.",
    materiality: "3D printed Aluminium and TPU",
    imageFolder: "rpr",
  },
  {
    slug: "mille-foil",
    title: "Mille-foil",
    subtitle: "Structure Design",
    description:
      "Designed to suit a wide range of users, Mille-foil addresses this issue with its modular volume system. A single board is all you need, where several would normally be required. It's suitable for both beginners and experienced riders, adapting to each individual's progress. Easy to transport and quick to assemble, just a few screws are all you need to be ready to sail.",
    objective:
      "Designed to suit a wide range of users, Mille-foil addresses this issue with its modular volume system. A single board is all you need, where several would normally be required. It's suitable for both beginners and experienced riders, adapting to each individual's progress. Easy to transport and quick to assemble, just a few screws are all you need to be ready to sail.",
    materiality: "Carbon and fiber glass.",
    imageFolder: "mille-foil",
  },
  {
    slug: "zephyr",
    title: "Zéphyr",
    subtitle: "Aerodynamic Study",
    description:
      " Zéphyr is a fan. The stainless steel structure unfolds smoothly and creates a light breeze with a simple motion. Whether you’re on the move or just need a quick way to cool down, Zéphyr is a good companion for warm days.",
    objective:
      "Zéphyr is a fan. The stainless steel structure unfolds smoothly and creates a light breeze with a simple motion. Whether you’re on the move or just need a quick way to cool down, Zéphyr is a good companion for warm days.",
    materiality: "Stainless steel and PVC-coated ripstop.",
    imageFolder: "zephyr",
  },
  {
    slug: "peony",
    title: "Peony",
    subtitle: "Organic Form",
    description:
      "A glasse soliflower vase made specially for peonies. Created with a tool made specially for the occasion.",
    objective:
      "A glasse soliflower vase made specially for peonies. Created with a tool made specially for the occasion.",
    materiality: "Glass.",
    imageFolder: "peony",
  },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined =>
  projects.find((p) => p.slug === slug);
