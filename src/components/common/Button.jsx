import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const variantStyles = {
    primary: {
      base: 'bg-primary-600 text-white border border-primary-400/50',
      hover: 'hover:bg-primary-500',
      glow: 'rgba(0, 212, 255, 0.4)',
      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
    },
    secondary: {
      base: 'bg-dark-800 text-gray-200 border border-dark-500/50',
      hover: 'hover:bg-dark-700 hover:border-primary-500/50',
      glow: 'rgba(0, 212, 255, 0.2)',
      textShadow: 'none',
    },
    accent: {
      base: 'bg-accent-600 text-white border border-accent-400/50',
      hover: 'hover:bg-accent-500',
      glow: 'rgba(255, 0, 64, 0.4)',
      textShadow: '0 0 10px rgba(255, 0, 64, 0.5)',
    },
    purple: {
      base: 'bg-purple-600 text-white border border-purple-400/50',
      hover: 'hover:bg-purple-500',
      glow: 'rgba(168, 85, 247, 0.4)',
      textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
    },
    outline: {
      base: 'border-2 border-primary-500 text-primary-400 bg-transparent',
      hover: 'hover:bg-primary-500/10',
      glow: 'rgba(0, 212, 255, 0.3)',
      textShadow: 'none',
    },
    danger: {
      base: 'bg-accent-600 text-white border border-accent-400/50',
      hover: 'hover:bg-accent-500',
      glow: 'rgba(255, 0, 64, 0.4)',
      textShadow: '0 0 10px rgba(255, 0, 64, 0.5)',
    },
    ghost: {
      base: 'text-gray-400 bg-transparent border-transparent',
      hover: 'hover:text-primary-400 hover:bg-dark-700/50',
      glow: 'transparent',
      textShadow: 'none',
    },
  };

  const currentVariant = variantStyles[variant];

  const addRipple = (e) => {
    if (disabled) return;
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      type={type}
      onClick={(e) => {
        addRipple(e);
        onClick?.(e);
      }}
      disabled={disabled}
      className={`relative overflow-hidden px-6 py-2.5 font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${currentVariant.base} ${currentVariant.hover} ${className}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        textShadow: currentVariant.textShadow,
        boxShadow: isHovered ? `0 0 25px ${currentVariant.glow}` : `0 0 15px ${currentVariant.glow}`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${currentVariant.glow} 0%, transparent 70%)`,
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: ripple.size, height: ripple.size, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      
      {children}
    </motion.button>
  );
};

export default Button;
