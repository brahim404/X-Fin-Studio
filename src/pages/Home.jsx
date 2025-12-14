import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidingNumber, StaggerContainer, StaggerItem } from '../components/animate-ui';

const TiltLink = ({ to, children, className, style, primary = false }) => {
  const linkRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;
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

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, ...tiltStyle, transition: 'transform 0.15s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${primary ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 212, 255, 0.2)'} 0%, transparent 60%)`,
        }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4) ${glowPosition.x}%, transparent)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

const Home = () => {
  const features = [
    {
      title: 'Calculs Instantanés',
      description: 'Algorithmes optimisés pour des résultats en temps réel',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Visualisations',
      description: 'Graphiques interactifs pour comprendre vos données',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Sauvegarde Auto',
      description: 'Vos simulations conservées localement',
      icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p 
                  className="text-primary-400 font-bold tracking-[0.3em] uppercase mb-4 font-display"
                  style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Simulateur Financier
                </motion.p>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.1)' }}>MAÎTRISEZ VOS</span>
                  <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent-500"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    FINANCES
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Outils de simulation professionnels pour l'épargne, les agios 
                  et l'escompte en Dinar Tunisien.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <TiltLink
                    to="/epargne"
                    primary
                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 
                             font-bold uppercase tracking-wider hover:bg-primary-500 transition-all duration-200 
                             border border-primary-400/50 group clip-path-angular"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
                      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    Commencer
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </TiltLink>
                  <TiltLink
                    to="/tools"
                    className="inline-flex items-center gap-2 bg-dark-800 text-gray-200 px-8 py-4 
                             font-bold uppercase tracking-wider hover:bg-dark-700 transition-all duration-200 
                             border border-dark-500/50 hover:border-primary-500/50 clip-path-angular"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    Voir les outils
                  </TiltLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-primary-500/20">
          <div className="container mx-auto px-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="group p-6 bg-dark-900/80 border border-dark-700/50 
                             hover:border-primary-500/50 transition-all duration-300
                             relative overflow-hidden backdrop-blur-sm"
                    style={{ 
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-transparent to-transparent"
                      style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    />
                    <motion.div 
                      className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary-500/20"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <svg className="w-6 h-6 text-primary-400 transition-all duration-300 group-hover:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                      </svg>
                    </motion.div>
                    <h3 
                      className="text-lg font-bold text-white mb-2 uppercase tracking-wide font-display transition-all duration-300 group-hover:text-primary-300"
                      style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.2)' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">{feature.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-dark-900/50 border-t border-primary-500/10">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: 3, label: 'Modules', isNumber: true },
                { value: 'TND', label: 'Devise', isNumber: false },
                { value: '∞', label: 'Simulations', isNumber: false },
                { value: 100, label: 'Gratuit', isNumber: true, suffix: '%' },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="text-3xl md:text-4xl font-bold text-primary-400 mb-2 font-display"
                    style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}
                  >
                    {stat.isNumber ? (
                      <>
                        <SlidingNumber value={stat.value} />
                        {stat.suffix}
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-gray-500 uppercase tracking-wider text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
