interface PortfolioHeaderProps {
  onOpenInfo: () => void;
  onOpenInquiries: () => void;
  onLogoClick: () => void;
}

const PortfolioHeader = ({ onOpenInfo, onOpenInquiries, onLogoClick }: PortfolioHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full px-5 py-6 md:px-8 md:py-8 z-[2500] flex justify-between pointer-events-none">
      <div className="pointer-events-auto cursor-pointer" onClick={onLogoClick}>
        <span className="block text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase text-foreground">
          Matheo Dusong
        </span>
        <span className="block text-[9px] text-muted-foreground uppercase mt-1">Industrial Designer</span>
      </div>
      <nav className="pointer-events-auto flex gap-6 md:gap-8">
        <button onClick={onOpenInquiries} className="nav-link">Inquiries</button>
        <button onClick={onOpenInfo} className="nav-link">Info</button>
      </nav>
    </header>
  );
};

export default PortfolioHeader;
