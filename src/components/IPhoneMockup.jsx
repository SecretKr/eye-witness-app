import React from 'react';

const IPhoneMockup = ({ children, screenWidth = 430 }) => {
  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-4">
      <div 
        className="relative bg-black rounded-[55px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-[#333] ring-[12px] ring-black overflow-hidden"
        style={{ 
          width: `${screenWidth}px`, 
          height: '932px', // iPhone 14 Pro Max height approx
          maxHeight: '90vh'
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50 pointer-events-none"></div>

        {/* Screen Content */}
        <div 
          className="w-full h-full overflow-hidden bg-white rounded-[45px] relative transform-gpu"
        >
          {children}
        </div>

        {/* Home Indicator line (optional) */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-black/40 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default IPhoneMockup;
