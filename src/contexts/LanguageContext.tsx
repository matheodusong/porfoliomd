import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, { fr: string; en: string }>;

const dict: Dict = {
  info: { fr: "Info / Contact", en: "Info / Contact" },
  profile: { fr: "Profil", en: "Profile" },
  swissDesigner: { fr: "— Designer industriel suisse", en: "— Swiss industrial designer" },
  profileBio: {
    fr: "Je suis né en Suisse et j’ai grandi entre la République dominicaine, la Suisse et le Portugal. En 2026, j’ai obtenu mon Bachelor en Design Industriel à l’ECAL. Je vis et travaille aujourd’hui à Lausanne.\n\nDans mon travail, je passe assez librement d’un type d’objet à un autre : bijoux, accessoires, objets électroniques, outils ou équipements liés au sport. J’aime explorer différents procédés de fabrication et travailler avec des matériaux variés.\n\nLa 3D et la CGI occupent une place importante dans mon travail, aussi bien dans le développement de mes projets que dans leur représentation et dans la construction de l’univers qui les entoure.\n\nEn dehors du design, je pratique depuis longtemps différents sports nautiques, et plus récemment le vélo de route. Ces univers font naturellement partie de mes références et de ce qui m’entoure.",
    en: "I was born in Switzerland and grew up between the Dominican Republic, Switzerland and Portugal. In 2026, I received my Bachelor’s degree in Industrial Design from ECAL. I now live and work in Lausanne.\n\nIn my work, I move quite freely from one type of object to another: jewellery, accessories, electronic objects, tools and sports equipment. I enjoy exploring different manufacturing processes and working with a wide range of materials.\n\n3D and CGI play an important role in my work, both in the development and representation of my projects and in shaping the worlds around them.\n\nOutside design, I have long practised various watersports and, more recently, road cycling. These worlds naturally form part of my references and surroundings.",
  },
  formation: { fr: "Formation", en: "Education" },
  contact: { fr: "Contact", en: "Contact" },
  eduMas: {
    fr: "- ECAL MAS Design for Luxury & Craftsmanship, Lausanne - en cours",
    en: "- ECAL MAS Design for Luxury & Craftsmanship, Lausanne - ongoing",
  },
  eduIbcp: { fr: "- IBCP, Lisbonne", en: "- IBCP, Lisbon" },
  eduMeuron: { fr: "- Académie de Meuron, Neuchâtel", en: "- Académie de Meuron, Neuchâtel" },
  eduEcal: { fr: "- ECAL bachelor design industriel, Lausanne", en: "- ECAL bachelor of industrial design, Lausanne" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "fr";
    return (localStorage.getItem("lang") as Lang) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: keyof typeof dict) => dict[key][lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
