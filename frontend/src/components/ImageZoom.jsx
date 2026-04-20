import { useState } from "react";

const ImageZoom = ({ src }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    let x = ((e.clientX || e.touches?.[0]?.clientX) - left) / width;
    let y = ((e.clientY || e.touches?.[0]?.clientY) - top) / height;

    // Clamp between 0 and 1
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-120 overflow-hidden rounded-2xl" //h-105 original
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setShowZoom(true)}
      onTouchMove={handleMove}
      onTouchEnd={() => setShowZoom(false)}
    >
      {/* Main Image */}
      <img
        src={src}
        className="w-full h-full object-contain"
        alt="product"
      />

      {/* Zoom Lens */}
      {showZoom && (
        <div
          className="absolute border-2 border-purple-500 bg-white/20 pointer-events-none"
          style={{
            width: "80px",
            height: "80px",
            top: `${position.y * 100}%`,
            left: `${position.x * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Zoomed Background */}
      {showZoom && (
        <div
          className="absolute inset-0 scale-110 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "160%",
            backgroundPosition: `${position.x * 100}% ${
              position.y * 100
            }%`,
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;