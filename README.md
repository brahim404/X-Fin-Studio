# XFin Studio - Simulateur Financier Interactif

Plateforme web interactive développée en React avec un design gaming moderne (Opera GX style) pour la simulation et l'analyse d'instruments financiers en Dinar Tunisien (TND).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer)

## ✨ Fonctionnalités

### Modules Disponibles

- **💰 Compte d'Épargne** - Simulez l'évolution de votre épargne avec des versements mensuels et visualisez la croissance de votre capital
- **🏦 Compte Courant (Agios)** - Calculez les frais de découvert et agios pour votre compte courant
- **📄 Escompte Commercial** - Générez un bordereau d'escompte professionnel avec calcul détaillé de la valeur actuelle

### Caractéristiques Principales

- 🎮 **Design Gaming** - Interface moderne inspirée d'Opera GX avec effets néon et animations fluides
- ⚡ **Calculs Instantanés** - Algorithmes optimisés pour des résultats en temps réel
- 📊 **Formules Mathématiques** - Affichage des formules avec KaTeX pour une meilleure compréhension
- 💾 **Sauvegarde Auto** - Données conservées localement dans le navigateur
- 📱 **Responsive Design** - Interface adaptée mobile, tablette et desktop
- 📥 **Export CSV** - Exportez vos résultats pour analyse externe
- 🎨 **Thèmes Colorés** - Chaque module a sa propre identité visuelle (bleu, rouge, violet)

## 🚀 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

```bash
# Clonez le dépôt
git clone https://github.com/brahim404/X-Fin-Studio.git
cd X-Fin-Studio

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run dev
```

Ouvrez votre navigateur à l'adresse `http://localhost:5173`

## 🏗️ Build pour la production

```bash
# Créer une version optimisée
npm run build

# Prévisualiser la version de production
npm run preview
```

Les fichiers seront générés dans le dossier `dist/`.

## 🛠️ Technologies Utilisées

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| React | 19 | Bibliothèque UI |
| Vite | 7.2 | Build tool & dev server |
| React Router | 7 | Navigation SPA |
| Tailwind CSS | 3.4 | Styling utilitaire |
| Framer Motion | 11 | Animations fluides |
| KaTeX | - | Rendu des formules mathématiques |
| Radix UI | - | Composants accessibles |

## 📐 Formules Financières

### Intérêts Simples (Épargne)

```
I = C × t × n
VA = C × (1 + t × n)
```

### Agios (Compte Courant)

```
I = (M × t × j) / 365
Commission = M × 0.0005
Agios = I + Commission
```

### Escompte Commercial

```
E = (V × t × n) / 360
Valeur Actuelle = V - E - Commission - Frais
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── RangeSlider.jsx
│   │   ├── DatePicker.jsx
│   │   ├── TiltButton.jsx
│   │   └── Math.jsx     # Composants KaTeX
│   ├── layout/          # Layout (Sidebar, Header, Footer)
│   └── animate-ui/      # Composants d'animation
├── pages/
│   ├── Home.jsx         # Page d'accueil
│   ├── Tools.jsx        # Hub des outils
│   ├── Epargne.jsx      # Simulateur d'épargne
│   ├── CompteCourant.jsx # Calcul des agios
│   └── Escompte.jsx     # Bordereau d'escompte
├── utils/
│   ├── finance/         # Fonctions de calcul
│   │   ├── interetsSimples.js
│   │   ├── annuites.js
│   │   └── escompte.js
│   └── helpers.js       # Utilitaires (format, export)
├── hooks/
│   └── useLocalStorage.js
├── index.css            # Styles globaux + Tailwind
└── App.jsx              # Routeur principal
```

## 🎯 Utilisation

### Navigation

1. **Page d'accueil** - Présentation et accès rapide aux outils
2. **Hub Outils** - Vue d'ensemble des 3 modules avec cartes animées
3. **Modules** - Interface dédiée pour chaque type de calcul

### Workflow Type

1. Sélectionnez un module depuis le hub ou la sidebar
2. Remplissez les paramètres dans le formulaire
3. Cliquez sur le bouton de calcul
4. Consultez les résultats avec formules et détails
5. Exportez en CSV si nécessaire

### Sauvegarde

Vos simulations sont automatiquement sauvegardées dans le navigateur (localStorage).

## 🎨 Personnalisation des Thèmes

Chaque module utilise un thème de couleur distinct :

- **Épargne** : 🔵 Bleu (primary)
- **Compte Courant** : 🔴 Rouge (accent)
- **Escompte** : 🟣 Violet (purple)



## 👤 Auteur

**Brahim** - [@brahim404](https://github.com/brahim404)

---
