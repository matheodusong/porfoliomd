import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

interface InfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoOverlay = ({ isOpen, onClose }: InfoOverlayProps) => {
  const { lang, t } = useLanguage();
  const masUrl = lang === "fr"
    ? "https://ecal.ch/fr/formations-recherche/mas/luxe/"
    : "https://ecal.ch/en/courses-and-research/mas/luxe/";

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title="Info / Contact"
        description="Matheo Dusong is a Swiss industrial designer based in Lausanne, working across objects, manufacturing processes, 3D and CGI."
        path="/info"
      />
      <section className="max-w-5xl mx-auto pt-28 md:pt-32 px-6 md:px-10 pb-12">
        <p className="spec-label mb-4">{t("profile")}</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-8 text-foreground leading-tight">
        </h1>
        <div className="max-w-3xl text-sm md:text-[15px] font-light leading-[1.55] text-secondary-foreground mb-10 space-y-3">
          {t("profileBio").split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="mb-10">
          <p className="spec-label mb-4">{t("formation")}</p>
          <ul className="text-lg md:text-xl lg:text-2xl font-light tracking-tighter text-foreground leading-tight space-y-2">
            <li>
              <a
                href={masUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                {t("eduMas")} ↗
              </a>
            </li>
            <li>{t("eduEcal")}</li>
            <li>{t("eduMeuron")}</li>
            <li>{t("eduIbcp")}</li>
          </ul>
        </div>
        <div className="flex flex-row items-start justify-between w-full gap-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=matheo.dusong@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open("https://mail.google.com/mail/?view=cm&fs=1&to=matheo.dusong@gmail.com", "_blank", "noopener,noreferrer");
            }}
            className="spec-label inline-block border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
          >
            matheo.dusong@gmail.com ↗
          </a>
          <div className="flex flex-col items-end gap-3">
            <a
              href="https://www.instagram.com/matheodusong/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open("https://www.instagram.com/matheodusong/", "_blank", "noopener,noreferrer");
              }}
              className="spec-label inline-block border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
            >
              Instagram ↗
            </a>
            <a
              href="https://www.linkedin.com/in/math%C3%A9o-dusong-060a291b5/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open("https://www.linkedin.com/in/math%C3%A9o-dusong-060a291b5/", "_blank", "noopener,noreferrer");
              }}
              className="spec-label inline-block border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    </OverlayPage>
  );
};

export default InfoOverlay;
