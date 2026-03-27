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

/** Pick `count` random items from an array (Fisher-Yates shuffle). */
function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectData[]>(() =>
    pickRandom(projects, 5)
  );

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
    setDisplayedProjects(pickRandom(projects, 5));
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

      {/* Grid View */}
      <motion.div
        className="flex flex-col lg:flex-row h-screen w-screen"
        animate={{
          scale: hasOverlay ? 0.95 : 1,
          opacity: hasOverlay ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="list"
        aria-label="Design projects"
      >
        {displayedProjects.map((project) => (
          <ProjectStrip
            key={project.slug}
            number={project.number}
            title={project.title}
            image={getProjectImage(project.imageFolder, 1)}
            onClick={() => openProject(project)}
          />
        ))}
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
