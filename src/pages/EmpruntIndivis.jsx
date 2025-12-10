import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import {
  genererTableauAmortissementConstant,
  genererTableauAmortissementLineaire,
  genererTableauAmortissementInFine,
  calculerCoutTotal,
} from '../utils/finance/annuites';
import { formaterDevise, exporterCSV } from '../utils/helpers';

const EmpruntIndivis = () => {
  const [formData, setFormData] = useState({
    capital: 200000,
    tauxAnnuel: 3.5,
    dureeAnnees: 20,
    typeAmortissement: 'constant',
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'typeAmortissement' ? value : parseFloat(value) || 0,
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    let tableau;
    switch (formData.typeAmortissement) {
      case 'lineaire':
        tableau = genererTableauAmortissementLineaire(
          formData.capital,
          formData.tauxAnnuel / 100,
          formData.dureeAnnees
        );
        break;
      case 'infine':
        tableau = genererTableauAmortissementInFine(
          formData.capital,
          formData.tauxAnnuel / 100,
          formData.dureeAnnees
        );
        break;
      default:
        tableau = genererTableauAmortissementConstant(
          formData.capital,
          formData.tauxAnnuel / 100,
          formData.dureeAnnees
        );
    }
    
    const cout = calculerCoutTotal(tableau);
    setResults({ tableau, cout });
  };

  const handleExport = () => {
    if (results) {
      exporterCSV(results.tableau, 'tableau-amortissement');
    }
  };

  const chartData = results ? {
    labels: results.tableau.filter((_, i) => i % Math.ceil(results.tableau.length / 50) === 0).map((r) => `Mois ${r.mois}`),
    datasets: [
      {
        label: 'Capital Restant',
        data: results.tableau.filter((_, i) => i % Math.ceil(results.tableau.length / 50) === 0).map((r) => r.capitalRestantFin),
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Intérêts',
        data: results.tableau.filter((_, i) => i % Math.ceil(results.tableau.length / 50) === 0).map((r) => r.interets),
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Amortissement',
        data: results.tableau.filter((_, i) => i % Math.ceil(results.tableau.length / 50) === 0).map((r) => r.amortissement),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
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
        text: 'Évolution de l\'Emprunt',
        color: '#fff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formaterDevise(value),
          color: '#6b7689',
        },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
      x: {
        ticks: { color: '#6b7689' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Emprunts Indivis</h1>
          <p className="text-gray-400">
            Générez un tableau d'amortissement complet pour votre emprunt
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant Emprunté (TND)"
                type="number"
                name="capital"
                value={formData.capital}
                onChange={handleInputChange}
                min="1000"
                step="1000"
                required
              />
              
              <Input
                label="Taux d'Intérêt Annuel (%)"
                type="number"
                name="tauxAnnuel"
                value={formData.tauxAnnuel}
                onChange={handleInputChange}
                min="0"
                max="20"
                step="0.1"
                required
              />
              
              <Input
                label="Durée (années)"
                type="number"
                name="dureeAnnees"
                value={formData.dureeAnnees}
                onChange={handleInputChange}
                min="1"
                max="50"
                step="1"
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type d'Amortissement
                </label>
                <select
                  name="typeAmortissement"
                  value={formData.typeAmortissement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-600 text-gray-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none"
                >
                  <option value="constant">Annuités Constantes</option>
                  <option value="lineaire">Amortissement Constant</option>
                  <option value="infine">In Fine</option>
                </select>
              </div>
              
              <Button type="submit" className="w-full">
                Générer le Tableau
              </Button>
            </form>
          </Card>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Résumé */}
                <Card 
                  title="Résumé de l'Emprunt"
                  headerAction={
                    <Button onClick={handleExport} variant="secondary" className="text-sm">
                      Exporter CSV
                    </Button>
                  }
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Capital Emprunté</div>
                      <div className="text-xl font-bold text-primary-400">
                        {formaterDevise(results.cout.capitalEmprunte)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Total Remboursé</div>
                      <div className="text-xl font-bold text-steel-400">
                        {formaterDevise(results.cout.totalMensualites)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Coût Total</div>
                      <div className="text-xl font-bold text-accent-400">
                        {formaterDevise(results.cout.totalInterets)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">
                        {formData.typeAmortissement === 'constant' ? 'Mensualité' : 'Première Mens.'}
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        {formaterDevise(results.tableau[0]?.mensualite || 0)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Graphique */}
                <Card title="Évolution du Remboursement">
                  <Line data={chartData} options={chartOptions} />
                </Card>

                {/* Tableau */}
                <Card title="Tableau d'Amortissement">
                  <div className="overflow-x-auto max-h-96">
                    <table className="table-dark">
                      <thead className="sticky top-0 bg-dark-800">
                        <tr>
                          <th>Mois</th>
                          <th className="text-right">Capital Restant</th>
                          <th className="text-right">Mensualité</th>
                          <th className="text-right">Intérêts</th>
                          <th className="text-right">Amortissement</th>
                          <th className="text-right">Reste Dû</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.tableau.slice(0, 60).map((row) => (
                          <tr key={row.mois}>
                            <td>{row.mois}</td>
                            <td className="text-right">{formaterDevise(row.capitalRestantDebut)}</td>
                            <td className="text-right text-primary-400">{formaterDevise(row.mensualite)}</td>
                            <td className="text-right text-orange-400">{formaterDevise(row.interets)}</td>
                            <td className="text-right text-green-400">{formaterDevise(row.amortissement)}</td>
                            <td className="text-right font-medium text-white">{formaterDevise(row.capitalRestantFin)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {results.tableau.length > 60 && (
                      <div className="text-center text-sm text-gray-500 py-3">
                        ... {results.tableau.length - 60} autres lignes (exportez pour voir le tableau complet)
                      </div>
                    )}
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    {formData.typeAmortissement === 'constant' && (
                      <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                        <strong className="text-gray-300">Mensualité Constante :</strong> <span className="text-gray-400">M = C × [t / (1 - (1+t)^-n)]</span>
                      </div>
                    )}
                    <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                      <strong className="text-gray-300">Intérêts :</strong> <span className="text-gray-400">I = Capital Restant × Taux Mensuel</span>
                    </div>
                    <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                      <strong className="text-gray-300">Amortissement :</strong> <span className="text-gray-400">A = Mensualité - Intérêts</span>
                    </div>
                    <p className="text-gray-500">
                      Où C = capital, t = taux mensuel, n = nombre de mois
                    </p>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpruntIndivis;
