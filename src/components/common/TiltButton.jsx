import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TiltButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (max 8 degrees)
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    
    // Calculate glow position as percentage
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
    });
    
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
    setGlowPosition({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const variantClasses = {
    primary: 'bg-primary-600 text-white border border-primary-400/50',
    secondary: 'bg-dark-800 text-gray-200 border border-dark-500/50',
    accent: 'bg-accent-600 text-white border border-accent-400/50',
    outline: 'border-2 border-primary-500 text-primary-400 bg-transparent',
    danger: 'bg-accent-600 text-white border border-accent-400/50',
    ghost: 'text-gray-400 bg-transparent border-none',
  };

  const glowColors = {
    primary: 'rgba(0, 212, 255, 0.6)',
    secondary: 'rgba(0, 212, 255, 0.3)',
    accent: 'rgba(255, 0, 64, 0.6)',
    outline: 'rgba(0, 212, 255, 0.4)',
    danger: 'rgba(255, 0, 64, 0.6)',
    ghost: 'rgba(0, 212, 255, 0.2)',
  };

  const shadowColors = {
    primary: '0 0 15px rgba(0,212,255,0.3), 0 4px 20px rgba(0,0,0,0.3)',
    secondary: '0 4px 20px rgba(0,0,0,0.3)',
    accent: '0 0 15px rgba(255,0,64,0.3), 0 4px 20px rgba(0,0,0,0.3)',
    outline: '0 4px 20px rgba(0,0,0,0.3)',
    danger: '0 0 15px rgba(255,0,64,0.3), 0 4px 20px rgba(0,0,0,0.3)',
    ghost: 'none',
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative px-6 py-2.5 font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${variantClasses[variant]} ${className}`}
      style={{
        ...tiltStyle,
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        boxShadow: isHovered ? shadowColors[variant].replace('0.3', '0.5') : shadowColors[variant],
        textShadow: variant === 'primary' ? '0 0 10px rgba(0, 212, 255, 0.5)' : 
                    variant === 'accent' || variant === 'danger' ? '0 0 10px rgba(255, 0, 64, 0.5)' : 'none',
        transition: 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {/* Dynamic glow effect that follows cursor */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColors[variant]} 0%, transparent 60%)`,
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        }}
      />
      
      {/* Top edge shimmer */}
      <div 
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4) ${glowPosition.x}%, transparent)`,
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default TiltButton;
