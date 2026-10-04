import { lazy, Suspense, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import ProjectStrip from "@/components/ProjectStrip";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { projects, getProjectBySlug, getProjectThumbnail, type ProjectData } from "@/data/projects";

const loadProjectDetail = () => import("@/components/ProjectDetail");
const loadInfoOverlay = () => import("@/components/InfoOverlay");
const ProjectDetail = lazy(loadProjectDetail);
const InfoOverlay = lazy(loadInfoOverlay);

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasOpenedInfo, setHasOpenedInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasOverlay = showDetail || showInfo;

  // Sync route → overlay state
  useEffect(() => {
    if (slug) {
      const project = getProjectBySlug(slug);
      if (project) {
        setActiveProject(project);
        setShowDetail(true);
        setShowInfo(false);
      }
    } else if (location.pathname === "/info") {
      setShowInfo(true);
      setHasOpenedInfo(true);
      setShowDetail(false);
    } else if (location.pathname === "/") {
      setShowDetail(false);
      setShowInfo(false);
    }
  }, [slug, location.pathname]);

  const closeAll = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openProject = useCallback(
    (project: ProjectData) => {
      navigate(`/project/${project.slug}`);
    },
    [navigate]
  );

  const openInfo = useCallback(() => {
    navigate("/info");
  }, [navigate]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <SEOHead />
      <JsonLd />

      <PortfolioHeader
        onOpenInfo={openInfo}
        onLogoClick={closeAll}
        onPrefetchInfo={loadInfoOverlay}
        isHome={location.pathname === "/"}
      />

      {/* Horizontal Carousel */}
      <div
        className={`portfolio-carousel h-[70vh] lg:h-[60vh] w-screen mt-[20vh] pb-6 overflow-x-auto overflow-y-hidden carousel-scrollbar cursor-grab active:cursor-grabbing ${hasOverlay ? "portfolio-carousel--hidden" : ""}`}
        ref={scrollRef}
        role="list"
        aria-label="Design projects"
      >
        <div className="flex h-full w-max">
          {projects.map((project, index) => (
            <ProjectStrip
              key={project.slug}
              title={project.title}
              image={getProjectThumbnail(project.imageFolder)}
              priority={index < 2}
              onClick={() => openProject(project)}
              onIntent={loadProjectDetail}
            />
          ))}
        </div>
      </div>

      {/* Overlays */}
      <Suspense fallback={null}>
        {activeProject && (
          <ProjectDetail
            project={activeProject}
            isOpen={showDetail}
            onClose={closeAll}
          />
        )}
        {hasOpenedInfo && <InfoOverlay isOpen={showInfo} onClose={closeAll} />}
      </Suspense>
    </main>
  );
};

export default Index;
