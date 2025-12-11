import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
  className = '',
  error,
  helperText,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`w-full px-4 py-2.5 bg-dark-900 border focus:ring-2 focus:ring-primary-500/50 
                    focus:border-primary-500 outline-none text-gray-100 placeholder-gray-500
                    transition-all duration-200 font-medium ${
          error ? 'border-accent-500' : 'border-dark-600'
        }`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
        }}
        {...props}
      />
      {error && <p className="text-accent-500 text-sm mt-1 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
