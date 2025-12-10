import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';

const Home = () => {
  const modules = [
    {
      id: 'epargne',
      title: 'Compte d\'Épargne',
      description: 'Simulez l\'évolution de votre épargne avec des versements mensuels',
      icon: '💰',
      path: '/epargne',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'compte-courant',
      title: 'Compte Courant',
      description: 'Simulez les agios et frais de découvert',
      icon: '🏧',
      path: '/compte-courant',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'escompte',
      title: 'Escompte Commercial',
      description: 'Générez un bordereau d\'escompte et calculez la valeur actuelle',
      icon: '📄',
      path: '/escompte',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'emprunt-indivis',
      title: 'Emprunts Indivis',
      description: 'Créez un tableau d\'amortissement pour vos emprunts',
      icon: '🏠',
      path: '/emprunt-indivis',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'emprunt-obligataire',
      title: 'Emprunts Obligataires',
      description: 'Simulez une émission obligataire et son service',
      icon: '📊',
      path: '/emprunt-obligataire',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      id: 'portefeuille',
      title: 'Gestion de Portefeuille',
      description: 'Optimisez votre portefeuille d\'actifs avec Markowitz',
      icon: '📈',
      path: '/portefeuille',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur <span className="text-primary-600">XFin Studio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre plateforme complète de simulation financière. 
            Explorez nos outils pour maîtriser vos finances et optimiser vos décisions.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => (
            <Link key={module.id} to={module.path} className="transform hover:scale-105 transition-transform duration-200">
              <div className={`h-full bg-gradient-to-br ${module.color} rounded-xl shadow-lg p-6 text-white`}>
                <div className="text-5xl mb-4">{module.icon}</div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-white/90">{module.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium">
                  <span>Explorer</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Calculs en Temps Réel</h4>
              <p className="text-gray-600 text-sm">
                Obtenez des résultats instantanés avec nos algorithmes optimisés
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">Visualisations Graphiques</h4>
              <p className="text-gray-600 text-sm">
                Comprenez vos données avec des graphiques interactifs
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-3">💾</div>
              <h4 className="font-semibold text-gray-900 mb-2">Sauvegarde Locale</h4>
              <p className="text-gray-600 text-sm">
                Vos simulations sont automatiquement sauvegardées
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
