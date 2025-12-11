import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  headerAction,
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-dark-900/90 border-dark-700/80',
    elevated: 'bg-dark-900 border-dark-600/50 shadow-2xl',
    outlined: 'bg-transparent border-dark-600',
  };

  return (
    <motion.div 
      className={`backdrop-blur-md border relative overflow-hidden ${variantClasses[variant]} ${className}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        boxShadow: glow 
          ? '0 4px 30px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(0, 212, 255, 0.1)'
          : '0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(0, 212, 255, 0.1)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
      {...props}
    >
      {/* Animated top accent line with glow */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-primary-400/80 to-transparent"
        style={{ boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      
      {/* Animated side accent */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-accent-500/50 via-transparent to-transparent"
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* Subtle animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-dark-700/50 flex justify-between items-center relative">
          <div>
            {title && (
              <motion.h3 
                className="text-lg font-bold text-white font-display uppercase tracking-wide"
                style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.3)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {title}
              </motion.h3>
            )}
            {subtitle && (
              <motion.p 
                className="text-sm text-gray-400 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6 relative">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
