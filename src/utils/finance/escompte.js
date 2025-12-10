/**
 * Calculs pour l'escompte commercial
 */

/**
 * Calcule l'escompte commercial
 * @param {number} valeurNominale - Valeur nominale de l'effet (V)
 * @param {number} tauxAnnuel - Taux d'escompte annuel (en décimal)
 * @param {number} nombreJours - Nombre de jours jusqu'à l'échéance
 * @returns {number} Montant de l'escompte
 */
export const calculerEscompte = (valeurNominale, tauxAnnuel, nombreJours) => {
  return (valeurNominale * tauxAnnuel * nombreJours) / 360;
};

/**
 * Calcule la valeur actuelle (valeur nette)
 * @param {number} valeurNominale - Valeur nominale de l'effet
 * @param {number} escompte - Montant de l'escompte
 * @returns {number} Valeur actuelle
 */
export const calculerValeurActuelle = (valeurNominale, escompte) => {
  return valeurNominale - escompte;
};

/**
 * Calcule le bordereau d'escompte complet
 * @param {Array} effets - Liste des effets [{valeur, jours}]
 * @param {number} tauxAnnuel - Taux d'escompte annuel (en décimal)
 * @param {number} tauxCommission - Taux de commission (en décimal, défaut 0.006 = 0.6%)
 * @param {number} fraisFixes - Frais fixes par effet (défaut 2)
 * @returns {Object} Bordereau complet avec détails
 */
export const calculerBordereauEscompte = (
  effets,
  tauxAnnuel,
  tauxCommission = 0.006,
  fraisFixes = 2
) => {
  const detailsEffets = effets.map((effet, index) => {
    const escompte = calculerEscompte(effet.valeur, tauxAnnuel, effet.jours);
    const commission = effet.valeur * tauxCommission;
    const totalFrais = escompte + commission + fraisFixes;
    const valeurNette = effet.valeur - totalFrais;
    
    return {
      numero: index + 1,
      valeurNominale: effet.valeur,
      jours: effet.jours,
      escompte: Math.round(escompte * 100) / 100,
      commission: Math.round(commission * 100) / 100,
      fraisFixes: fraisFixes,
      totalFrais: Math.round(totalFrais * 100) / 100,
      valeurNette: Math.round(valeurNette * 100) / 100,
    };
  });
  
  const totaux = detailsEffets.reduce(
    (acc, effet) => ({
      valeurNominale: acc.valeurNominale + effet.valeurNominale,
      escompte: acc.escompte + effet.escompte,
      commission: acc.commission + effet.commission,
      fraisFixes: acc.fraisFixes + effet.fraisFixes,
      totalFrais: acc.totalFrais + effet.totalFrais,
      valeurNette: acc.valeurNette + effet.valeurNette,
    }),
    {
      valeurNominale: 0,
      escompte: 0,
      commission: 0,
      fraisFixes: 0,
      totalFrais: 0,
      valeurNette: 0,
    }
  );
  
  return {
    effets: detailsEffets,
    totaux: {
      ...totaux,
      valeurNominale: Math.round(totaux.valeurNominale * 100) / 100,
      escompte: Math.round(totaux.escompte * 100) / 100,
      commission: Math.round(totaux.commission * 100) / 100,
      fraisFixes: Math.round(totaux.fraisFixes * 100) / 100,
      totalFrais: Math.round(totaux.totalFrais * 100) / 100,
      valeurNette: Math.round(totaux.valeurNette * 100) / 100,
    },
    tauxUtilise: tauxAnnuel,
    nombreEffets: effets.length,
  };
};

/**
 * Calcule le taux équivalent pour une période donnée
 * @param {number} tauxAnnuel - Taux annuel (en décimal)
 * @param {number} nombreJours - Nombre de jours
 * @returns {number} Taux équivalent
 */
export const calculerTauxEquivalent = (tauxAnnuel, nombreJours) => {
  return (tauxAnnuel * nombreJours) / 360;
};
