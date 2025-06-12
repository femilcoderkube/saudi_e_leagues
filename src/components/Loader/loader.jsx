import React from 'react';

const GamingLoader = () => {
  return (
    <div className="fixed inset-y-0 -inset-1 flex items-center justify-center bg-transparent z-50">
      <div className="relative">
        {/* Central blooming core */}
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(180deg,rgba(188, 82, 37, 0.92) 0%, rgba(244, 149, 40, 1) 100%)',
              boxShadow: `
                inset 0px 1px 4px #F38155,
                0 0 20px rgba(244, 149, 40, 0.8),
                0 0 40px rgba(244, 149, 40, 0.6),
                0 0 60px rgba(244, 149, 40, 0.4),
                0 0 80px rgba(244, 149, 40, 0.2)
              `,
              animationDuration: '2s'
            }}
          ></div>
        </div>

        {/* Blooming petals - Layer 1 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <div
              key={`petal1-${index}`}
              className="absolute w-8 h-20 transform -translate-x-1/2 origin-bottom animate-pulse"
              style={{
                background: `linear-gradient(0deg, 
                  rgba(244, 149, 40, 0.8) 0%, 
                  rgba(188, 82, 37, 0.6) 50%, 
                  transparent 100%)`,
                left: '50%',
                bottom: '50%',
                transformOrigin: '50% 32px',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                borderRadius: '50% 50% 0 0',
                filter: 'blur(1px)',
                animationDelay: `${index * 0.2}s`,
                animationDuration: '3s'
              }}
            ></div>
          ))}
        </div>

        {/* Blooming petals - Layer 2 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, index) => (
            <div
              key={`petal2-${index}`}
              className="absolute w-6 h-16 transform -translate-x-1/2 origin-bottom animate-pulse"
              style={{
                background: `linear-gradient(0deg, 
                  rgba(188, 82, 37, 0.7) 0%, 
                  rgba(244, 149, 40, 0.5) 50%, 
                  transparent 100%)`,
                left: '50%',
                bottom: '50%',
                transformOrigin: '50% 32px',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                borderRadius: '50% 50% 0 0',
                filter: 'blur(0.5px)',
                animationDelay: `${index * 0.15}s`,
                animationDuration: '2.5s'
              }}
            ></div>
          ))}
        </div>

        {/* Outer blooming ring */}
        <div className="absolute -inset-8">
          <div 
            className="w-full h-full rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                transparent 60%, 
                rgba(244, 149, 40, 0.1) 70%, 
                rgba(188, 82, 37, 0.2) 80%, 
                rgba(244, 149, 40, 0.3) 90%, 
                transparent 100%)`,
              animationDuration: '3s',
              filter: 'blur(2px)'
            }}
          ></div>
        </div>

        {/* Expanding energy waves */}
        {[1, 2, 3].map((wave, index) => (
          <div
            key={`wave-${index}`}
            className="absolute rounded-full border animate-ping"
            style={{
              width: `${(index + 1) * 80}px`,
              height: `${(index + 1) * 80}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: `rgba(244, 149, 40, ${0.4 - index * 0.1})`,
              borderWidth: '2px',
              animationDelay: `${index * 0.7}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}

        {/* Floating bloom particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(244, 149, 40, ${Math.random() * 0.8 + 0.2})`,
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-${Math.random() * 60 + 40}px)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(244, 149, 40, 0.6)`,
              filter: 'blur(0.5px)'
            }}
          ></div>
        ))}

        {/* Inner glow effect */}
        <div className="absolute inset-4">
          <div 
            className="w-full h-full rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                rgba(244, 149, 40, 0.6) 0%, 
                rgba(188, 82, 37, 0.4) 30%, 
                transparent 70%)`,
              animationDuration: '1.5s',
              filter: 'blur(4px)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GamingLoader;