import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";
import { getProjectImage } from "@/data/projects";
import type { ProjectData } from "@/data/projects";

interface ProjectDetailProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Reset lightbox when project changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [project?.slug, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null ? (i + 1) % 3 : null));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null ? (i + 2) % 3 : null));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  if (!project) return null;

  const images = [
    { src: getProjectImage(project.imageFolder, 1), alt: `${project.title} — ${project.subtitle} by Matheo Dusong` },
    { src: getProjectImage(project.imageFolder, 2), alt: `${project.title} detail view 1` },
    { src: getProjectImage(project.imageFolder, 3), alt: `${project.title} detail view 2` },
  ];

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title={`${project.title} — ${project.subtitle}`}
        description={project.description}
        path={`/project/${project.slug}`}
        type="article"
        image={images[0].src}
      />
      <article className="max-w-[95vw] mx-auto pt-20 md:pt-24 px-4 h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 flex-1 min-h-0">
          {/* Images */}
          <div className="lg:col-span-9 flex gap-3 min-h-0 h-full">
            {images.map((img, i) => (
              <figure
                key={i}
                className="flex-1 min-w-0 flex items-center cursor-zoom-in"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain transition-all duration-500 hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 self-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter uppercase mb-6 leading-none text-foreground">
              {project.title}
            </h1>
            <p className="spec-label mb-8 lg:mb-12 text-foreground border-b border-border pb-6">
              {project.subtitle}
            </p>
            <div className="space-y-8 lg:space-y-12 text-secondary-foreground text-sm leading-relaxed">
              <section>
                <h2 className="spec-label mb-2">Objective</h2>
                <p>{project.objective}</p>
              </section>
              <section>
                <h2 className="spec-label mb-2">Materiality</h2>
                <p>{project.materiality}</p>
              </section>
            </div>
          </aside>
        </div>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 p-2 text-foreground/40 hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 2) % 3); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[85vw] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 p-2 text-foreground/40 hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % 3); }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIndex ? "bg-foreground" : "bg-foreground/30"}`}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayPage>
  );
};

export default ProjectDetail;
