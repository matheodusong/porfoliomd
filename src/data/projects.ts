export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  materiality: string;
  mainImg: string;
  secImg1: string;
  secImg2: string;
}

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
    mainImg: "https://images.unsplash.com/photo-1544244015-0cd4b3ff569d?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=2000",
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
    mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1508183393781-bc994c92bec1?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=2000",
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
    mainImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1614165933393-0ec2a5940935?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1526170315870-ef6d82f583ad?q=80&w=2000",
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
    mainImg: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2000",
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
    mainImg: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
  },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined =>
  projects.find((p) => p.slug === slug);
