import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PortfolioHeader from "@/components/PortfolioHeader";
import ProjectStrip from "@/components/ProjectStrip";
import ProjectDetail, { type ProjectData } from "@/components/ProjectDetail";
import InfoOverlay from "@/components/InfoOverlay";
import InquiriesOverlay from "@/components/InquiriesOverlay";

const projects = [
  {
    title: "Alumine",
    subtitle: "Technical Study",
    mainImg: "https://images.unsplash.com/photo-1544244015-0cd4b3ff569d?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=2000",
  },
  {
    title: "RPR",
    subtitle: "CNC Fabrication",
    mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1508183393781-bc994c92bec1?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=2000",
  },
  {
    title: "Mille-foil",
    subtitle: "Structure Design",
    mainImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1614165933393-0ec2a5940935?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1526170315870-ef6d82f583ad?q=80&w=2000",
  },
  {
    title: "Zéphyr",
    subtitle: "Aerodynamic Study",
    mainImg: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2000",
  },
  {
    title: "Peony",
    subtitle: "Organic Form",
    mainImg: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000",
    secImg1: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000",
    secImg2: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
  },
];

const Index = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);

  const hasOverlay = showDetail || showInfo || showInquiries;

  const closeAll = useCallback(() => {
    setShowDetail(false);
    setShowInfo(false);
    setShowInquiries(false);
  }, []);

  const openProject = useCallback((project: ProjectData) => {
    closeAll();
    setActiveProject(project);
    setShowDetail(true);
  }, [closeAll]);

  const openInfo = useCallback(() => {
    closeAll();
    setShowInfo(true);
  }, [closeAll]);

  const openInquiries = useCallback(() => {
    closeAll();
    setShowInquiries(true);
  }, [closeAll]);

  return (
    <div className="h-screen w-screen overflow-hidden">
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
      >
        {projects.map((project, i) => (
          <ProjectStrip
            key={project.title}
            index={i}
            title={project.title}
            image={project.mainImg}
            onClick={() => openProject(project)}
          />
        ))}
      </motion.div>

      {/* Overlays */}
      <ProjectDetail
        project={activeProject}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
      <InfoOverlay isOpen={showInfo} onClose={() => setShowInfo(false)} />
      <InquiriesOverlay isOpen={showInquiries} onClose={() => setShowInquiries(false)} />
    </div>
  );
};

export default Index;
