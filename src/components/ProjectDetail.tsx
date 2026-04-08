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
  if (!project) return null;

  const mainImg = getProjectImage(project.imageFolder, 1);
  const secImg1 = getProjectImage(project.imageFolder, 2);
  const secImg2 = getProjectImage(project.imageFolder, 3);

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title={`${project.title} — ${project.subtitle}`}
        description={project.description}
        path={`/project/${project.slug}`}
        type="article"
        image={mainImg}
      />
      <article className="max-w-[95vw] mx-auto pt-20 md:pt-24 px-4 h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 flex-1 min-h-0">
          {/* Images - 3 columns */}
          <div className="lg:col-span-9 flex gap-3 min-h-0 h-full">
            <figure className="flex-1 min-w-0 flex items-center">
              <img
                src={mainImg}
                alt={`${project.title} — ${project.subtitle} by Matheo Dusong`}
                className="w-full h-full object-contain transition-all duration-1000"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="flex-1 min-w-0 flex items-center">
              <img
                src={secImg1}
                alt={`${project.title} detail view 1`}
                className="w-full h-full object-contain transition-opacity duration-700"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="flex-1 min-w-0 flex items-center">
              <img
                src={secImg2}
                alt={`${project.title} detail view 2`}
                className="w-full h-full object-contain transition-opacity duration-700"
                loading="eager"
                decoding="async"
              />
            </figure>
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
    </OverlayPage>
  );
};

export default ProjectDetail;
