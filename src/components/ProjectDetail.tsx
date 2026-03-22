import OverlayPage from "./OverlayPage";

export interface ProjectData {
  title: string;
  subtitle: string;
  mainImg: string;
  secImg1: string;
  secImg2: string;
}

interface ProjectDetailProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  if (!project) return null;

  return (
    <OverlayPage isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[90vw] mx-auto pt-24 md:pt-32 px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Image */}
          <div className="lg:col-span-9">
            <img
              src={project.mainImg}
              alt={project.title}
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] lg:aspect-video"
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter uppercase mb-6 leading-none text-foreground">
              {project.title}
            </h2>
            <p className="spec-label mb-8 lg:mb-12 text-foreground border-b border-border pb-6">
              {project.subtitle}
            </p>
            <div className="space-y-8 lg:space-y-12 text-secondary-foreground text-sm leading-relaxed">
              <div>
                <p className="spec-label mb-2">Objective</p>
                <p>Investigation into tactile relationships between raw materials and functional performance in high-stress environments.</p>
              </div>
              <div>
                <p className="spec-label mb-2">Materiality</p>
                <p>Anodized Aluminum, Borosilicate Glass, Machined Carbon Fiber.</p>
              </div>
            </div>
          </div>

          {/* Extra Images */}
          <div className="lg:col-span-9 space-y-10 lg:space-y-20">
            <img
              src={project.secImg1}
              alt={`${project.title} detail 1`}
              className="w-full opacity-80 lg:opacity-60 hover:opacity-100 transition-opacity duration-700"
            />
            <img
              src={project.secImg2}
              alt={`${project.title} detail 2`}
              className="w-full opacity-80 lg:opacity-60 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
        </div>
      </div>
    </OverlayPage>
  );
};

export default ProjectDetail;
