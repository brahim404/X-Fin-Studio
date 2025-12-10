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
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Angular lighting effect from left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-0 w-1/2 h-full bg-gradient-to-r from-primary-500/10 via-primary-600/5 to-transparent transform -skew-x-12" />
        <div className="absolute -left-1/4 top-1/4 w-1/3 h-1/2 bg-gradient-to-br from-primary-400/8 via-transparent to-transparent transform rotate-12" />
        <div className="absolute left-0 bottom-0 w-2/3 h-1/3 bg-gradient-to-tr from-accent-500/5 via-transparent to-transparent" />
        
        {/* Grid pattern - uses CSS variables from index.css */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--color-primary-500) 1px, transparent 1px),
                             linear-gradient(180deg, var(--color-primary-500) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Angular lines - uses CSS variables from index.css */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="100%" x2="60%" y2="0" stroke="url(#line-gradient)" strokeWidth="1" opacity="0.1" />
          <line x1="20%" y1="100%" x2="80%" y2="0" stroke="url(#line-gradient)" strokeWidth="1" opacity="0.05" />
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'var(--color-primary-500)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--color-accent-500)' }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <div className="animate-fade-in">
                <p className="text-primary-400 font-medium tracking-widest uppercase mb-4">
                  Simulateur Financier
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Maîtrisez vos
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">
                    Finances
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
                  Outils de simulation professionnels pour l'épargne, les emprunts, 
                  et la gestion de portefeuille en Dinar Tunisien.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/epargne"
                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 
                             font-medium hover:bg-primary-500 transition-all duration-200 
                             border border-primary-500/50 shadow-lg shadow-primary-900/30
                             group"
                  >
                    Commencer
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/portefeuille"
                    className="inline-flex items-center gap-2 bg-dark-700 text-gray-200 px-8 py-4 
                             font-medium hover:bg-dark-600 transition-all duration-200 
                             border border-dark-500/50"
                  >
                    Voir les outils
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-dark-700/50">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-dark-800/50 border border-dark-700/50 
                           hover:border-primary-500/30 transition-all duration-300
                           relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/50 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-dark-800/30">
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
