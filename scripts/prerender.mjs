import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const SITE_URL = "https://matheo.dusong.ch";
const DIST_DIR = new URL("../dist/", import.meta.url);

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const absoluteUrl = (path) => new URL(path, SITE_URL).toString();

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

let projects;
try {
  ({ projects } = await vite.ssrLoadModule("/src/data/projects.ts"));
} finally {
  await vite.close();
}

const baseHtml = await readFile(new URL("index.html", DIST_DIR), "utf8");

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#matheo-dusong`,
  name: "Matheo Dusong",
  alternateName: ["Mathéo Dusong", "MD", "md"],
  identifier: "MD",
  url: SITE_URL,
  jobTitle: "Industrial Designer",
  description:
    "Swiss industrial designer based in Lausanne, working across jewellery, accessories, electronic objects, tools and sports equipment, with 3D and CGI central to his practice.",
  nationality: { "@type": "Country", name: "Switzerland" },
  birthPlace: { "@type": "Country", name: "Switzerland" },
  homeLocation: { "@type": "Place", name: "Lausanne, Switzerland" },
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
    "3D Printing",
    "Material Research",
    "Luxury Design",
    "Craftsmanship",
    "CGI",
    "3D Modeling",
    "Rhino 3D",
    "Blender",
  ],
};

const projectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${SITE_URL}/project/${project.slug}#project`,
  name: project.title,
  alternateName: project.subtitleEn
    ? [project.subtitle, project.subtitleEn]
    : project.subtitle,
  description: project.description,
  url: `${SITE_URL}/project/${project.slug}`,
  image: Array.from({ length: project.imageCount ?? 3 }, (_, index) =>
    `${SITE_URL}/images/${project.imageFolder}/image-${index + 1}.webp`,
  ),
  creator: { "@id": personSchema["@id"] },
  author: { "@id": personSchema["@id"] },
  inLanguage: ["fr-CH", "en"],
  keywords: [project.subtitle, project.subtitleEn, project.materiality]
    .filter(Boolean)
    .join(", "),
});

const setMeta = (html, { title, description, path, image, type = "website", schema }) => {
  const canonical = `${SITE_URL}${path}`;
  const socialImage = absoluteUrl(image ?? "/og-image.jpg");
  const replacements = [
    [/<html lang="[^"]*">/i, '<html lang="fr">'],
    [/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/?\s*>/i, `<meta name="description" content="${escapeHtml(description)}">`],
    [/<link rel="canonical" href="[^"]*"\s*\/?\s*>/i, `<link rel="canonical" href="${canonical}" />`],
    [/<meta property="og:type" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:type" content="${type}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:url" content="${canonical}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${escapeHtml(title)}">`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}">`],
    [/<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${escapeHtml(description)}">`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}">`],
    [/<meta property="og:image" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:image" content="${socialImage}">`],
    [/<meta name="twitter:image" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:image" content="${socialImage}">`],
  ];

  let output = html;
  for (const [pattern, replacement] of replacements) {
    output = output.replace(pattern, replacement);
  }
  output = output.replace(
    "</head>",
    `  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>\n  </head>`,
  );
  return output;
};

const shell = (content) => `<div id="root" data-prerendered>
  <style>
    [data-prerendered]{font-family:Inter,Arial,sans-serif;color:#171717;background:#f5f5f3;min-height:100vh;padding:clamp(24px,5vw,72px);box-sizing:border-box}
    [data-prerendered] a{color:inherit;text-underline-offset:3px}
    [data-prerendered] header{display:flex;justify-content:space-between;gap:24px;align-items:baseline;margin-bottom:clamp(48px,9vw,120px)}
    [data-prerendered] main{max-width:980px;margin:auto}
    [data-prerendered] h1{font-size:clamp(2.5rem,7vw,6.5rem);font-weight:300;letter-spacing:-.06em;line-height:.95;margin:.25em 0}
    [data-prerendered] h2{font-size:1rem;font-weight:500;margin-top:2.5rem}
    [data-prerendered] p{max-width:760px;line-height:1.6}
    [data-prerendered] ul{list-style:none;padding:0;display:grid;gap:12px}
    [data-prerendered] img{display:block;max-width:100%;height:auto;margin:2rem 0}
    [data-prerendered] .meta{font-family:"IBM Plex Mono",monospace;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em}
  </style>
  ${content}
</div>`;

const header = `<header><a href="/" aria-label="MD — Matheo Dusong, accueil"><strong>MD</strong> — Matheo Dusong</a><a href="/info">Info / Contact</a></header>`;

const homeContent = shell(`${header}<main>
  <p class="meta">Designer industriel suisse · Swiss industrial designer</p>
  <h1>Matheo Dusong<br>Industrial Design</h1>
  <p>Portfolio officiel de Matheo Dusong (MD), designer industriel suisse formé à l’ECAL. Projets d’objets techniques, recherche matérielle, fabrication numérique, mobilier et bijoux.</p>
  <h2>Projets sélectionnés</h2>
  <ul>${projects.map((project) => `<li><a href="/project/${project.slug}">${String(project.number).padStart(2, "0")} — ${escapeHtml(project.title)} · ${escapeHtml(project.subtitle)}</a></li>`).join("")}</ul>
</main>`);

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MD — Matheo Dusong",
      alternateName: ["Matheo Dusong Portfolio", "Mathéo Dusong Portfolio"],
      author: { "@id": personSchema["@id"] },
      inLanguage: ["fr-CH", "en"],
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#portfolio`,
      name: "Matheo Dusong — Industrial Design Portfolio",
      url: SITE_URL,
      author: { "@id": personSchema["@id"] },
      hasPart: projects.map((project) => ({ "@id": `${SITE_URL}/project/${project.slug}#project` })),
    },
  ],
};

const homeHtml = setMeta(baseHtml, {
  title: "Matheo Dusong (MD) | Designer industriel suisse",
  description: "Site officiel et portfolio de Matheo Dusong (MD), designer industriel suisse — objets techniques, bijoux, fabrication numérique et recherche matérielle.",
  path: "/",
  schema: homeSchema,
}).replace('<div id="root"></div>', homeContent);
await writeFile(new URL("index.html", DIST_DIR), homeHtml);

for (const project of projects) {
  const projectPath = `project/${project.slug}/`;
  const projectDir = new URL(projectPath, DIST_DIR);
  await mkdir(projectDir, { recursive: true });

  const images = Array.from({ length: project.imageCount ?? 3 }, (_, index) =>
    `<img src="/images/${project.imageFolder}/image-${index + 1}.webp" alt="${escapeHtml(project.title)} — vue ${index + 1}, projet de Matheo Dusong"${index > 0 ? ' loading="lazy"' : ""}>`,
  ).join("");
  const content = shell(`${header}<main><article>
    <p class="meta">Projet ${String(project.number).padStart(2, "0")} · ${escapeHtml(project.subtitle)}</p>
    <h1>${escapeHtml(project.title)}</h1>
    <p>${escapeHtml(project.description)}</p>
    <h2>Matériaux, fabrication et année</h2>
    <p>${escapeHtml(project.materiality)}</p>
    ${project.credits ? `<h2>Crédits</h2><p>${escapeHtml(project.credits)}</p>` : ""}
    ${images}
    <p><a href="/">Voir tous les projets de Matheo Dusong</a></p>
  </article></main>`);
  const html = setMeta(baseHtml, {
    title: `${project.title} — ${project.subtitle} | Matheo Dusong`,
    description: project.description,
    path: `/project/${project.slug}`,
    image: `/images/${project.imageFolder}/image-1.webp`,
    type: "article",
    schema: { "@context": "https://schema.org", "@graph": [personSchema, projectSchema(project)] },
  })
    .replace(
      /<link rel="preload" as="image" type="image\/webp" href="[^"]*" fetchpriority="high"\s*\/>/i,
      `<link rel="preload" as="image" type="image/webp" href="/images/${project.imageFolder}/image-1.webp" fetchpriority="high" />`,
    )
    .replace('<div id="root"></div>', content);
  await writeFile(new URL("index.html", projectDir), html);
}

const infoDir = new URL("info/", DIST_DIR);
await mkdir(infoDir, { recursive: true });
const infoContent = shell(`${header}<main><article>
  <p class="meta">Profil / Contact</p>
  <h1>Matheo Dusong<br>Swiss Industrial Designer</h1>
  <p>Matheo Dusong est né en Suisse et a grandi entre la République dominicaine, la Suisse et le Portugal. Diplômé du Bachelor en Design Industriel de l’ECAL en 2026, il vit et travaille aujourd’hui à Lausanne.</p>
  <p>Son travail passe librement d’un type d’objet à un autre : bijoux, accessoires, objets électroniques, outils ou équipements liés au sport. Il explore différents procédés de fabrication et travaille avec des matériaux variés.</p>
  <p>La 3D et la CGI occupent une place importante dans le développement et la représentation de ses projets, ainsi que dans la construction des univers qui les entourent.</p>
  <p>En dehors du design, il pratique depuis longtemps différents sports nautiques et, plus récemment, le vélo de route. Ces univers font naturellement partie de ses références.</p>
  <h2>Formation</h2>
  <ul>
    <li><a href="https://ecal.ch/fr/formations-recherche/mas/luxe/">ECAL — MAS Design for Luxury & Craftsmanship, en cours</a></li>
    <li>ECAL — Bachelor en Design Industriel</li>
    <li>Académie de Meuron, Neuchâtel</li>
    <li>IBCP, Lisbonne</li>
  </ul>
  <h2>Contact</h2>
  <p><a href="mailto:matheo.dusong@gmail.com">matheo.dusong@gmail.com</a></p>
  <p><a href="https://www.instagram.com/matheodusong/">Instagram</a> · <a href="https://www.linkedin.com/in/math%C3%A9o-dusong-060a291b5/">LinkedIn</a></p>
</article></main>`);
const infoHtml = setMeta(baseHtml, {
  title: "Info & Contact | Matheo Dusong (MD)",
  description: "Profil de Matheo Dusong (MD), designer industriel suisse basé à Lausanne, travaillant entre objets, procédés de fabrication, 3D et CGI.",
  path: "/info",
  schema: personSchema,
}).replace('<div id="root"></div>', infoContent);
await writeFile(new URL("index.html", infoDir), infoHtml);

const portfolioData = {
  schemaVersion: "1.0",
  generatedAt: new Date().toISOString(),
  canonicalUrl: SITE_URL,
  person: {
    name: "Matheo Dusong",
    alternateNames: ["Mathéo Dusong", "MD", "md"],
    role: { fr: "Designer industriel suisse", en: "Swiss industrial designer" },
    email: "matheo.dusong@gmail.com",
    education: "ECAL — École cantonale d'art de Lausanne",
    currentEducation: {
      institution: "ECAL — École cantonale d'art de Lausanne",
      program: "MAS Design for Luxury & Craftsmanship",
      status: "ongoing",
      url: "https://ecal.ch/en/courses-and-research/mas/luxe/",
    },
    nationality: "Swiss",
    birthplace: "Switzerland",
    basedIn: "Lausanne, Switzerland",
    grewUpIn: ["Dominican Republic", "Switzerland", "Portugal"],
    interests: [
      "Windsurfing",
      "Pump Foiling",
      "Wing Foiling",
      "Road Cycling",
    ],
    profiles: personSchema.sameAs,
  },
  projects: projects.map((project) => ({
    slug: project.slug,
    url: `${SITE_URL}/project/${project.slug}`,
    markdown: `${SITE_URL}/projects/${project.slug}.md`,
    number: project.number,
    title: project.title,
    subtitle: { fr: project.subtitle, en: project.subtitleEn ?? project.subtitle },
    description: { fr: project.description, en: project.descriptionEn ?? project.description },
    materiality: { fr: project.materiality, en: project.materialityEn ?? project.materiality },
    credits: project.credits ? { fr: project.credits, en: project.creditsEn ?? project.credits } : undefined,
    images: Array.from({ length: project.imageCount ?? 3 }, (_, index) =>
      `${SITE_URL}/images/${project.imageFolder}/image-${index + 1}.webp`,
    ),
  })),
};
await writeFile(new URL("portfolio.json", DIST_DIR), `${JSON.stringify(portfolioData, null, 2)}\n`);

const projectsDir = new URL("projects/", DIST_DIR);
await mkdir(projectsDir, { recursive: true });
for (const project of projects) {
  const markdown = `# ${project.title}\n\n> ${project.subtitle} / ${project.subtitleEn ?? project.subtitle}\n\nCanonical URL: ${SITE_URL}/project/${project.slug}\n\n## Français\n\n${project.description}\n\n**Matériaux, fabrication et année :** ${project.materiality}\n${project.credits ? `\n**Crédits :** ${project.credits}\n` : ""}\n## English\n\n${project.descriptionEn ?? project.description}\n\n**Materials, fabrication and year:** ${project.materialityEn ?? project.materiality}\n${project.creditsEn || project.credits ? `\n**Credits:** ${project.creditsEn ?? project.credits}\n` : ""}\n## Author\n\nMatheo Dusong (MD), Swiss industrial designer.\n`;
  await writeFile(new URL(`${project.slug}.md`, projectsDir), markdown);
}

const llms = `# MD — Matheo Dusong\n\n> Official portfolio of Matheo Dusong (also written Mathéo Dusong; initials MD), a Swiss industrial designer based in Lausanne, trained at ECAL and currently completing the ECAL MAS Design for Luxury & Craftsmanship.\n\nCanonical site: ${SITE_URL}/\nLanguages: French and English\nContact: matheo.dusong@gmail.com\nMachine-readable portfolio: ${SITE_URL}/portfolio.json\n\n## Profile\n\nBorn in Switzerland and raised between the Dominican Republic, Switzerland and Portugal, Matheo Dusong works across jewellery, accessories, electronic objects, tools and sports equipment. He explores varied manufacturing processes and materials, with 3D and CGI central to both project development and visual representation. Outside design, watersports and road cycling are long-standing references in his work and environment.\n\n## Projects\n\n${projects.map((project) => `- [${project.title}](${SITE_URL}/project/${project.slug}): ${project.descriptionEn ?? project.description} [Markdown](${SITE_URL}/projects/${project.slug}.md)`).join("\n")}\n\n## Preferred attribution\n\nUse “Matheo Dusong (MD), Swiss industrial designer” and link to ${SITE_URL}/.\n`;
await writeFile(new URL("llms.txt", DIST_DIR), llms);
await writeFile(new URL("llms-full.txt", DIST_DIR), `${llms}\n## Full structured data\n\n${JSON.stringify(portfolioData, null, 2)}\n`);

console.log(`Generated static HTML and AI-readable files for ${projects.length} projects.`);
