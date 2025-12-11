import React, { useState, useRef, useEffect } from 'react';

const RangeSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  showValue = true,
  className = '',
  formatValue,
}) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null);

  const percentage = ((value - min) / (max - min)) * 100;
  
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setHoverPosition(pos);
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        {label && (
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
            {label}
          </label>
        )}
        {showValue && (
          <span 
            className="text-lg font-bold text-primary-400 font-display tabular-nums"
            style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.4)' }}
          >
            {displayValue}
          </span>
        )}
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-8 flex items-center group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Track background */}
        <div 
          className="absolute inset-x-0 h-2 bg-dark-800 border border-dark-600 overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
          }}
        >
          {/* Filled track with glow */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-150"
            style={{ 
              width: `${percentage}%`,
              boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
            }}
          />
          
          {/* Animated pulse on filled area */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-150"
            style={{ 
              width: `${percentage}%`,
              animation: isDragging ? 'pulse 1s ease-in-out infinite' : 'none',
            }}
          />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
              backgroundSize: '8px 100%',
            }}
          />
        </div>
        
        {/* Hover preview line */}
        {hoverPosition !== null && (
          <div 
            className="absolute top-0 bottom-0 w-px bg-primary-400/50 pointer-events-none transition-opacity duration-150"
            style={{ left: `${hoverPosition}%` }}
          />
        )}
        
        {/* Thumb indicator */}
        <div 
          className="absolute w-5 h-5 bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-primary-300 
                     transform -translate-x-1/2 transition-all duration-150 group-hover:scale-110 z-10"
          style={{ 
            left: `${percentage}%`,
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        />
        
        {/* Invisible input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
      </div>
      
      {/* Min/Max labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
        <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
