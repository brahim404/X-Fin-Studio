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
    default: 'bg-dark-800/80 border-dark-700/50',
    elevated: 'bg-dark-800 border-dark-600/50 shadow-2xl',
    outlined: 'bg-transparent border-dark-600',
  };

  return (
    <div 
      className={`backdrop-blur-sm border relative overflow-hidden ${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 via-primary-400/50 to-transparent" />
      
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-dark-700/50 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
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
