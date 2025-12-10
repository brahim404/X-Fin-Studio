import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'px-6 py-2.5 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-500 border border-primary-500/50 shadow-lg shadow-primary-900/20',
    secondary: 'bg-dark-700 text-gray-200 hover:bg-dark-600 border border-dark-500/50',
    accent: 'bg-accent-600 text-white hover:bg-accent-500 border border-accent-500/50 shadow-lg shadow-accent-900/20',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
    danger: 'bg-accent-600 text-white hover:bg-accent-500 border border-accent-500/50',
    ghost: 'text-gray-400 hover:text-white hover:bg-dark-700/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
