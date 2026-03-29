import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PortfolioHeader from "@/components/PortfolioHeader";
import ProjectStrip from "@/components/ProjectStrip";
import ProjectDetail from "@/components/ProjectDetail";
import InfoOverlay from "@/components/InfoOverlay";
import InquiriesOverlay from "@/components/InquiriesOverlay";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { projects, getProjectBySlug, getProjectImage, type ProjectData } from "@/data/projects";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasOverlay = showDetail || showInfo || showInquiries;

  // Sync route → overlay state
  useEffect(() => {
    if (slug) {
      const project = getProjectBySlug(slug);
      if (project) {
        setActiveProject(project);
        setShowDetail(true);
        setShowInfo(false);
        setShowInquiries(false);
      }
    } else if (location.pathname === "/info") {
      setShowInfo(true);
      setShowDetail(false);
      setShowInquiries(false);
    } else if (location.pathname === "/contact") {
      setShowInquiries(true);
      setShowDetail(false);
      setShowInfo(false);
    } else if (location.pathname === "/") {
      setShowDetail(false);
      setShowInfo(false);
      setShowInquiries(false);
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

  const openInquiries = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <SEOHead />
      <JsonLd />

      <PortfolioHeader
        onOpenInfo={openInfo}
        onOpenInquiries={openInquiries}
        onLogoClick={closeAll}
      />

      {/* Horizontal Carousel */}
      <motion.div
        className="h-[70vh] lg:h-[60vh] w-screen mt-[20vh] overflow-x-auto overflow-y-hidden scrollbar-hide"
        ref={scrollRef}
        animate={{
          scale: hasOverlay ? 0.95 : 1,
          opacity: hasOverlay ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="list"
        aria-label="Design projects"
      >
        <div className="flex h-full w-max">
          {projects.map((project) => (
            <ProjectStrip
              key={project.slug}
              number={project.number}
              title={project.title}
              image={getProjectImage(project.imageFolder, 1)}
              onClick={() => openProject(project)}
            />
          ))}
        </div>
      </motion.div>

      {/* Overlays */}
      <ProjectDetail
        project={activeProject}
        isOpen={showDetail}
        onClose={closeAll}
      />
      <InfoOverlay isOpen={showInfo} onClose={closeAll} />
      <InquiriesOverlay isOpen={showInquiries} onClose={closeAll} />
    </main>
  );
};

export default Index;
