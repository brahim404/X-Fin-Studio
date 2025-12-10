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
import {
  calculerRendementPortefeuille,
  calculerVolatilitePortefeuille,
  calculerRatioSharpe,
  genererFrontiereEfficiente,
  optimiserPortefeuilleDeuxActifs,
  calculerStatistiquesPortefeuille,
} from '../utils/finance/portefeuille';
import { formaterPourcentage } from '../utils/helpers';

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
        backgroundColor: 'rgba(43, 108, 176, 0.6)',
        borderColor: 'rgb(43, 108, 176)',
        showLine: true,
        tension: 0.4,
      },
      {
        label: 'Portefeuille Actuel',
        data: [{ x: results.stats.volatilite, y: results.stats.rendementEspere }],
        backgroundColor: 'rgba(0, 195, 106, 1)',
        borderColor: 'rgb(0, 195, 106)',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Portefeuille Optimal',
        data: [{ x: results.optimal.volatilite, y: results.optimal.rendement }],
        backgroundColor: 'rgba(239, 68, 68, 1)',
        borderColor: 'rgb(239, 68, 68)',
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
      },
      title: {
        display: true,
        text: 'Frontière Efficiente de Markowitz',
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
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Rendement Espéré %',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📈 Gestion de Portefeuille</h1>
          <p className="text-gray-600">
            Optimisez votre portefeuille d'actifs avec la méthode de Markowitz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <h3 className="text-lg font-semibold mb-4">Actifs du Portefeuille</h3>
              
              {actifs.map((actif, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
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
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Statistiques Actuelles */}
                <Card title="Statistiques du Portefeuille Actuel">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Rendement Espéré</div>
                      <div className="text-xl font-bold text-blue-600">
                        {results.stats.rendementEspere.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Volatilité (Risque)</div>
                      <div className="text-xl font-bold text-orange-600">
                        {results.stats.volatilite.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Ratio de Sharpe</div>
                      <div className="text-xl font-bold text-green-600">
                        {results.stats.ratioSharpe.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Taux Sans Risque</div>
                      <div className="text-xl font-bold text-purple-600">
                        {results.stats.tauxSansRisque.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Allocation Optimale */}
                <Card title="Portefeuille Optimal (Ratio de Sharpe Maximum)">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Rendement</div>
                        <div className="text-xl font-bold text-red-600">
                          {results.optimal.rendement.toFixed(2)}%
                        </div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Volatilité</div>
                        <div className="text-xl font-bold text-yellow-600">
                          {results.optimal.volatilite.toFixed(2)}%
                        </div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Ratio de Sharpe</div>
                        <div className="text-xl font-bold text-indigo-600">
                          {results.optimal.ratioSharpe.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-cyan-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Amélioration</div>
                        <div className="text-xl font-bold text-cyan-600">
                          {((results.optimal.ratioSharpe - results.stats.ratioSharpe) / results.stats.ratioSharpe * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Allocation Optimale Suggérée</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between items-center p-3 bg-white rounded">
                          <span className="text-gray-700">{actifs[0].nom}</span>
                          <span className="text-lg font-bold text-blue-600">{results.optimal.poids1}%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded">
                          <span className="text-gray-700">{actifs[1].nom}</span>
                          <span className="text-lg font-bold text-purple-600">{results.optimal.poids2}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Graphique */}
                <Card title="Frontière Efficiente">
                  <Scatter data={chartData} options={chartOptions} />
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>La frontière efficiente</strong> représente l'ensemble des portefeuilles offrant le meilleur rendement pour un niveau de risque donné.
                    </p>
                    <p>
                      Le <strong>portefeuille optimal</strong> (point rouge) maximise le ratio de Sharpe, offrant le meilleur compromis rendement/risque.
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
                            <span className="text-sm font-medium text-gray-700">{actif.nom}</span>
                            <span className="text-sm text-gray-600">{actif.poids}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-purple-600'}`}
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
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Rendement du Portefeuille :</strong> Rp = Σ(wi × Ri)
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Volatilité du Portefeuille :</strong> σp = √(Σ Σ wi × wj × σi × σj × ρij)
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Ratio de Sharpe :</strong> S = (Rp - Rf) / σp
                    </div>
                    <p className="text-gray-600">
                      Où w = poids, R = rendement, σ = volatilité, ρ = corrélation, Rf = taux sans risque
                    </p>
                  </div>
                </Card>

                {/* Conseils */}
                <Card title="💡 Interprétation">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Un ratio de Sharpe plus élevé indique un meilleur rendement ajusté au risque</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>La diversification réduit le risque sans nécessairement réduire le rendement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Une corrélation faible ou négative entre actifs améliore la diversification</span>
                    </li>
                  </ul>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portefeuille;
