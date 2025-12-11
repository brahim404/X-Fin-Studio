import React from 'react';
import { Link } from 'react-router-dom';

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
              <div className="animate-fade-in">
                <p 
                  className="text-primary-400 font-bold tracking-[0.3em] uppercase mb-4 font-display"
                  style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
                >
                  Simulateur Financier
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-display">
                  <span style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.1)' }}>MAÎTRISEZ VOS</span>
                  <br />
                  <span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent-500"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
                    }}
                  >
                    FINANCES
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed font-medium">
                  Outils de simulation professionnels pour l'épargne, les emprunts, 
                  et la gestion de portefeuille en Dinar Tunisien.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/epargne"
                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 
                             font-bold uppercase tracking-wider hover:bg-primary-500 transition-all duration-200 
                             border border-primary-400/50 group clip-path-angular"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
                      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    Commencer
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/portefeuille"
                    className="inline-flex items-center gap-2 bg-dark-800 text-gray-200 px-8 py-4 
                             font-bold uppercase tracking-wider hover:bg-dark-700 transition-all duration-200 
                             border border-dark-500/50 hover:border-primary-500/50 clip-path-angular"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    Voir les outils
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-primary-500/20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-dark-900/80 border border-dark-700/50 
                           hover:border-primary-500/50 transition-all duration-300
                           relative overflow-hidden backdrop-blur-sm"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-transparent to-transparent 
                                opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                  />
                  <div 
                    className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mb-4"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                  >
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-bold text-white mb-2 uppercase tracking-wide font-display"
                    style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.2)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-dark-900/50 border-t border-primary-500/10">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '6', label: 'Modules' },
                { value: 'TND', label: 'Devise' },
                { value: '∞', label: 'Simulations' },
                { value: '100%', label: 'Gratuit' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                  <div className="text-gray-500 uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
