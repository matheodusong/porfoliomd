import OverlayPage from "./OverlayPage";
import SEOHead from "./SEOHead";
import type { ProjectData } from "@/data/projects";

interface ProjectDetailProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  if (!project) return null;

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <SEOHead
        title={`${project.title} — ${project.subtitle}`}
        description={project.description}
        path={`/project/${project.slug}`}
        type="article"
        image={project.mainImg}
      />
      <article className="max-w-[90vw] mx-auto pt-24 md:pt-32 px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Image */}
          <figure className="lg:col-span-9">
            <img
              src={project.mainImg}
              alt={`${project.title} — ${project.subtitle} by Matheo Dusong`}
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] lg:aspect-video"
            />
          </figure>

          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start">
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

          {/* Extra Images */}
          <div className="lg:col-span-9 space-y-10 lg:space-y-20">
            <figure>
              <img
                src={project.secImg1}
                alt={`${project.title} detail view 1`}
                className="w-full opacity-80 lg:opacity-60 hover:opacity-100 transition-opacity duration-700"
              />
            </figure>
            <figure>
              <img
                src={project.secImg2}
                alt={`${project.title} detail view 2`}
                className="w-full opacity-80 lg:opacity-60 hover:opacity-100 transition-opacity duration-700"
              />
            </figure>
          </div>
        </div>
      </article>
    </OverlayPage>
  );
};

export default ProjectDetail;
