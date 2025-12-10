/**
 * Calculs pour la gestion et l'optimisation de portefeuille
 */

/**
 * Calcule le rendement espéré d'un portefeuille
 * @param {Array} actifs - Liste des actifs [{poids, rendement}]
 * @returns {number} Rendement espéré du portefeuille
 */
export const calculerRendementPortefeuille = (actifs) => {
  return actifs.reduce((sum, actif) => sum + actif.poids * actif.rendement, 0);
};

/**
 * Calcule la volatilité (écart-type) d'un portefeuille
 * @param {Array} actifs - Liste des actifs [{poids, volatilite}]
 * @param {Array} correlations - Matrice de corrélation (2D array)
 * @returns {number} Volatilité du portefeuille
 */
export const calculerVolatilitePortefeuille = (actifs, correlations) => {
  let variance = 0;
  
  for (let i = 0; i < actifs.length; i++) {
    for (let j = 0; j < actifs.length; j++) {
      const correlation = correlations[i][j];
      variance += actifs[i].poids * actifs[j].poids * 
                  actifs[i].volatilite * actifs[j].volatilite * correlation;
    }
  }
  
  return Math.sqrt(variance);
};

/**
 * Calcule la matrice de covariance à partir des corrélations et volatilités
 * @param {Array} actifs - Liste des actifs [{volatilite}]
 * @param {Array} correlations - Matrice de corrélation
 * @returns {Array} Matrice de covariance
 */
export const calculerMatriceCovariance = (actifs, correlations) => {
  const n = actifs.length;
  const covariance = Array(n).fill(null).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      covariance[i][j] = actifs[i].volatilite * actifs[j].volatilite * correlations[i][j];
    }
  }
  
  return covariance;
};

/**
 * Calcule le ratio de Sharpe
 * @param {number} rendementPortefeuille - Rendement du portefeuille
 * @param {number} tauxSansRisque - Taux sans risque
 * @param {number} volatilitePortefeuille - Volatilité du portefeuille
 * @returns {number} Ratio de Sharpe
 */
export const calculerRatioSharpe = (rendementPortefeuille, tauxSansRisque, volatilitePortefeuille) => {
  if (volatilitePortefeuille === 0) return 0;
  return (rendementPortefeuille - tauxSansRisque) / volatilitePortefeuille;
};

/**
 * Génère des points pour la frontière efficiente
 * @param {Array} actifs - Liste des actifs [{nom, rendement, volatilite}]
 * @param {Array} correlations - Matrice de corrélation
 * @param {number} nombrePoints - Nombre de points à générer
 * @returns {Array} Points de la frontière efficiente
 */
export const genererFrontiereEfficiente = (actifs, correlations, nombrePoints = 50) => {
  const points = [];
  
  // Générer différentes allocations
  for (let i = 0; i <= nombrePoints; i++) {
    const poids1 = i / nombrePoints;
    const poids2 = 1 - poids1;
    
    // Pour simplification, on travaille avec 2 actifs
    if (actifs.length >= 2) {
      const allocation = [
        { ...actifs[0], poids: poids1 },
        { ...actifs[1], poids: poids2 },
      ];
      
      const rendement = calculerRendementPortefeuille(allocation);
      const volatilite = calculerVolatilitePortefeuille(allocation, correlations);
      
      points.push({
        rendement: Math.round(rendement * 10000) / 100,
        volatilite: Math.round(volatilite * 10000) / 100,
        poids: [poids1, poids2],
      });
    }
  }
  
  return points;
};

/**
 * Optimisation simple de Markowitz (2 actifs)
 * @param {Object} actif1 - Premier actif {rendement, volatilite}
 * @param {Object} actif2 - Deuxième actif {rendement, volatilite}
 * @param {number} correlation - Corrélation entre les deux actifs
 * @param {number} tauxSansRisque - Taux sans risque
 * @returns {Object} Allocation optimale
 */
export const optimiserPortefeuilleDeuxActifs = (actif1, actif2, correlation, tauxSansRisque) => {
  let meilleurSharpe = -Infinity;
  let meilleureAllocation = null;
  
  // Tester différentes allocations
  for (let poids1 = 0; poids1 <= 1; poids1 += 0.01) {
    const poids2 = 1 - poids1;
    const allocation = [
      { ...actif1, poids: poids1 },
      { ...actif2, poids: poids2 },
    ];
    
    const correlationMatrix = [
      [1, correlation],
      [correlation, 1],
    ];
    
    const rendement = calculerRendementPortefeuille(allocation);
    const volatilite = calculerVolatilitePortefeuille(allocation, correlationMatrix);
    const sharpe = calculerRatioSharpe(rendement, tauxSansRisque, volatilite);
    
    if (sharpe > meilleurSharpe) {
      meilleurSharpe = sharpe;
      meilleureAllocation = {
        poids1: Math.round(poids1 * 100),
        poids2: Math.round(poids2 * 100),
        rendement: Math.round(rendement * 10000) / 100,
        volatilite: Math.round(volatilite * 10000) / 100,
        ratioSharpe: Math.round(sharpe * 100) / 100,
      };
    }
  }
  
  return meilleureAllocation;
};

/**
 * Calcule les statistiques d'un portefeuille
 * @param {Array} actifs - Liste des actifs avec poids
 * @param {Array} correlations - Matrice de corrélation
 * @param {number} tauxSansRisque - Taux sans risque
 * @returns {Object} Statistiques du portefeuille
 */
export const calculerStatistiquesPortefeuille = (actifs, correlations, tauxSansRisque = 0.02) => {
  const rendement = calculerRendementPortefeuille(actifs);
  const volatilite = calculerVolatilitePortefeuille(actifs, correlations);
  const sharpe = calculerRatioSharpe(rendement, tauxSansRisque, volatilite);
  
  return {
    rendementEspere: Math.round(rendement * 10000) / 100,
    volatilite: Math.round(volatilite * 10000) / 100,
    ratioSharpe: Math.round(sharpe * 100) / 100,
    tauxSansRisque: Math.round(tauxSansRisque * 10000) / 100,
  };
};

/**
 * Valide que les poids somment à 100%
 * @param {Array} actifs - Liste des actifs avec poids
 * @returns {boolean} True si la somme des poids = 1
 */
export const validerPoids = (actifs) => {
  const somme = actifs.reduce((sum, actif) => sum + actif.poids, 0);
  return Math.abs(somme - 1) < 0.01; // Tolérance de 1%
};
