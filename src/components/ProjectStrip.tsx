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
      className="project-strip relative overflow-hidden cursor-pointer border-b border-foreground/10 lg:border-b-0 lg:border-r lg:border-foreground/10"
      style={{
        flex: isHovered ? 4 : 1,
        transition: "flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: "20vh",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out"
        style={{
          filter: isHovered ? "blur(0px)" : "blur(40px)",
          transform: isHovered ? "scale(1)" : "scale(1.1)",
          opacity: isHovered ? 1 : 0.4,
        }}
        loading="lazy"
      />
      <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-5 z-10 spec-label opacity-50 whitespace-nowrap lg:[writing-mode:vertical-lr] lg:rotate-180">
        {num} // {title}
      </div>
    </div>
  );
};

export default ProjectStrip;
