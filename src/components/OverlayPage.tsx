import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayPageProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayPage = ({ isOpen, onClose, children }: OverlayPageProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    if (isAtBottom && el.scrollTop > 50) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={scrollRef}
          className="fixed inset-0 w-full h-screen z-[1000] overflow-y-auto overlay-scroll font-body"
          style={{ backgroundColor: "hsl(var(--surface-overlay))", willChange: "transform" }}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onScroll={handleScroll}
        >
          {children}
          <div className="h-[80vh] flex flex-col items-center justify-start pt-[15vh]">
            <p className="spec-label opacity-30 tracking-[0.5em]">Scroll to close</p>
            <div className="h-32 w-px bg-border mt-6" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayPage;
