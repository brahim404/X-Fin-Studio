import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {currentYear} XFin Studio. Tous droits réservés.
          </div>
          <div className="text-gray-500 text-xs">
            Plateforme de simulation financière interactive
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
