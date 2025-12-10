/**
 * Calculs pour les annuités et emprunts
 */

/**
 * Calcule la mensualité d'un emprunt à annuités constantes
 * @param {number} capital - Capital emprunté
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} dureeAnnees - Durée en années
 * @returns {number} Mensualité
 */
export const calculerMensualiteConstante = (capital, tauxAnnuel, dureeAnnees) => {
  const tauxMensuel = tauxAnnuel / 12;
  const nombreMois = dureeAnnees * 12;
  
  if (tauxMensuel === 0) {
    return capital / nombreMois;
  }
  
  const mensualite = capital * (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -nombreMois)));
  return Math.round(mensualite * 100) / 100;
};

/**
 * Génère le tableau d'amortissement complet pour un emprunt à annuités constantes
 * @param {number} capital - Capital emprunté
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} dureeAnnees - Durée en années
 * @returns {Array} Tableau d'amortissement
 */
export const genererTableauAmortissementConstant = (capital, tauxAnnuel, dureeAnnees) => {
  const tauxMensuel = tauxAnnuel / 12;
  const nombreMois = dureeAnnees * 12;
  const mensualite = calculerMensualiteConstante(capital, tauxAnnuel, dureeAnnees);
  
  const tableau = [];
  let capitalRestant = capital;
  
  for (let mois = 1; mois <= nombreMois; mois++) {
    const interets = capitalRestant * tauxMensuel;
    const amortissement = mensualite - interets;
    capitalRestant = capitalRestant - amortissement;
    
    // Correction pour le dernier mois (éviter les arrondis négatifs)
    if (mois === nombreMois) {
      capitalRestant = 0;
    }
    
    tableau.push({
      mois,
      capitalRestantDebut: Math.round((capitalRestant + amortissement) * 100) / 100,
      mensualite: Math.round(mensualite * 100) / 100,
      interets: Math.round(interets * 100) / 100,
      amortissement: Math.round(amortissement * 100) / 100,
      capitalRestantFin: Math.round(Math.max(0, capitalRestant) * 100) / 100,
    });
  }
  
  return tableau;
};

/**
 * Génère le tableau d'amortissement pour un emprunt à amortissement constant
 * @param {number} capital - Capital emprunté
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} dureeAnnees - Durée en années
 * @returns {Array} Tableau d'amortissement
 */
export const genererTableauAmortissementLineaire = (capital, tauxAnnuel, dureeAnnees) => {
  const tauxMensuel = tauxAnnuel / 12;
  const nombreMois = dureeAnnees * 12;
  const amortissementConstant = capital / nombreMois;
  
  const tableau = [];
  let capitalRestant = capital;
  
  for (let mois = 1; mois <= nombreMois; mois++) {
    const interets = capitalRestant * tauxMensuel;
    const mensualite = amortissementConstant + interets;
    capitalRestant = capitalRestant - amortissementConstant;
    
    if (mois === nombreMois) {
      capitalRestant = 0;
    }
    
    tableau.push({
      mois,
      capitalRestantDebut: Math.round((capitalRestant + amortissementConstant) * 100) / 100,
      mensualite: Math.round(mensualite * 100) / 100,
      interets: Math.round(interets * 100) / 100,
      amortissement: Math.round(amortissementConstant * 100) / 100,
      capitalRestantFin: Math.round(Math.max(0, capitalRestant) * 100) / 100,
    });
  }
  
  return tableau;
};

/**
 * Génère le tableau pour un emprunt in fine (remboursement du capital à la fin)
 * @param {number} capital - Capital emprunté
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} dureeAnnees - Durée en années
 * @returns {Array} Tableau d'amortissement
 */
export const genererTableauAmortissementInFine = (capital, tauxAnnuel, dureeAnnees) => {
  const tauxMensuel = tauxAnnuel / 12;
  const nombreMois = dureeAnnees * 12;
  const interetsMensuels = capital * tauxMensuel;
  
  const tableau = [];
  
  for (let mois = 1; mois <= nombreMois; mois++) {
    const isLastMonth = mois === nombreMois;
    const amortissement = isLastMonth ? capital : 0;
    const mensualite = isLastMonth ? interetsMensuels + capital : interetsMensuels;
    const capitalRestant = isLastMonth ? 0 : capital;
    
    tableau.push({
      mois,
      capitalRestantDebut: capital,
      mensualite: Math.round(mensualite * 100) / 100,
      interets: Math.round(interetsMensuels * 100) / 100,
      amortissement: Math.round(amortissement * 100) / 100,
      capitalRestantFin: capitalRestant,
    });
  }
  
  return tableau;
};

/**
 * Calcule le coût total d'un emprunt
 * @param {Array} tableauAmortissement - Tableau d'amortissement
 * @returns {Object} Récapitulatif du coût
 */
export const calculerCoutTotal = (tableauAmortissement) => {
  const totalMensualites = tableauAmortissement.reduce((sum, ligne) => sum + ligne.mensualite, 0);
  const totalInterets = tableauAmortissement.reduce((sum, ligne) => sum + ligne.interets, 0);
  const capitalEmprunte = tableauAmortissement[0]?.capitalRestantDebut || 0;
  
  return {
    capitalEmprunte: Math.round(capitalEmprunte * 100) / 100,
    totalMensualites: Math.round(totalMensualites * 100) / 100,
    totalInterets: Math.round(totalInterets * 100) / 100,
    coutTotal: Math.round(totalInterets * 100) / 100,
  };
};

/**
 * Calcule l'impact d'un remboursement anticipé
 * @param {number} capitalRestant - Capital restant dû
 * @param {number} montantRemboursement - Montant du remboursement anticipé
 * @param {number} tauxAnnuel - Taux d'intérêt annuel (en décimal)
 * @param {number} moisRestants - Nombre de mois restants
 * @returns {Object} Impact du remboursement anticipé
 */
export const calculerRemboursementAnticipe = (
  capitalRestant,
  montantRemboursement,
  tauxAnnuel,
  moisRestants
) => {
  const nouveauCapital = capitalRestant - montantRemboursement;
  const ancienneMensualite = calculerMensualiteConstante(capitalRestant, tauxAnnuel, moisRestants / 12);
  const nouvelleMensualite = calculerMensualiteConstante(nouveauCapital, tauxAnnuel, moisRestants / 12);
  const economie = (ancienneMensualite - nouvelleMensualite) * moisRestants;
  
  return {
    nouveauCapital: Math.round(nouveauCapital * 100) / 100,
    ancienneMensualite: Math.round(ancienneMensualite * 100) / 100,
    nouvelleMensualite: Math.round(nouvelleMensualite * 100) / 100,
    economieTotal: Math.round(economie * 100) / 100,
  };
};
