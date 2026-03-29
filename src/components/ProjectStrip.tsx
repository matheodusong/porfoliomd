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
      className="project-strip relative overflow-hidden cursor-pointer border-r border-border flex items-center justify-center h-full"
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
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            aspectRatio: "3/4",
            height: "85%",
            maxWidth: "90%",
            overflow: "hidden",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isHovered ? "scale(1)" : "scale(0.95)",
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

      {/* Label */}
      <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-5 z-10 spec-label text-foreground opacity-70 whitespace-nowrap lg:[writing-mode:vertical-lr] lg:rotate-180">
        {num} // {title}
      </div>
    </div>
  );
};

export default ProjectStrip;
