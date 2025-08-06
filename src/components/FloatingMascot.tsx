interface FloatingMascotProps {
  imagePath: string;
  size?: string;
  position: string;
  delay?: number;
}

const FloatingMascot = ({ imagePath, size = "w-20 h-20", position, delay = 0 }: FloatingMascotProps) => {
  return (
    <div 
      className={`absolute ${position} ${size} animate-float opacity-80 hover:opacity-100 transition-opacity duration-300`}
      style={{ animationDelay: `${delay}s` }}
    >
      <img 
        src={imagePath} 
        alt="Mascot silhouette" 
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
};

export default FloatingMascot;