import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";

interface InfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoOverlay = ({ isOpen, onClose }: InfoOverlayProps) => {
  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title="About"
        description="Matheo Dusong is a Swiss based industrial designer studying at Ecal"
        path="/info"
      />
      <section className="max-w-4xl mx-auto pt-36 md:pt-48 px-6 md:px-10">
        <p className="spec-label mb-4">Profile</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-12 text-foreground leading-tight">
         Matheo Dusong is a Swiss based industrial designer studying at Ecal
        </h1>
      </section>
    </OverlayPage>
  );
};

export default InfoOverlay;
