import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";
import { getProjectImage } from "@/data/projects";
import type { ProjectData } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectDetailProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const count = project?.imageCount ?? 3;

  // Reset lightbox when project changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [project?.slug, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null ? (i + 1) % count : null));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null ? (i + count - 1) % count : null));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, count]);

  if (!project) return null;

  const subtitle = lang === "en" ? project.subtitleEn ?? project.subtitle : project.subtitle;
  const description = lang === "en" ? project.descriptionEn ?? project.description : project.description;
  const objective = lang === "en" ? project.objectiveEn ?? project.objective ?? project.description : project.objective ?? project.description;
  const materiality = lang === "en" ? project.materialityEn ?? project.materiality : project.materiality;
  const credits = lang === "en" ? project.creditsEn ?? project.credits : project.credits;

  const images = Array.from({ length: count }, (_, i) => ({
    src: getProjectImage(project.imageFolder, i + 1),
    alt: i === 0 ? `${project.title} — ${subtitle} by Matheo Dusong` : `${project.title} detail view ${i}`,
  }));

  const videoCount = project.videoCount ?? 0;
  const videos = Array.from({ length: videoCount }, (_, i) => ({
    src: `/images/${project.imageFolder}/video-${i + 1}.mp4`,
  }));

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title={`${project.title} — ${subtitle}`}
        description={description}
        path={`/project/${project.slug}`}
        type="article"
        image={images[0].src}
      />
      <article className="max-w-[95vw] mx-auto pt-20 md:pt-24 px-4 lg:h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0">
          {/* Images */}
          <div className="lg:col-span-9 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-3 min-h-0 lg:h-full">
            {images.map((img, i) => (
              <figure
                key={i}
                className="w-full lg:w-auto lg:h-full min-w-0 flex items-center justify-center cursor-zoom-in shrink"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full lg:w-auto lg:max-h-full lg:h-auto object-contain transition-all duration-500 hover:scale-[1.02]"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </figure>
            ))}
            {videos.map((v, i) => (
              <figure
                key={`v-${i}`}
                className="w-full lg:w-auto lg:h-full min-w-0 flex items-center justify-center shrink"
              >
                <video
                  src={v.src}
                  className="w-full lg:w-auto lg:max-h-full lg:h-auto object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              </figure>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 flex flex-col justify-start lg:h-full py-8 lg:py-[190px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter uppercase leading-none text-foreground">
              {project.title}
            </h1>
            <div className="text-secondary-foreground text-sm leading-relaxed space-y-6 mt-6">
              <section aria-labelledby={`project-${project.slug}-about`}>
                <h2 id={`project-${project.slug}-about`} className="spec-label mb-2">
                  {lang === "en" ? "About" : "À propos"}
                </h2>
                <p>{objective}</p>
              </section>
              <section aria-labelledby={`project-${project.slug}-materials`}>
                <h2 id={`project-${project.slug}-materials`} className="spec-label mb-2">
                  {lang === "en" ? "Materials & year" : "Matériaux & année"}
                </h2>
                <p>{materiality}</p>
              </section>
              {credits && (
                <section aria-labelledby={`project-${project.slug}-credits`}>
                  <h2 id={`project-${project.slug}-credits`} className="spec-label mb-2">
                    {lang === "en" ? "Credits" : "Crédits"}
                  </h2>
                  <p>{credits}</p>
                </section>
              )}
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
              className="absolute top-20 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 p-2 text-foreground/40 hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + count - 1) % count); }}
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
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % count); }}
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
