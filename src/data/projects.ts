export interface ProjectData {
  slug: string;
  /** Fixed display number (01, 02, etc.) */
  number: number;
  title: string;
  subtitle: string;
  description: string;
  objective?: string;
  materiality: string;
  /** English translations */
  subtitleEn?: string;
  descriptionEn?: string;
  objectiveEn?: string;
  materialityEn?: string;
  credits?: string;
  creditsEn?: string;
  /** Folder name under /images/ — images inside must be named image-1.webp, image-2.webp, etc. */
  imageFolder: string;
  /** Number of images in the folder (default: 3) */
  imageCount?: number;
  /** Number of videos in the folder, named video-1.mp4, video-2.mp4, ... */
  videoCount?: number;
}

/** Helper: returns the path for a project image by index (1-based). */
export const getProjectImage = (folder: string, index: number) =>
  `/images/${folder}/image-${index}.webp`;

/** Lightweight image used by the homepage carousel. */
export const getProjectThumbnail = (folder: string) =>
  `/images/${folder}/thumbnail.webp`;

export const projects: ProjectData[] = [
  {
    slug: "nex-1",
    number: 9,
    title: "NEX-1",
    subtitle: "Ordinateur de bureau",
    description:
      "NEX-1 est un ordinateur de bureau conçu pour les télétravailleurs. Grâce à son écran enroulable, il se transforme d’un poste de travail complet en un objet discret lorsqu’il n’est pas utilisé, réduisant ainsi sa présence visuelle dans l’habitat.",
    materiality: "",
    subtitleEn: "Desktop computer",
    descriptionEn:
      "NEX-1 is a desktop computer designed for remote workers. Its rollable display lets it transform from a complete workstation into a discreet object when not in use, reducing its visual presence in the home.",
    credits: "Photos par Lee Eggenshwiler.",
    creditsEn: "Photos by Lee Eggenshwiler.",
    imageFolder: "nex-1",
    imageCount: 3,
  },
  {
    slug: "alumine",
    number: 1,
    title: "Alumine",
    subtitle: "Porte-mines",
    description:
      "Série de porte-mines développée comme étude de matière, explorant la manière dont un objet peut fonctionner comme un nuancier. Le motif répété le long de chaque corps s’épaissit progressivement selon le diamètre de la mine qu’il contient, transformant un détail fonctionnel en code visuel.",
    objective:
      "Série de porte-mines développée comme étude de matière, explorant la manière dont un objet peut fonctionner comme un nuancier. Le motif répété le long de chaque corps s’épaissit progressivement selon le diamètre de la mine qu’il contient, transformant un détail fonctionnel en code visuel.",
    materiality: "Aluminium imprimé en 3D. 2024.",
    subtitleEn: "Mechanical pencils",
    descriptionEn:
      "A series of mechanical pencils developed as a material study, exploring how an object can function as a swatch. The pattern repeated along each barrel thickens progressively according to the diameter of the lead it contains, turning a functional detail into visual code.",
    objectiveEn:
      "A series of mechanical pencils developed as a material study, exploring how an object can function as a swatch. The pattern repeated along each barrel thickens progressively according to the diameter of the lead it contains, turning a functional detail into visual code.",
    materialityEn: "3D printed aluminium. 2024.",
    imageFolder: "alumine",
  },
  {
    slug: "rpr",
    number: 2,
    title: "RPR",
    subtitle: "Fabrication CNC",
    description:
      "Basé sur un système de stockage M.2 interchangeable, RPR est un SSD externe réparable qui permet de remplacer ou d’ajuster son stockage en toute simplicité, sans aucun outil. Autour du boîtier, une protection en plastique souple enveloppe le SSD. Cette couche sert non seulement à maintenir les composants en place sans recourir à des vis, mais également à protéger vos données des impacts et des chocs éventuels.",
    objective:
      "Basé sur un système de stockage M.2 interchangeable, RPR est un SSD externe réparable qui permet de remplacer ou d’ajuster son stockage en toute simplicité, sans aucun outil. Autour du boîtier, une protection en plastique souple enveloppe le SSD. Cette couche sert non seulement à maintenir les composants en place sans recourir à des vis, mais également à protéger vos données des impacts et des chocs éventuels.",
    materiality:
      "Aluminium imprimé en 3D et bumper en plastique souple. 2025.",
    subtitleEn: "CNC manufacturing",
    descriptionEn:
      "Built around an interchangeable M.2 storage system, RPR is a repairable external SSD that lets you swap or upgrade your drive effortlessly, without any tools. A soft plastic shell wraps around the casing, holding the components together without screws while protecting your data from impacts and shocks.",
    objectiveEn:
      "Built around an interchangeable M.2 storage system, RPR is a repairable external SSD that lets you swap or upgrade your drive effortlessly, without any tools. A soft plastic shell wraps around the casing, holding the components together without screws while protecting your data from impacts and shocks.",
    materialityEn:
      "3D printed aluminium and soft plastic bumper. 2025.",
    imageFolder: "rpr",
  },
  {
    slug: "mille-foil",
    number: 3,
    title: "Mille-foil",
    subtitle: "Design structurel",
    description:
      "Pensé pour s’adapter à une large variété d’utilisateurs, Mille-foil répond à cette problématique grâce à un système modulaire de volume. Une seule planche suffit là où plusieurs seraient normalement nécessaires. Adaptée aussi bien aux débutants qu’aux riders expérimentés, elle accompagne l’évolution de chacun. Facile à transporter et rapide à assembler, quelques vis suffisent pour être prêt à naviguer.",
    objective:
      "Pensé pour s’adapter à une large variété d’utilisateurs, Mille-foil répond à cette problématique grâce à un système modulaire de volume. Une seule planche suffit là où plusieurs seraient normalement nécessaires. Adaptée aussi bien aux débutants qu’aux riders expérimentés, elle accompagne l’évolution de chacun. Facile à transporter et rapide à assembler, quelques vis suffisent pour être prêt à naviguer.",
    materiality: "Carbone et fibre de verre. 2026.",
    subtitleEn: "Structural design",
    descriptionEn:
      "Designed to suit a wide range of users, Mille-foil addresses this challenge through a modular volume system. A single board replaces what would normally require several. Suited to beginners and experienced riders alike, it grows with its user. Easy to transport and quick to assemble, just a few screws and you’re ready to ride.",
    objectiveEn:
      "Designed to suit a wide range of users, Mille-foil addresses this challenge through a modular volume system. A single board replaces what would normally require several. Suited to beginners and experienced riders alike, it grows with its user. Easy to transport and quick to assemble, just a few screws and you’re ready to ride.",
    materialityEn: "Carbon and fibreglass. 2026.",
    imageFolder: "mille-foil",
  },
  {
    slug: "zephyr",
    number: 4,
    title: "Zéphyr",
    subtitle: "Étude aérodynamique",
    description:
      "Zéphyr est un éventail métallique pensé comme une réinterprétation contemporaine d’un objet ancien, conçu pour les journées d’été. Avec structure en acier inoxydable et sa toile en ripstop thermocollé, Zéphyr devient un compagnon discret pour les journées chaudes.",
    objective:
      "Zéphyr est un éventail métallique pensé comme une réinterprétation contemporaine d’un objet ancien, conçu pour les journées d’été. Avec structure en acier inoxydable et sa toile en ripstop thermocollé, Zéphyr devient un compagnon discret pour les journées chaudes.",
    materiality:
      "Acier inoxydable découpé au laser et ripstop. 2024.",
    subtitleEn: "Aerodynamic study",
    descriptionEn:
      "Zéphyr is a metallic fan conceived as a contemporary re-reading of a centuries-old object, designed for summer days. With its stainless steel frame and heat-welded ripstop canvas, Zéphyr becomes a discreet companion for warm days.",
    objectiveEn:
      "Zéphyr is a metallic fan conceived as a contemporary re-reading of a centuries-old object, designed for summer days. With its stainless steel frame and heat-welded ripstop canvas, Zéphyr becomes a discreet companion for warm days.",
    materialityEn:
      "Laser-cut stainless steel and ripstop canvas. 2024.",
    imageFolder: "zephyr",
    imageCount: 3,
  },
  {
    slug: "peony",
    number: 5,
    title: "Peony",
    subtitle: "Forme organique",
    description:
      "Peony est un soliflore conçu comme un coussin pour pivoines, réalisé en collaboration avec Arthur Németh et Jonas Meynet.",
    objective:
      "Peony est un soliflore conçu comme un coussin pour pivoines, réalisé en collaboration avec Arthur Németh et Jonas Meynet.",
    materiality:
      "Verre soufflé à la main. 2024.",
    subtitleEn: "Organic form",
    descriptionEn:
      "Peony is a bud vase conceived as a cushion for peonies, made in collaboration with Arthur Németh and Jonas Meynet.",
    objectiveEn:
      "Peony is a bud vase conceived as a cushion for peonies, made in collaboration with Arthur Németh and Jonas Meynet.",
    materialityEn:
      "Hand-blown glass. 2024.",
    credits: "Images par Shiny Vallenas.",
    creditsEn: "Images by Shiny Vallenas.",
    imageFolder: "peony",
  },
  {
    slug: "Runway",
    number: 6,
    title: "316",
    subtitle: "Collection de bijoux",
    description:
      "Une collection de bijoux composée de bagues, bracelets et boucles de ceinture créée pour accompagner les silhouettes de la créatrice de mode Venusz.e lors de son défilé. Chaque pièce est imprimée en 3D en acier inoxydable 316L, certaines sont polies à la main.",
    objective:
      "Une collection de bijoux composée de bagues, bracelets et boucles de ceinture créée pour accompagner les silhouettes de la créatrice de mode Venusz.e lors de son défilé. Chaque pièce est imprimée en 3D en acier inoxydable 316L, certaines sont polies à la main.",
    materiality:
      "Acier inoxydable 316L imprimé en 3D, poli à la main. Projet personnel, 2026.",
    credits: "Photos par Lee Eggenshwiler, modèle Elouan Meynet.",
    subtitleEn: "Jewellery collection",
    descriptionEn:
      "A jewellery collection of rings, bracelets and belt buckles created to accompany the silhouettes of fashion designer Venusz.e during her runway show. Each piece is 3D printed in 316L stainless steel, some hand-polished.",
    objectiveEn:
      "A jewellery collection of rings, bracelets and belt buckles created to accompany the silhouettes of fashion designer Venusz.e during her runway show. Each piece is 3D printed in 316L stainless steel, some hand-polished.",
    materialityEn:
      "3D printed 316L stainless steel, hand-polished. Personal project, 2026.",
    creditsEn: "Photos by Lee Eggenshwiler, model Elouan Meynet.",
    imageFolder: "Runway",
  },
  {
    slug: "PN",
    number: 7,
    title: "PN",
    subtitle: "Recherche visuelle",
    description:
      "Client privé.",
    objective:
      "Client privé.",
    materiality:
      "CGI modélisé avec Rhino et rendu sur Blender. 2025.",
    subtitleEn: "Visual research",
    descriptionEn: "Private client.",
    objectiveEn: "Private client.",
    materialityEn:
      "CGI modelled in Rhino and rendered in Blender. 2025.",
    imageFolder: "PN",
  },
  {
    slug: "JB",
    number: 8,
    title: "JB",
    subtitle: "Visuels pour un client",
    description:
      "Client privé.",
    objective:
      "Client privé.",
    materiality:
      "CGI modélisé sur Rhino et rendu sur Blender. 2025-2026.",
    subtitleEn: "Visuals for a client",
    descriptionEn: "Private client.",
    objectiveEn: "Private client.",
    materialityEn:
      "CGI modelled in Rhino and rendered in Blender. 2025-2026.",
    imageFolder: "JB",
    imageCount: 2,
    videoCount: 1,
  },
];

export const getProjectBySlug = (
  slug: string
): ProjectData | undefined => projects.find((p) => p.slug === slug);
