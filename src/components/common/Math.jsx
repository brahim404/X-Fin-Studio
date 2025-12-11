import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Inline math component for formulas within text
 */
export const MathInline = ({ children, className = '' }) => {
  return (
    <span className={`math-inline ${className}`}>
      <InlineMath math={children} />
    </span>
  );
};

/**
 * Block math component for standalone formulas
 */
export const MathBlock = ({ children, className = '' }) => {
  return (
    <div className={`math-block my-2 ${className}`}>
      <BlockMath math={children} />
    </div>
  );
};

/**
 * Formula card component for displaying labeled formulas
 */
export const FormulaCard = ({ label, formula, description, className = '' }) => {
  return (
    <div 
      className={`p-4 bg-dark-800/70 border border-dark-600/50 relative overflow-hidden ${className}`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
      }}
    >
      {/* Accent line */}
      <div 
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary-500/80 via-primary-500/30 to-transparent"
      />
      
      <div className="flex flex-col gap-2">
        <span 
          className="text-primary-400 font-semibold uppercase tracking-wide text-xs"
          style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.3)' }}
        >
          {label}
        </span>
        <div 
          className="text-white font-medium py-2 px-3 bg-dark-900/80 border-l-2 border-primary-500"
          style={{ 
            fontFamily: 'KaTeX_Math, Times New Roman, serif',
            boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.05)'
          }}
        >
          <BlockMath math={formula} />
        </div>
        {description && (
          <p className="text-gray-500 text-xs mt-1 italic">{description}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Formula section component for grouping multiple formulas
 */
export const FormulaSection = ({ formulas, legend, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {formulas.map((item, index) => (
        <FormulaCard 
          key={index}
          label={item.label}
          formula={item.formula}
          description={item.description}
        />
      ))}
      {legend && (
        <div 
          className="text-gray-500 text-xs p-3 bg-dark-800/50 border border-dark-700/30 italic"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
          }}
        >
          <span className="text-primary-400/70 font-semibold not-italic">Où : </span>
          {legend}
        </div>
      )}
    </div>
  );
};

export default { MathInline, MathBlock, FormulaCard, FormulaSection };
