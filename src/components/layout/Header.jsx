import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-accent-400">X</span>Fin Studio
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/epargne"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/epargne') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Épargne
            </Link>
            <Link
              to="/compte-courant"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/compte-courant') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Compte Courant
            </Link>
            <Link
              to="/escompte"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/escompte') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Escompte
            </Link>
            <Link
              to="/emprunt-indivis"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/emprunt-indivis') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Emprunts
            </Link>
            <Link
              to="/emprunt-obligataire"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/emprunt-obligataire') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Obligations
            </Link>
            <Link
              to="/portefeuille"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/portefeuille') ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Portefeuille
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
