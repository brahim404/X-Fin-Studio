import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import {
  calculerMensualiteConstante,
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
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
      },
      title: {
        display: true,
        text: 'Évolution de l\'Emprunt',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formaterDevise(value),
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏠 Emprunts Indivis</h1>
          <p className="text-gray-600">
            Générez un tableau d'amortissement complet pour votre emprunt
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant Emprunté (€)"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'Amortissement
                </label>
                <select
                  name="typeAmortissement"
                  value={formData.typeAmortissement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
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
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Capital Emprunté</div>
                      <div className="text-xl font-bold text-blue-600">
                        {formaterDevise(results.cout.capitalEmprunte)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Remboursé</div>
                      <div className="text-xl font-bold text-green-600">
                        {formaterDevise(results.cout.totalMensualites)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Coût Total</div>
                      <div className="text-xl font-bold text-red-600">
                        {formaterDevise(results.cout.totalInterets)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        {formData.typeAmortissement === 'constant' ? 'Mensualité' : 'Première Mens.'}
                      </div>
                      <div className="text-xl font-bold text-purple-600">
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
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mois</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Capital Restant</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mensualité</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Intérêts</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amortissement</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Reste Dû</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.tableau.slice(0, 60).map((row) => (
                          <tr key={row.mois} className="hover:bg-gray-50">
                            <td className="px-3 py-2 text-sm text-gray-900">{row.mois}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-right">{formaterDevise(row.capitalRestantDebut)}</td>
                            <td className="px-3 py-2 text-sm text-purple-600 text-right">{formaterDevise(row.mensualite)}</td>
                            <td className="px-3 py-2 text-sm text-orange-600 text-right">{formaterDevise(row.interets)}</td>
                            <td className="px-3 py-2 text-sm text-green-600 text-right">{formaterDevise(row.amortissement)}</td>
                            <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">{formaterDevise(row.capitalRestantFin)}</td>
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
                      <div className="p-3 bg-gray-50 rounded">
                        <strong>Mensualité Constante :</strong> M = C × [t / (1 - (1+t)^-n)]
                      </div>
                    )}
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Intérêts :</strong> I = Capital Restant × Taux Mensuel
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Amortissement :</strong> A = Mensualité - Intérêts
                    </div>
                    <p className="text-gray-600">
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
