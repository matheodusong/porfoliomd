import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";

interface InquiriesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiriesOverlay = ({ isOpen, onClose }: InquiriesOverlayProps) => {
  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title="Contact"
        description="Get in touch with Matheo Dusong for industrial design projects, collaborations, and inquiries."
        path="/contact"
      />
      <section className="max-w-4xl mx-auto pt-36 md:pt-48 px-6 md:px-10 text-center">
        <p className="spec-label mb-4">Contact</p>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tighter mb-20 text-foreground">
          <a
            href="mailto:dusong.matheo@gmail.com"
            className="hover:text-muted-foreground transition-colors duration-300"
          >
            matheo.dusong@gmail.com
          </a>
        </h1>
      </section>
    </OverlayPage>
  );
};

export default InquiriesOverlay;
