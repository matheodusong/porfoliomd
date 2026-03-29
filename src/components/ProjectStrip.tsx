import { useState } from "react";

interface ProjectStripProps {
  number: number;
  title: string;
  image: string;
  onClick: () => void;
}

const ProjectStrip = ({ number, title, image, onClick }: ProjectStripProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const num = String(number).padStart(2, "0");

  return (
    <div
      className="project-strip relative overflow-hidden cursor-grab active:cursor-grabbing border-r border-border flex items-center justify-center h-full"
      style={{
        width: isHovered ? "30vw" : "15vw",
        minWidth: isHovered ? "30vw" : "15vw",
        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vignette image — 3:4 aspect ratio, visible on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          style={{
            aspectRatio: "3/4",
            height: "85%",
            maxWidth: "90%",
            overflow: "hidden",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isHovered ? "scale(1)" : "scale(0.95)",
            filter: isHovered ? "blur(0px)" : "blur(6px)",
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStrip;
