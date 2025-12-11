import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FormulaSection } from '../components/common/Math';
import { formaterDevise, formaterPourcentage } from '../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmpruntObligataire = () => {
  const [formData, setFormData] = useState({
    montantEmission: 1000000,
    valeurNominale: 100,
    tauxCoupon: 5,
    dureeAnnees: 10,
    prixEmission: 98,
    prixRemboursement: 100,
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
    
    const nombreObligations = formData.montantEmission / formData.valeurNominale;
    const montantReelEmission = nombreObligations * formData.prixEmission;
    const couponAnnuel = (formData.valeurNominale * formData.tauxCoupon) / 100;
    const totalCoupons = couponAnnuel * nombreObligations;
    const montantRemboursement = nombreObligations * formData.prixRemboursement;
    const primeEmission = formData.valeurNominale - formData.prixEmission;
    const primeRemboursement = formData.prixRemboursement - formData.valeurNominale;
    
    // Tableau de service
    const tableau = [];
    for (let annee = 1; annee <= formData.dureeAnnees; annee++) {
      const isLastYear = annee === formData.dureeAnnees;
      tableau.push({
        annee,
        coupons: totalCoupons,
        remboursement: isLastYear ? montantRemboursement : 0,
        total: isLastYear ? totalCoupons + montantRemboursement : totalCoupons,
      });
    }
    
    const coutTotal = totalCoupons * formData.dureeAnnees + montantRemboursement - montantReelEmission;
    const tauxRendement = (coutTotal / montantReelEmission / formData.dureeAnnees) * 100;
    
    setResults({
      nombreObligations,
      montantReelEmission,
      couponAnnuel,
      totalCoupons,
      montantRemboursement,
      primeEmission,
      primeRemboursement,
      coutTotal,
      tauxRendement,
      tableau,
    });
  };

  const chartData = results ? {
    labels: results.tableau.map((r) => `Année ${r.annee}`),
    datasets: [
      {
        label: 'Coupons',
        data: results.tableau.map((r) => r.coupons),
        backgroundColor: 'rgba(61, 115, 182, 0.7)',
      },
      {
        label: 'Remboursement',
        data: results.tableau.map((r) => r.remboursement),
        backgroundColor: 'rgba(220, 38, 38, 0.7)',
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
        text: 'Service de l\'Emprunt Obligataire',
        color: '#fff',
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#6b7689' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value) => formaterDevise(value),
          color: '#6b7689',
        },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
    },
  };

  return (
    <div className="min-h-screen py-8 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Emprunts Obligataires</h1>
          <p className="text-gray-400">
            Simulez une émission obligataire et son tableau de service
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 transition-all duration-700 ease-out ${results ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-xl mx-auto'}`}>
          {/* Formulaire */}
          <Card className={`lg:col-span-1 transition-all duration-700 ease-out ${results ? '' : 'lg:max-w-xl lg:w-full'}`}>
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant de l'Émission (TND)"
                type="number"
                name="montantEmission"
                value={formData.montantEmission}
                onChange={handleInputChange}
                min="10000"
                step="10000"
                required
              />
              
              <Input
                label="Valeur Nominale (TND)"
                type="number"
                name="valeurNominale"
                value={formData.valeurNominale}
                onChange={handleInputChange}
                min="1"
                step="1"
                required
              />
              
              <Input
                label="Taux du Coupon (%)"
                type="number"
                name="tauxCoupon"
                value={formData.tauxCoupon}
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
              
              <Input
                label="Prix d'Émission (TND)"
                type="number"
                name="prixEmission"
                value={formData.prixEmission}
                onChange={handleInputChange}
                min="1"
                step="0.1"
                required
                helperText="Prix d'achat par obligation"
              />
              
              <Input
                label="Prix de Remboursement (TND)"
                type="number"
                name="prixRemboursement"
                value={formData.prixRemboursement}
                onChange={handleInputChange}
                min="1"
                step="0.1"
                required
                helperText="Prix de rachat par obligation"
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
                <Card title="Caractéristiques de l'Émission">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Nombre d'Obligations</div>
                      <div className="text-xl font-bold text-primary-400">
                        {Math.round(results.nombreObligations).toLocaleString()}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Montant Réel</div>
                      <div className="text-xl font-bold text-steel-400">
                        {formaterDevise(results.montantReelEmission)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Coupon Annuel</div>
                      <div className="text-xl font-bold text-green-400">
                        {formaterDevise(results.couponAnnuel)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Total Coupons/an</div>
                      <div className="text-xl font-bold text-yellow-400">
                        {formaterDevise(results.totalCoupons)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Coût Total</div>
                      <div className="text-xl font-bold text-accent-400">
                        {formaterDevise(results.coutTotal)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Taux de Rendement</div>
                      <div className="text-xl font-bold text-purple-400">
                        {formaterPourcentage(results.tauxRendement / 100)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Primes */}
                <Card title="Primes">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="stat-card p-4">
                      <div className="text-sm text-gray-400 mb-1">Prime d'Émission</div>
                      <div className="text-lg font-bold text-orange-400">
                        {formaterDevise(results.primeEmission)} par obligation
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total : {formaterDevise(results.primeEmission * results.nombreObligations)}
                      </div>
                    </div>
                    <div className="stat-card p-4">
                      <div className="text-sm text-gray-400 mb-1">Prime de Remboursement</div>
                      <div className="text-lg font-bold text-cyan-400">
                        {formaterDevise(results.primeRemboursement)} par obligation
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total : {formaterDevise(results.primeRemboursement * results.nombreObligations)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Graphique */}
                <Card title="Service de l'Emprunt">
                  <Bar data={chartData} options={chartOptions} />
                </Card>

                {/* Tableau */}
                <Card title="Tableau de Service de l'Emprunt">
                  <div className="overflow-x-auto">
                    <table className="table-dark">
                      <thead>
                        <tr>
                          <th>Année</th>
                          <th className="text-right">Coupons</th>
                          <th className="text-right">Remboursement</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.tableau.map((row) => (
                          <tr key={row.annee}>
                            <td>{row.annee}</td>
                            <td className="text-right text-primary-400">{formaterDevise(row.coupons)}</td>
                            <td className="text-right text-accent-400">{formaterDevise(row.remboursement)}</td>
                            <td className="text-right font-medium text-white">{formaterDevise(row.total)}</td>
                          </tr>
                        ))}
                        <tr className="bg-dark-700/50 font-semibold">
                          <td>TOTAL</td>
                          <td className="text-right text-primary-400">
                            {formaterDevise(results.totalCoupons * formData.dureeAnnees)}
                          </td>
                          <td className="text-right text-accent-400">
                            {formaterDevise(results.montantRemboursement)}
                          </td>
                          <td className="text-right text-white">
                            {formaterDevise(results.totalCoupons * formData.dureeAnnees + results.montantRemboursement)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <FormulaSection
                    formulas={[
                      {
                        label: 'Coupon Annuel',
                        formula: 'C = V_N \\times t_c',
                        description: 'Intérêt annuel par obligation'
                      },
                      {
                        label: 'Prime d\'Émission',
                        formula: 'P_E = V_N - P_{em}',
                        description: 'Différence entre valeur nominale et prix d\'émission'
                      },
                      {
                        label: 'Prime de Remboursement',
                        formula: 'P_R = P_{remb} - V_N',
                        description: 'Différence entre prix de remboursement et valeur nominale'
                      },
                      {
                        label: 'Taux de Rendement Actuariel',
                        formula: 'P_{em} = \\sum_{k=1}^{n} \\frac{C}{(1+r)^k} + \\frac{P_{remb}}{(1+r)^n}',
                        description: 'Taux r tel que le prix égale les flux actualisés'
                      }
                    ]}
                    legend="V_N = Valeur nominale, t_c = Taux coupon, P_{em} = Prix émission, P_{remb} = Prix remboursement"
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

export default EmpruntObligataire;
