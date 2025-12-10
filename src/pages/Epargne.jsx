import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { calculerEpargneAvecVersements } from '../utils/finance/interetsSimples';
import { formaterDevise, formaterPourcentage } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Epargne = () => {
  const [formData, setFormData] = useState({
    capitalInitial: 5000,
    versementMensuel: 200,
    tauxAnnuel: 3,
    dureeAnnees: 10,
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const evolution = calculerEpargneAvecVersements(
      formData.capitalInitial,
      formData.versementMensuel,
      formData.tauxAnnuel / 100,
      formData.dureeAnnees
    );
    setResults(evolution);
  };

  const chartData = results ? {
    labels: results.map((r) => `Année ${r.annee}`),
    datasets: [
      {
        label: 'Capital Total',
        data: results.map((r) => r.capitalFin),
        borderColor: 'rgb(43, 108, 176)',
        backgroundColor: 'rgba(43, 108, 176, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Versements Cumulés',
        data: results.map((r) => formData.capitalInitial + (r.annee * formData.versementMensuel * 12)),
        borderColor: 'rgb(0, 195, 106)',
        backgroundColor: 'rgba(0, 195, 106, 0.1)',
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
        text: 'Évolution de l\'Épargne',
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Compte d'Épargne</h1>
          <p className="text-gray-600">
            Simulez l'évolution de votre épargne avec des versements mensuels
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Capital Initial (€)"
                type="number"
                name="capitalInitial"
                value={formData.capitalInitial}
                onChange={handleInputChange}
                min="0"
                step="100"
                required
              />
              
              <Input
                label="Versement Mensuel (€)"
                type="number"
                name="versementMensuel"
                value={formData.versementMensuel}
                onChange={handleInputChange}
                min="0"
                step="10"
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
              
              <Button type="submit" className="w-full">
                Calculer
              </Button>
            </form>
          </Card>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Résumé */}
                <Card title="Résumé">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Capital Final</div>
                      <div className="text-xl font-bold text-blue-600">
                        {formaterDevise(results[results.length - 1].capitalFin)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Versements Totaux</div>
                      <div className="text-xl font-bold text-green-600">
                        {formaterDevise(formData.capitalInitial + (formData.versementMensuel * 12 * formData.dureeAnnees))}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Intérêts Gagnés</div>
                      <div className="text-xl font-bold text-purple-600">
                        {formaterDevise(results[results.length - 1].capitalFin - formData.capitalInitial - (formData.versementMensuel * 12 * formData.dureeAnnees))}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Rendement</div>
                      <div className="text-xl font-bold text-yellow-600">
                        {formaterPourcentage(formData.tauxAnnuel / 100)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Graphique */}
                <Card title="Évolution du Capital">
                  <Line data={chartData} options={chartOptions} />
                </Card>

                {/* Tableau */}
                <Card title="Détail Année par Année">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Année</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Capital Début</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Versements</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Intérêts</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Capital Fin</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.slice(1).map((row) => (
                          <tr key={row.annee} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{row.annee}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{formaterDevise(row.capitalDebut)}</td>
                            <td className="px-4 py-3 text-sm text-green-600 text-right">{formaterDevise(row.versements)}</td>
                            <td className="px-4 py-3 text-sm text-blue-600 text-right">{formaterDevise(row.interets)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formaterDevise(row.capitalFin)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Intérêts Simples :</strong> I = C × t × n
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Valeur Acquise :</strong> VA = C × (1 + t × n)
                    </div>
                    <p className="text-gray-600">
                      Où C = capital, t = taux d'intérêt, n = durée
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

export default Epargne;
