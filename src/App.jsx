import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Epargne from './pages/Epargne';
import CompteCourant from './pages/CompteCourant';
import Escompte from './pages/Escompte';
import EmpruntIndivis from './pages/EmpruntIndivis';
import EmpruntObligataire from './pages/EmpruntObligataire';
import Portefeuille from './pages/Portefeuille';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-dark-900">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-64 transition-all duration-300">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/epargne" element={<Epargne />} />
              <Route path="/compte-courant" element={<CompteCourant />} />
              <Route path="/escompte" element={<Escompte />} />
              <Route path="/emprunt-indivis" element={<EmpruntIndivis />} />
              <Route path="/emprunt-obligataire" element={<EmpruntObligataire />} />
              <Route path="/portefeuille" element={<Portefeuille />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
