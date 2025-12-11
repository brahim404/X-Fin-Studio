'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animated Button with Glow
export const AnimatedButton = React.forwardRef(
  ({ className, children, variant = 'default', size = 'default', ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const variants = {
      default: 'bg-primary-600 text-white hover:bg-primary-500 border-primary-500/50',
      secondary: 'bg-dark-700 text-gray-100 hover:bg-dark-600 border-dark-500',
      destructive: 'bg-accent-600 text-white hover:bg-accent-500 border-accent-500/50',
      outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
      ghost: 'text-gray-300 hover:bg-dark-700 hover:text-white border-transparent',
    };

    const sizes = {
      default: 'h-10 px-6 py-2',
      sm: 'h-8 px-4 text-sm',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider border transition-all duration-300 overflow-hidden',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-dark-900',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: variant === 'default' 
              ? 'radial-gradient(circle at center, rgba(0, 212, 255, 0.3) 0%, transparent 70%)'
              : variant === 'destructive'
              ? 'radial-gradient(circle at center, rgba(255, 0, 64, 0.3) 0%, transparent 70%)'
              : 'transparent',
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          }}
        />
        
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

// Magnetic Button
export function MagneticButton({ children, className, ...props }) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 font-semibold uppercase tracking-wider',
        'bg-primary-600 text-white border border-primary-500/50',
        'transition-colors hover:bg-primary-500',
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
      }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Ripple Button
export function RippleButton({ children, className, ...props }) {
  const [ripples, setRipples] = React.useState([]);

  const addRipple = (e) => {
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
    <button
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center px-6 py-3 font-semibold uppercase tracking-wider',
        'bg-primary-600 text-white border border-primary-500/50',
        'transition-all hover:bg-primary-500',
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
      }}
      onClick={addRipple}
      {...props}
    >
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
    </button>
  );
}

// Glowing Border Button
export function GlowingButton({ children, className, ...props }) {
  return (
    <div className="relative group">
      {/* Animated glow border */}
      <motion.div
        className="absolute -inset-0.5 rounded-sm opacity-75 blur-sm group-hover:opacity-100 transition duration-500"
        style={{
          background: 'linear-gradient(90deg, #00d4ff, #ff0040, #00d4ff)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <button
        className={cn(
          'relative inline-flex items-center justify-center px-6 py-3 font-semibold uppercase tracking-wider',
          'bg-dark-900 text-white',
          'transition-all',
          className
        )}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
