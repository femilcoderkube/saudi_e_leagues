import React, { useMemo } from "react";

const SPARKLE_COUNT = 80;
const SPARKLE_COLORS = [
    "#ff1493", // deep pink
    "#ff69b4", // hot pink
    "#ff6347", // tomato red
    "#ff1493", // deep pink

  ];
  
  const SPARKLE_GLOWS = [
    "0 0 4px #ff1493, 0 0 8px #ff1493, 0 0 12px #ff1493",
    "0 0 4px #ff69b4, 0 0 8px #ff69b4, 0 0 12px #ff69b4",
    "0 0 4px #ff6347, 0 0 8px #ff6347, 0 0 12px #ff6347",

    "0 0 4px #dc143c, 0 0 8px #dc143c, 0 0 12px #dc143c",
    "0 0 4px #ff1493, 0 0 8px #ff1493, 0 0 12px #ff1493",

    "0 0 4px #ff6b9d, 0 0 8px #ff6b9d, 0 0 12px #ff6b9d",

  ];

const Sparkles = () => {
  // Generate sparkle properties once and memoize them
  const sparkleProps = useMemo(() => {
    return Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
      // Use different multipliers for better distribution
      const seed1 = i * 1234.5;
      const seed2 = i * 2345.6;
      const seed3 = i * 3456.7;
      const seed4 = i * 4567.8;
      const seed5 = i * 5678.9;
      const seed6 = i * 6789.1;
      
      // Use different math functions for more varied distribution
      const random1 = (Math.sin(seed1) + 1) / 2;
      const random2 = (Math.cos(seed2) + 1) / 2;
      const random3 = (Math.sin(seed3 * 0.7) + 1) / 2;
      const random4 = (Math.cos(seed4 * 0.8) + 1) / 2;
      const random5 = (Math.sin(seed5 * 1.2) + 1) / 2;
      const random6 = (Math.cos(seed6 * 1.3) + 1) / 2;
      
      return {
        colorIdx: i % SPARKLE_COLORS.length,
        glowIdx: i % SPARKLE_GLOWS.length,
        size: 2 + random1 * 2, // 2px to 4px
        opacity: 0.4 + random2 * 0.3, // 0.4 to 0.7
        left: 10 + random3 * 80, // 10% to 90% (avoid edges)
        top: 10 + random4 * 80, // 10% to 90% (avoid edges)
        delay: random5 * 4, // 0 to 4 seconds random delays
        duration: 3 + random6 * 2, // 3-5 seconds
        animationType: i % 3 === 0 ? 'sparkle-smooth' : i % 3 === 1 ? 'sparkle-gentle' : 'sparkle-float',
      };
    });
  }, []);

  return (
    <div className="sparkles-overlay pointer-events-none ">
      {sparkleProps.map((props, i) => {
        const style = {
          left: `${props.left}%`,
          top: `${props.top}%`,
          width: `${props.size}px`,
          height: `${props.size}px`,
          background: SPARKLE_COLORS[props.colorIdx],
          boxShadow: SPARKLE_GLOWS[props.glowIdx],
          opacity: props.opacity,
          borderRadius: "50%",
          position: "absolute",
          animation: `${props.animationType} ${props.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
          animationDelay: `${props.delay}s`,
          pointerEvents: "none",
          willChange: "transform, opacity",
        };
        
        return <span key={i} className="sparkle" style={style} />;
      })}
      
      <style>{`
        @keyframes sparkle-smooth {
          0% {
            transform: scale(0.6) translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          20% {
            transform: scale(1) translateY(-3px) rotate(72deg);
            opacity: 0.7;
          }
          40% {
            transform: scale(1.2) translateY(-5px) rotate(144deg);
            opacity: 0.9;
          }
          60% {
            transform: scale(1.1) translateY(-4px) rotate(216deg);
            opacity: 0.8;
          }
          80% {
            transform: scale(0.9) translateY(-2px) rotate(288deg);
            opacity: 0.6;
          }
          100% {
            transform: scale(0.6) translateY(0px) rotate(360deg);
            opacity: 0.3;
          }
        }
        
        @keyframes sparkle-gentle {
          0% {
            transform: scale(0.8) translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: scale(1.1) translateY(-2px) translateX(1px);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3) translateY(-4px) translateX(0px);
            opacity: 1;
          }
          75% {
            transform: scale(1.1) translateY(-2px) translateX(-1px);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8) translateY(0px) translateX(0px);
            opacity: 0.4;
          }
        }
        
        @keyframes sparkle-float {
          0% {
            transform: scale(0.7) translateY(0px);
            opacity: 0.5;
          }
          33% {
            transform: scale(1.1) translateY(-2px);
            opacity: 0.9;
          }
          66% {
            transform: scale(1.2) translateY(-3px);
            opacity: 0.7;
          }
          100% {
            transform: scale(0.7) translateY(0px);
            opacity: 0.5;
          }
        }
        
        .sparkles-overlay {
          position: absolute;
          pointer-events: none;
          z-index: -1;
          bottom: 0.5rem;
          right: -3.5rem;
          height: 8.5rem;
          width: 30.5rem;
          border-radius: 50% 50% 50% 50% / 80% 40% 80% 40%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Sparkles;