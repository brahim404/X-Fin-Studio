import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  headerAction,
  variant = 'default',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-dark-900/90 border-dark-700/80',
    elevated: 'bg-dark-900 border-dark-600/50 shadow-2xl',
    outlined: 'bg-transparent border-dark-600',
  };

  return (
    <div 
      className={`backdrop-blur-md border relative overflow-hidden ${variantClasses[variant]} ${className}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(0, 212, 255, 0.1)'
      }}
      {...props}
    >
      {/* Top accent line with glow */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-primary-400/80 to-transparent"
        style={{ boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }}
      />
      
      {/* Side accent */}
      <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-accent-500/50 via-transparent to-transparent" />
      
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-dark-700/50 flex justify-between items-center">
          <div>
            {title && (
              <h3 
                className="text-lg font-bold text-white font-display uppercase tracking-wide"
                style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.3)' }}
              >
                {title}
              </h3>
            )}
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
