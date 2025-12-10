import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour utiliser le localStorage
 * @param {string} key - Clé de stockage
 * @param {any} initialValue - Valeur initiale
 * @returns {Array} [valeur, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Récupérer depuis le localStorage
      const item = window.localStorage.getItem(key);
      // Parser la valeur stockée ou retourner la valeur initiale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = (value) => {
    try {
      // Permettre à value d'être une fonction pour avoir la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Sauvegarder dans le localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Fonction pour supprimer la valeur
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

/**
 * Hook pour gérer l'historique des simulations
 * @param {string} moduleKey - Identifiant du module
 * @returns {Object} Méthodes pour gérer l'historique
 */
export const useSimulationHistory = (moduleKey) => {
  const storageKey = `simulation_history_${moduleKey}`;
  const [history, setHistory, removeHistory] = useLocalStorage(storageKey, []);

  const addSimulation = (simulation) => {
    const newSimulation = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...simulation,
    };
    setHistory((prev) => [newSimulation, ...prev.slice(0, 9)]); // Garder les 10 dernières
  };

  const removeSimulation = (id) => {
    setHistory((prev) => prev.filter((sim) => sim.id !== id));
  };

  const clearHistory = () => {
    removeHistory();
  };

  return {
    history,
    addSimulation,
    removeSimulation,
    clearHistory,
  };
};

/**
 * Hook pour gérer les favoris
 * @returns {Object} Méthodes pour gérer les favoris
 */
export const useFavorites = () => {
  const [favorites, setFavorites, removeFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const clearFavorites = () => {
    removeFavorites();
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };
};

/**
 * Hook pour gérer le mode responsive
 * @returns {Object} Informations sur la taille de l'écran
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
};
