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
import { FormulaSection } from '../components/common/Math';
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
        borderColor: 'rgb(61, 115, 182)',
        backgroundColor: 'rgba(61, 115, 182, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Versements Cumulés',
        data: results.map((r) => formData.capitalInitial + (r.annee * formData.versementMensuel * 12)),
        borderColor: 'rgb(99, 125, 152)',
        backgroundColor: 'rgba(99, 125, 152, 0.1)',
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
        text: 'Évolution de l\'Épargne',
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
    <div className="min-h-screen py-8 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Compte d'Épargne</h1>
          <p className="text-gray-400">
            Simulez l'évolution de votre épargne avec des versements mensuels
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 transition-all duration-700 ease-out ${results ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-xl mx-auto'}`}>
          {/* Formulaire */}
          <Card className={`lg:col-span-1 transition-all duration-700 ease-out ${results ? '' : 'lg:max-w-xl lg:w-full'}`}>
            <form onSubmit={handleCalculate}>
              <Input
                label="Capital Initial (TND)"
                type="number"
                name="capitalInitial"
                value={formData.capitalInitial}
                onChange={handleInputChange}
                min="0"
                step="100"
                required
              />
              
              <Input
                label="Versement Mensuel (TND)"
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
          {results && (
          <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
              <>
                {/* Résumé */}
                <Card title="Résumé">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Capital Final</div>
                      <div className="text-xl font-bold text-primary-400">
                        {formaterDevise(results[results.length - 1].capitalFin)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Versements Totaux</div>
                      <div className="text-xl font-bold text-steel-400">
                        {formaterDevise(formData.capitalInitial + (formData.versementMensuel * 12 * formData.dureeAnnees))}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Intérêts Gagnés</div>
                      <div className="text-xl font-bold text-green-400">
                        {formaterDevise(results[results.length - 1].capitalFin - formData.capitalInitial - (formData.versementMensuel * 12 * formData.dureeAnnees))}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Rendement</div>
                      <div className="text-xl font-bold text-accent-400">
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
                    <table className="table-dark">
                      <thead>
                        <tr>
                          <th>Année</th>
                          <th className="text-right">Capital Début</th>
                          <th className="text-right">Versements</th>
                          <th className="text-right">Intérêts</th>
                          <th className="text-right">Capital Fin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.slice(1).map((row) => (
                          <tr key={row.annee}>
                            <td>{row.annee}</td>
                            <td className="text-right">{formaterDevise(row.capitalDebut)}</td>
                            <td className="text-right text-green-400">{formaterDevise(row.versements)}</td>
                            <td className="text-right text-primary-400">{formaterDevise(row.interets)}</td>
                            <td className="text-right font-medium text-white">{formaterDevise(row.capitalFin)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <FormulaSection
                    formulas={[
                      {
                        label: 'Intérêts Simples',
                        formula: 'I = C \\times t \\times n',
                        description: 'Intérêts accumulés sur la période'
                      },
                      {
                        label: 'Valeur Acquise',
                        formula: 'V_A = C \\times (1 + t \\times n)',
                        description: 'Capital final avec intérêts simples'
                      },
                      {
                        label: 'Intérêts Composés',
                        formula: 'V_A = C \\times (1 + t)^n',
                        description: 'Capital final avec intérêts composés'
                      }
                    ]}
                    legend="C = Capital initial, t = Taux d'intérêt, n = Durée (années)"
                  />
                </Card>
              </>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Epargne;
