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
  colorTheme = 'primary', // 'primary' (blue), 'accent' (red), 'purple'
}) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [inputValue, setInputValue] = useState(value.toString());
  const [isEditing, setIsEditing] = useState(false);

  // Color theme configurations
  const themeColors = {
    primary: {
      text: 'text-primary-400',
      border: 'border-primary-500/30',
      borderFocus: 'focus:border-primary-500',
      hoverBorder: 'hover:border-primary-500/30',
      trackGradient: 'from-primary-600 to-primary-400',
      thumbGradient: 'from-primary-400 to-primary-600',
      thumbBorder: 'border-primary-300',
      hoverLine: 'bg-primary-400/50',
      glow: 'rgba(0, 212, 255, 0.5)',
      thumbGlow: 'rgba(0, 212, 255, 0.6)',
      textShadow: 'rgba(0, 212, 255, 0.4)',
      gridColor: 'rgba(0,212,255,0.3)',
    },
    accent: {
      text: 'text-accent-400',
      border: 'border-accent-500/30',
      borderFocus: 'focus:border-accent-500',
      hoverBorder: 'hover:border-accent-500/30',
      trackGradient: 'from-accent-600 to-accent-400',
      thumbGradient: 'from-accent-400 to-accent-600',
      thumbBorder: 'border-accent-300',
      hoverLine: 'bg-accent-400/50',
      glow: 'rgba(255, 0, 64, 0.5)',
      thumbGlow: 'rgba(255, 0, 64, 0.6)',
      textShadow: 'rgba(255, 0, 64, 0.4)',
      gridColor: 'rgba(255,0,64,0.3)',
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      borderFocus: 'focus:border-purple-500',
      hoverBorder: 'hover:border-purple-500/30',
      trackGradient: 'from-purple-600 to-purple-400',
      thumbGradient: 'from-purple-400 to-purple-600',
      thumbBorder: 'border-purple-300',
      hoverLine: 'bg-purple-400/50',
      glow: 'rgba(168, 85, 247, 0.5)',
      thumbGlow: 'rgba(168, 85, 247, 0.6)',
      textShadow: 'rgba(168, 85, 247, 0.4)',
      gridColor: 'rgba(168,85,247,0.3)',
    },
  };

  const theme = themeColors[colorTheme] || themeColors.primary;

  // Sync inputValue when value prop changes (unless actively editing)
  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    let newValue = parseFloat(inputValue);
    
    if (isNaN(newValue)) {
      setInputValue(value.toString());
      return;
    }
    
    // Clamp value to min/max
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Round to step
    newValue = Math.round(newValue / step) * step;
    
    // Fix floating point issues
    const decimals = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
    newValue = parseFloat(newValue.toFixed(decimals));
    
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    } else if (e.key === 'Escape') {
      setInputValue(value.toString());
      setIsEditing(false);
    }
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
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={isEditing ? inputValue : value}
              onChange={handleInputChange}
              onFocus={() => setIsEditing(true)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className={`w-20 px-2 py-0.5 text-lg font-bold ${theme.text} font-display tabular-nums 
                         bg-transparent border border-transparent ${theme.hoverBorder}
                         ${theme.borderFocus} focus:bg-dark-800/50 rounded text-right
                         transition-all duration-200 outline-none`}
              style={{ textShadow: `0 0 10px ${theme.textShadow}` }}
            />
            {unit && (
              <span 
                className={`text-lg font-bold ${theme.text} font-display`}
                style={{ textShadow: `0 0 10px ${theme.textShadow}` }}
              >
                {unit}
              </span>
            )}
          </div>
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
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${theme.trackGradient} transition-all duration-150`}
            style={{ 
              width: `${percentage}%`,
              boxShadow: `0 0 15px ${theme.glow}`,
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
              backgroundImage: `linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
              backgroundSize: '8px 100%',
            }}
          />
        </div>
        
        {/* Hover preview line */}
        {hoverPosition !== null && (
          <div 
            className={`absolute top-0 bottom-0 w-px ${theme.hoverLine} pointer-events-none transition-opacity duration-150`}
            style={{ left: `${hoverPosition}%` }}
          />
        )}
        
        {/* Thumb indicator */}
        <div 
          className={`absolute w-5 h-5 bg-gradient-to-br ${theme.thumbGradient} border-2 ${theme.thumbBorder} 
                     transform -translate-x-1/2 transition-all duration-150 group-hover:scale-110 z-10`}
          style={{ 
            left: `${percentage}%`,
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
            boxShadow: `0 0 20px ${theme.thumbGlow}, 0 2px 8px rgba(0,0,0,0.4)`,
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
