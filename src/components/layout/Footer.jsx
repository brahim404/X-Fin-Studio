import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-800/50 border-t border-dark-700/50 mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-gray-500 text-sm">
            © {currentYear} <span className="text-primary-400">X</span>Fin Studio. Tous droits réservés.
          </div>
          <div className="text-gray-600 text-xs">
            Plateforme de simulation financière • Dinar Tunisien (TND)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
