import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FormulaSection } from '../components/common/Math';
import {
  genererFrontiereEfficiente,
  optimiserPortefeuilleDeuxActifs,
  calculerStatistiquesPortefeuille,
} from '../utils/finance/portefeuille';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Portefeuille = () => {
  const [actifs, setActifs] = useState([
    { nom: 'Actions', rendement: 10, volatilite: 20, poids: 60 },
    { nom: 'Obligations', rendement: 4, volatilite: 5, poids: 40 },
  ]);
  
  const [correlation, setCorrelation] = useState(0.3);
  const [tauxSansRisque, setTauxSansRisque] = useState(2);
  const [results, setResults] = useState(null);

  const handleActifChange = (index, field, value) => {
    const newActifs = [...actifs];
    newActifs[index][field] = field === 'nom' ? value : parseFloat(value) || 0;
    setActifs(newActifs);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Convertir les poids en décimaux
    const actifsAvecPoids = actifs.map((actif) => ({
      ...actif,
      rendement: actif.rendement / 100,
      volatilite: actif.volatilite / 100,
      poids: actif.poids / 100,
    }));
    
    const correlationMatrix = [
      [1, correlation],
      [correlation, 1],
    ];
    
    const stats = calculerStatistiquesPortefeuille(
      actifsAvecPoids,
      correlationMatrix,
      tauxSansRisque / 100
    );
    
    const frontiere = genererFrontiereEfficiente(
      actifsAvecPoids,
      correlationMatrix,
      30
    );
    
    const optimal = optimiserPortefeuilleDeuxActifs(
      { rendement: actifsAvecPoids[0].rendement, volatilite: actifsAvecPoids[0].volatilite },
      { rendement: actifsAvecPoids[1].rendement, volatilite: actifsAvecPoids[1].volatilite },
      correlation,
      tauxSansRisque / 100
    );
    
    setResults({
      stats,
      frontiere,
      optimal,
      actifsAvecPoids,
    });
  };

  const chartData = results ? {
    datasets: [
      {
        label: 'Frontière Efficiente',
        data: results.frontiere.map((p) => ({ x: p.volatilite, y: p.rendement })),
        backgroundColor: 'rgba(61, 115, 182, 0.6)',
        borderColor: 'rgb(61, 115, 182)',
        showLine: true,
        tension: 0.4,
      },
      {
        label: 'Portefeuille Actuel',
        data: [{ x: results.stats.volatilite, y: results.stats.rendementEspere }],
        backgroundColor: 'rgba(34, 197, 94, 1)',
        borderColor: 'rgb(34, 197, 94)',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Portefeuille Optimal',
        data: [{ x: results.optimal.volatilite, y: results.optimal.rendement }],
        backgroundColor: 'rgba(220, 38, 38, 1)',
        borderColor: 'rgb(220, 38, 38)',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: actifs[0].nom,
        data: [{ x: actifs[0].volatilite, y: actifs[0].rendement }],
        backgroundColor: 'rgba(251, 146, 60, 1)',
        borderColor: 'rgb(251, 146, 60)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: actifs[1].nom,
        data: [{ x: actifs[1].volatilite, y: actifs[1].rendement }],
        backgroundColor: 'rgba(168, 85, 247, 1)',
        borderColor: 'rgb(168, 85, 247)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#9aa3b4' },
      },
      title: {
        display: true,
        text: 'Frontière Efficiente de Markowitz',
        color: '#fff',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: Rendement ${context.parsed.y}%, Volatilité ${context.parsed.x}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Volatilité (Risque) %',
          color: '#9aa3b4',
        },
        beginAtZero: true,
        ticks: { color: '#6b7689' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
      y: {
        title: {
          display: true,
          text: 'Rendement Espéré %',
          color: '#9aa3b4',
        },
        beginAtZero: true,
        ticks: { color: '#6b7689' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
    },
  };

  return (
    <div className="min-h-screen py-8 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Gestion de Portefeuille</h1>
          <p className="text-gray-400">
            Optimisez votre portefeuille d'actifs avec la méthode de Markowitz
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 transition-all duration-700 ease-out ${results ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-xl mx-auto'}`}>
          {/* Formulaire */}
          <Card className={`lg:col-span-1 transition-all duration-700 ease-out ${results ? '' : 'lg:max-w-xl lg:w-full'}`}>
            <form onSubmit={handleCalculate}>
              <h3 className="text-lg font-semibold text-white mb-4">Actifs du Portefeuille</h3>
              
              {actifs.map((actif, index) => (
                <div key={index} className="mb-4 p-4 bg-dark-700/50 border border-dark-600/50">
                  <Input
                    label={`Nom de l'Actif ${index + 1}`}
                    type="text"
                    value={actif.nom}
                    onChange={(e) => handleActifChange(index, 'nom', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Rendement Espéré (%)"
                    type="number"
                    value={actif.rendement}
                    onChange={(e) => handleActifChange(index, 'rendement', e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                  
                  <Input
                    label="Volatilité (%)"
                    type="number"
                    value={actif.volatilite}
                    onChange={(e) => handleActifChange(index, 'volatilite', e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                  
                  <Input
                    label="Poids dans le Portefeuille (%)"
                    type="number"
                    value={actif.poids}
                    onChange={(e) => handleActifChange(index, 'poids', e.target.value)}
                    min="0"
                    max="100"
                    step="1"
                    required
                  />
                </div>
              ))}
              
              <Input
                label="Corrélation entre Actifs"
                type="number"
                value={correlation}
                onChange={(e) => setCorrelation(parseFloat(e.target.value) || 0)}
                min="-1"
                max="1"
                step="0.1"
                required
                helperText="De -1 (corrélation négative) à 1 (corrélation positive)"
              />
              
              <Input
                label="Taux Sans Risque (%)"
                type="number"
                value={tauxSansRisque}
                onChange={(e) => setTauxSansRisque(parseFloat(e.target.value) || 0)}
                min="0"
                max="10"
                step="0.1"
                required
              />
              
              <Button type="submit" className="w-full">
                Analyser le Portefeuille
              </Button>
            </form>
          </Card>

          {/* Résultats */}
          {results && (
          <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
              <>
                {/* Statistiques Actuelles */}
                <Card title="Statistiques du Portefeuille Actuel">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Rendement Espéré</div>
                      <div className="text-xl font-bold text-primary-400">
                        {results.stats.rendementEspere.toFixed(2)}%
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Volatilité (Risque)</div>
                      <div className="text-xl font-bold text-orange-400">
                        {results.stats.volatilite.toFixed(2)}%
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Ratio de Sharpe</div>
                      <div className="text-xl font-bold text-green-400">
                        {results.stats.ratioSharpe.toFixed(2)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Taux Sans Risque</div>
                      <div className="text-xl font-bold text-steel-400">
                        {results.stats.tauxSansRisque.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Allocation Optimale */}
                <Card title="Portefeuille Optimal (Ratio de Sharpe Maximum)">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="stat-card text-center">
                        <div className="text-sm text-gray-400 mb-1">Rendement</div>
                        <div className="text-xl font-bold text-accent-400">
                          {results.optimal.rendement.toFixed(2)}%
                        </div>
                      </div>
                      <div className="stat-card text-center">
                        <div className="text-sm text-gray-400 mb-1">Volatilité</div>
                        <div className="text-xl font-bold text-yellow-400">
                          {results.optimal.volatilite.toFixed(2)}%
                        </div>
                      </div>
                      <div className="stat-card text-center">
                        <div className="text-sm text-gray-400 mb-1">Ratio de Sharpe</div>
                        <div className="text-xl font-bold text-purple-400">
                          {results.optimal.ratioSharpe.toFixed(2)}
                        </div>
                      </div>
                      <div className="stat-card text-center">
                        <div className="text-sm text-gray-400 mb-1">Amélioration</div>
                        <div className="text-xl font-bold text-cyan-400">
                          {results.stats.ratioSharpe > 0
                            ? ((results.optimal.ratioSharpe - results.stats.ratioSharpe) / results.stats.ratioSharpe * 100).toFixed(1)
                            : 'N/A'}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-dark-700/50 border border-dark-600/50">
                      <h4 className="font-semibold text-white mb-3">Allocation Optimale Suggérée</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between items-center p-3 bg-dark-800 border border-dark-600/50">
                          <span className="text-gray-300">{actifs[0].nom}</span>
                          <span className="text-lg font-bold text-primary-400">{results.optimal.poids1}%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-800 border border-dark-600/50">
                          <span className="text-gray-300">{actifs[1].nom}</span>
                          <span className="text-lg font-bold text-purple-400">{results.optimal.poids2}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Graphique */}
                <Card title="Frontière Efficiente">
                  <Scatter data={chartData} options={chartOptions} />
                  <div className="mt-4 text-sm text-gray-400">
                    <p className="mb-2">
                      <strong className="text-gray-300">La frontière efficiente</strong> représente l'ensemble des portefeuilles offrant le meilleur rendement pour un niveau de risque donné.
                    </p>
                    <p>
                      Le <strong className="text-gray-300">portefeuille optimal</strong> (point rouge) maximise le ratio de Sharpe, offrant le meilleur compromis rendement/risque.
                    </p>
                  </div>
                </Card>

                {/* Allocation Actuelle */}
                <Card title="Allocation Actuelle">
                  <div className="space-y-3">
                    {actifs.map((actif, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-300">{actif.nom}</span>
                            <span className="text-sm text-gray-400">{actif.poids}%</span>
                          </div>
                          <div className="w-full bg-dark-700 h-2.5">
                            <div
                              className={`h-2.5 ${index === 0 ? 'bg-primary-500' : 'bg-purple-500'}`}
                              style={{ width: `${actif.poids}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Rendement: {actif.rendement}%</span>
                            <span>Volatilité: {actif.volatilite}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <FormulaSection
                    formulas={[
                      {
                        label: 'Rendement du Portefeuille',
                        formula: 'R_p = \\sum_{i=1}^{n} w_i \\cdot R_i',
                        description: 'Moyenne pondérée des rendements'
                      },
                      {
                        label: 'Volatilité du Portefeuille',
                        formula: '\\sigma_p = \\sqrt{\\sum_{i}\\sum_{j} w_i w_j \\sigma_i \\sigma_j \\rho_{ij}}',
                        description: 'Risque total du portefeuille'
                      },
                      {
                        label: 'Ratio de Sharpe',
                        formula: 'S = \\frac{R_p - R_f}{\\sigma_p}',
                        description: 'Rendement excédentaire par unité de risque'
                      },
                      {
                        label: 'Variance (2 actifs)',
                        formula: '\\sigma_p^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\sigma_1\\sigma_2\\rho_{12}',
                        description: 'Formule de variance pour deux actifs'
                      }
                    ]}
                    legend="w = poids, R = rendement, σ = volatilité, ρ = corrélation, R_f = taux sans risque"
                  />
                </Card>

                {/* Conseils */}
                <Card title="Interprétation">
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Un ratio de Sharpe plus élevé indique un meilleur rendement ajusté au risque</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>La diversification réduit le risque sans nécessairement réduire le rendement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Une corrélation faible ou négative entre actifs améliore la diversification</span>
                    </li>
                  </ul>
                </Card>
              </>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portefeuille;
