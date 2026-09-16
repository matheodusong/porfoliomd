import { useLanguage } from "@/contexts/LanguageContext";

interface PortfolioHeaderProps {
  onOpenInfo: () => void;
  onLogoClick: () => void;
  onPrefetchInfo?: () => void;
}

const PortfolioHeader = ({ onOpenInfo, onLogoClick, onPrefetchInfo }: PortfolioHeaderProps) => {
  const { lang, setLang, t } = useLanguage();
  return (
    <header className="fixed top-0 left-0 w-full px-5 py-6 md:px-8 md:py-8 z-[2500] flex justify-between pointer-events-none">
      <div className="pointer-events-auto cursor-pointer" onClick={onLogoClick}>
        <span className="block text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase text-foreground">
          MD — Matheo Dusong
        </span>
      </div>
      <nav className="pointer-events-auto flex gap-6 md:gap-8">
        <button
          onClick={onOpenInfo}
          onMouseEnter={onPrefetchInfo}
          onFocus={onPrefetchInfo}
          className="nav-link"
        >
          {t("info")}
        </button>
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="nav-link"
          aria-label="Toggle language"
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>
      </nav>
    </header>
  );
};

export default PortfolioHeader;
