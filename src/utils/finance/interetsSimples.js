/**
 * Calculs pour les intérêts simples
 */

/**
 * Calcule les intérêts simples
 * @param {number} capital - Capital initial (C)
 * @param {number} taux - Taux d'intérêt annuel (en décimal, ex: 0.05 pour 5%)
 * @param {number} duree - Durée en années
 * @returns {number} Montant des intérêts
 */
export const calculerInteretsSimples = (capital, taux, duree) => {
  return capital * taux * duree;
};

/**
 * Calcule la valeur acquise avec intérêts simples
 * @param {number} capital - Capital initial
 * @param {number} taux - Taux d'intérêt annuel (en décimal)
 * @param {number} duree - Durée en années
 * @returns {number} Valeur acquise (capital + intérêts)
 */
export const calculerValeurAcquise = (capital, taux, duree) => {
  return capital * (1 + taux * duree);
};

/**
 * Calcule l'évolution d'un compte d'épargne avec versements mensuels
 * @param {number} capitalInitial - Capital de départ
 * @param {number} versementMensuel - Montant versé chaque mois
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} dureeAnnees - Durée en années
 * @returns {Array} Tableau avec l'évolution année par année
 */
export const calculerEpargneAvecVersements = (
  capitalInitial,
  versementMensuel,
  tauxAnnuel,
  dureeAnnees
) => {
  const evolution = [];
  let capitalActuel = capitalInitial;
  
  for (let annee = 0; annee <= dureeAnnees; annee++) {
    const interetsAnnee = capitalActuel * tauxAnnuel;
    const versementsAnnee = versementMensuel * 12;
    
    evolution.push({
      annee,
      capitalDebut: capitalActuel,
      versements: annee === 0 ? 0 : versementsAnnee,
      interets: annee === 0 ? 0 : interetsAnnee,
      capitalFin: annee === 0 ? capitalActuel : capitalActuel + versementsAnnee + interetsAnnee,
    });
    
    if (annee < dureeAnnees) {
      capitalActuel = capitalActuel + versementsAnnee + interetsAnnee;
    }
  }
  
  return evolution;
};

/**
 * Calcule les agios (intérêts débiteurs) pour un compte courant
 * @param {number} montantDecouvert - Montant du découvert
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} nombreJours - Nombre de jours de découvert
 * @returns {Object} Détail des agios
 */
export const calculerAgios = (montantDecouvert, tauxAnnuel, nombreJours) => {
  const interets = (montantDecouvert * tauxAnnuel * nombreJours) / 365;
  const commission = montantDecouvert * 0.0005; // 0.05% de commission
  const totalAgios = interets + commission;
  
  return {
    interets: Math.round(interets * 100) / 100,
    commission: Math.round(commission * 100) / 100,
    total: Math.round(totalAgios * 100) / 100,
  };
};

/**
 * Calcule le capital nécessaire pour atteindre un objectif
 * @param {number} valeurCible - Valeur souhaitée
 * @param {number} taux - Taux d'intérêt annuel (en décimal)
 * @param {number} duree - Durée en années
 * @returns {number} Capital nécessaire
 */
export const calculerCapitalNecessaire = (valeurCible, taux, duree) => {
  return valeurCible / (1 + taux * duree);
};
