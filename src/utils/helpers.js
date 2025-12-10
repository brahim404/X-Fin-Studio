/**
 * Fonctions utilitaires générales
 */

/**
 * Formate un nombre en devise
 * @param {number} montant - Montant à formater
 * @param {string} devise - Code de la devise (défaut: EUR)
 * @returns {string} Montant formaté
 */
export const formaterDevise = (montant, devise = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: devise,
  }).format(montant);
};

/**
 * Formate un pourcentage
 * @param {number} valeur - Valeur décimale (0.05 pour 5%)
 * @param {number} decimales - Nombre de décimales (défaut: 2)
 * @returns {string} Pourcentage formaté
 */
export const formaterPourcentage = (valeur, decimales = 2) => {
  return `${(valeur * 100).toFixed(decimales)}%`;
};

/**
 * Formate un nombre avec séparateur de milliers
 * @param {number} nombre - Nombre à formater
 * @param {number} decimales - Nombre de décimales (défaut: 2)
 * @returns {string} Nombre formaté
 */
export const formaterNombre = (nombre, decimales = 2) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(nombre);
};

/**
 * Convertit un pourcentage en décimal
 * @param {number} pourcentage - Pourcentage (5 pour 5%)
 * @returns {number} Valeur décimale (0.05 pour 5%)
 */
export const pourcentageEnDecimal = (pourcentage) => {
  return pourcentage / 100;
};

/**
 * Génère une couleur aléatoire
 * @returns {string} Code couleur hex
 */
export const genererCouleurAleatoire = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Génère un identifiant unique
 * @returns {string} ID unique
 */
export const genererIdUnique = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide qu'une valeur est un nombre positif
 * @param {any} valeur - Valeur à valider
 * @returns {boolean} True si valide
 */
export const estNombrePositif = (valeur) => {
  const nombre = parseFloat(valeur);
  return !isNaN(nombre) && nombre > 0;
};

/**
 * Valide qu'une valeur est un nombre positif ou zéro
 * @param {any} valeur - Valeur à valider
 * @returns {boolean} True si valide
 */
export const estNombrePositifOuZero = (valeur) => {
  const nombre = parseFloat(valeur);
  return !isNaN(nombre) && nombre >= 0;
};

/**
 * Arrondit un nombre à n décimales
 * @param {number} nombre - Nombre à arrondir
 * @param {number} decimales - Nombre de décimales
 * @returns {number} Nombre arrondi
 */
export const arrondir = (nombre, decimales = 2) => {
  const facteur = Math.pow(10, decimales);
  return Math.round(nombre * facteur) / facteur;
};

/**
 * Exporte des données en CSV
 * @param {Array} data - Données à exporter
 * @param {string} filename - Nom du fichier
 */
export const exporterCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

/**
 * Calcule le nombre de jours entre deux dates
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date
 * @returns {number} Nombre de jours
 */
export const calculerJoursEntreDates = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formate une date au format français
 * @param {Date} date - Date à formater
 * @returns {string} Date formatée
 */
export const formaterDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR').format(date);
};
