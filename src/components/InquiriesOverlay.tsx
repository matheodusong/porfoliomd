import OverlayPage from "./OverlayPage";

interface InquiriesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiriesOverlay = ({ isOpen, onClose }: InquiriesOverlayProps) => {
  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <div className="max-w-4xl mx-auto pt-36 md:pt-48 px-6 md:px-10 text-center">
        <p className="spec-label mb-4">Contact</p>
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tighter mb-20 text-foreground">
          <a
            href="mailto:hello@matheodusong.com"
            className="hover:text-muted-foreground transition-colors duration-300"
          >
            hello@matheodusong.com
          </a>
        </h2>
      </div>
    </OverlayPage>
  );
};

export default InquiriesOverlay;
