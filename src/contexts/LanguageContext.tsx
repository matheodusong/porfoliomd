import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, { fr: string; en: string }>;

const dict: Dict = {
  info: { fr: "Info / Contact", en: "Info / Contact" },
  profile: { fr: "Profil", en: "Profile" },
  swissDesigner: { fr: "— Designer industriel suisse", en: "— Swiss industrial designer" },
  profileBio: {
    fr: "Je pratique les sports nautiques depuis toujours — planche à voile, pump foil et wing foil. Ces disciplines ont façonné une relation directe aux matériaux de haute performance, notamment le carbone et le titane, très présents dans ces environnements exigeants.",
    en: "I have practised watersports throughout my life — windsurfing, pump foiling and wing foiling. These disciplines have shaped a direct relationship with high-performance materials, particularly carbon fibre and titanium, widely used in these demanding environments.",
  },
  formation: { fr: "Formation", en: "Education" },
  contact: { fr: "Contact", en: "Contact" },
  eduMas: {
    fr: "— ECAL MAS Design for Luxury & Craftsmanship, Lausanne — en cours",
    en: "— ECAL MAS Design for Luxury & Craftsmanship, Lausanne — ongoing",
  },
  eduIbcp: { fr: "— IBCP, Lisbonne", en: "— IBCP, Lisbon" },
  eduMeuron: { fr: "— Académie de Meuron, Neuchâtel", en: "— Académie de Meuron, Neuchâtel" },
  eduEcal: { fr: "— ECAL bachelor design industriel, Lausanne", en: "— ECAL bachelor of industrial design, Lausanne" },
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
