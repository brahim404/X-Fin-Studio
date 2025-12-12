import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/animate-ui';

const ToolCard = ({ to, title, description, icon, color, delay = 0 }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
    });
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' });
    setGlowPosition({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const colorClasses = {
    primary: {
      border: 'border-primary-500/30 hover:border-primary-400/60',
      glow: 'rgba(0, 212, 255, 0.4)',
      iconBg: 'from-primary-500 to-primary-700',
      shadow: '0 0 30px rgba(0, 212, 255, 0.3)',
      text: 'text-primary-400',
    },
    accent: {
      border: 'border-accent-500/30 hover:border-accent-400/60',
      glow: 'rgba(255, 0, 64, 0.4)',
      iconBg: 'from-accent-500 to-accent-700',
      shadow: '0 0 30px rgba(255, 0, 64, 0.3)',
      text: 'text-accent-400',
    },
    purple: {
      border: 'border-purple-500/30 hover:border-purple-400/60',
      glow: 'rgba(168, 85, 247, 0.4)',
      iconBg: 'from-purple-500 to-purple-700',
      shadow: '0 0 30px rgba(168, 85, 247, 0.3)',
      text: 'text-purple-400',
    },
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        ref={cardRef}
        to={to}
        className={`block relative overflow-hidden bg-dark-900/80 backdrop-blur-sm border ${colors.border} 
                   transition-all duration-300 group`}
        style={{ 
          ...tiltStyle, 
          transition: 'transform 0.15s ease-out',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Hover glow effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${colors.glow} 0%, transparent 60%)`,
          }}
        />

        {/* Shine effect on hover */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
          }}
        />

        {/* Top edge glow */}
        <div 
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.glow.replace('0.4', '0.6')} ${glowPosition.x}%, transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Card content */}
        <div className="relative z-10 p-8">
          {/* Icon */}
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mb-6`}
            style={{
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              boxShadow: isHovered ? colors.shadow : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </motion.div>

          {/* Title */}
          <h3 
            className={`text-2xl font-bold text-white mb-3 font-display uppercase tracking-wide group-hover:${colors.text} transition-colors`}
            style={{ textShadow: isHovered ? colors.shadow.replace('30px', '15px') : 'none' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Action indicator */}
          <div className={`flex items-center gap-2 ${colors.text} font-semibold uppercase tracking-wider text-sm`}>
            <span>Accéder</span>
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
        </div>

        {/* Corner decorations */}
        <div 
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-30 transition-opacity group-hover:opacity-60"
          style={{ borderColor: colors.glow.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 1)', ')') }}
        />
        <div 
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 opacity-30 transition-opacity group-hover:opacity-60"
          style={{ borderColor: colors.glow.replace('0.4)', '1)').replace('rgba', 'rgb').replace(', 1)', ')') }}
        />
      </Link>
    </motion.div>
  );
};

const Tools = () => {
  const tools = [
    {
      to: '/epargne',
      title: 'Épargne',
      description: 'Simulez vos placements avec intérêts simples et composés. Calculez la valeur future de votre capital et planifiez vos objectifs financiers.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'primary',
    },
    {
      to: '/compte-courant',
      title: 'Compte Courant',
      description: 'Gérez les opérations de votre compte courant. Calculez les intérêts débiteurs et créditeurs avec la méthode Hambourgeoise.',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      color: 'accent',
    },
    {
      to: '/escompte',
      title: 'Escompte',
      description: 'Créez des bordereaux d\'escompte professionnels. Calculez l\'agio, les commissions et le net à percevoir pour vos effets de commerce.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 py-16 px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.p 
              className="text-primary-400 font-bold tracking-[0.3em] uppercase mb-4 font-display"
              style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
            >
              Outils Financiers
            </motion.p>
            <h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-display"
              style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.1)' }}
            >
              CHOISISSEZ VOTRE{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent-500"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))' }}
              >
                SIMULATEUR
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sélectionnez l'outil adapté à vos besoins de calcul financier
            </p>
          </motion.div>
        </div>

        {/* Tool Cards Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.to}
                {...tool}
                delay={0.1 + index * 0.15}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div 
          className="max-w-6xl mx-auto mt-16 pt-8 border-t border-dark-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm uppercase tracking-wider">3 outils disponibles</span>
            </div>
            <span className="text-dark-600">|</span>
            <Link 
              to="/" 
              className="text-sm uppercase tracking-wider hover:text-primary-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;
