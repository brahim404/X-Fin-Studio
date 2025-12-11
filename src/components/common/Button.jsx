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
  const baseClasses = 'px-6 py-2.5 font-semibold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed clip-path-angular';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-500 border border-primary-400/50 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]',
    secondary: 'bg-dark-800 text-gray-200 hover:bg-dark-700 border border-dark-500/50 hover:border-primary-500/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]',
    accent: 'bg-accent-600 text-white hover:bg-accent-500 border border-accent-400/50 shadow-[0_0_15px_rgba(255,0,64,0.3)] hover:shadow-[0_0_25px_rgba(255,0,64,0.5)]',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]',
    danger: 'bg-accent-600 text-white hover:bg-accent-500 border border-accent-400/50 shadow-[0_0_15px_rgba(255,0,64,0.3)]',
    ghost: 'text-gray-400 hover:text-primary-400 hover:bg-dark-700/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        textShadow: variant === 'primary' ? '0 0 10px rgba(0, 212, 255, 0.5)' : 
                    variant === 'accent' || variant === 'danger' ? '0 0 10px rgba(255, 0, 64, 0.5)' : 'none'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
