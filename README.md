# XFin Studio - Simulateur Financier Interactif

Plateforme web interactive complète développée en React pour la simulation et l'analyse de divers instruments financiers en Dinar Tunisien (TND).

## Fonctionnalités

### Modules Disponibles

- **Compte d'Épargne** - Simulez l'évolution de votre épargne avec des versements mensuels
- **Compte Courant** - Calculez les agios et frais de découvert
- **Escompte Commercial** - Générez un bordereau d'escompte avec calcul de la valeur actuelle
- **Emprunts Indivis** - Créez des tableaux d'amortissement (constant, linéaire, in fine)
- **Emprunts Obligataires** - Simulez des émissions obligataires et leur service
- **Gestion de Portefeuille** - Optimisez votre portefeuille avec la méthode de Markowitz

### Caractéristiques Principales

- Calculs en temps réel
- Visualisations graphiques interactives avec Chart.js
- Sauvegarde automatique dans le localStorage
- Interface responsive (mobile, tablette, desktop)
- Export des résultats en CSV
- Design moderne avec Tailwind CSS
- Devise : Dinar Tunisien (TND)

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

Clonez le dépôt :

```bash
git clone https://github.com/brahim404/X-Fin-Studio.git
cd X-Fin-Studio
```

Installez les dépendances :

```bash
npm install
```

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

## Build pour la production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

Pour prévisualiser la version de production :

```bash
npm run preview
```

## Technologies Utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **React Router** - Navigation
- **Chart.js** et **react-chartjs-2** - Graphiques
- **Tailwind CSS** - Styling
- **LocalStorage API** - Persistance des données

## Formules Financières Implémentées

### Intérêts Simples

```text
I = C × t × n
VA = C × (1 + t × n)
```

### Escompte Commercial

```text
E = V × t × n / 360
Valeur Actuelle = V - E - Commission - Frais
```

### Annuités

```text
Mensualité = C × [t / (1 - (1+t)^-n)]
```

### Portefeuille

```text
Rendement Portefeuille = Σ(wi × Ri)
Volatilité = √(Σ Σ wi × wj × σi × σj × ρij)
Ratio de Sharpe = (Rp - Rf) / σp
```

## Structure du Projet

```text
src/
├── components/
│   ├── common/          # Composants réutilisables (Button, Input, Card)
│   └── layout/          # Sidebar, Footer
├── pages/               # Pages de chaque module
│   ├── Home.jsx
│   ├── Epargne.jsx
│   ├── CompteCourant.jsx
│   ├── Escompte.jsx
│   ├── EmpruntIndivis.jsx
│   ├── EmpruntObligataire.jsx
│   └── Portefeuille.jsx
├── utils/
│   ├── finance/         # Fonctions de calcul financier
│   │   ├── interetsSimples.js
│   │   ├── annuites.js
│   │   ├── escompte.js
│   │   └── portefeuille.js
│   └── helpers.js       # Fonctions utilitaires
└── hooks/               # Custom React hooks
```

## Utilisation

### Navigation

Utilisez la barre latérale pour accéder aux différents modules.

### Simulation

1. Sélectionnez un module
2. Remplissez les paramètres dans le formulaire
3. Cliquez sur "Calculer" ou "Générer"
4. Consultez les résultats, graphiques et tableaux
5. Exportez les données si nécessaire

### Sauvegarde

Vos simulations sont automatiquement sauvegardées dans le navigateur (localStorage) et seront disponibles lors de votre prochaine visite.

## Exemple d'Utilisation

### Compte d'Épargne

```text
Capital Initial: 5000 TND
Versement Mensuel: 200 TND
Taux Annuel: 3%
Durée: 10 ans

→ Résultat: Capital final, graphique d'évolution, tableau année par année
```

### Emprunt Indivis

```text
Montant: 200000 TND
Taux: 3.5%
Durée: 20 ans
Type: Annuités constantes

→ Résultat: Tableau d'amortissement, graphiques, coût total
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.

## Auteur

**Brahim** - [@brahim404](https://github.com/brahim404)

## Remerciements

- Bibliothèque Chart.js pour les visualisations
- Tailwind CSS pour le design system
- La communauté React pour les outils et ressources

---

**Note**: Cette application est destinée à des fins éducatives et de simulation. Les résultats ne constituent pas des conseils financiers professionnels.
