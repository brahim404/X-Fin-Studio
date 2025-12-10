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
        backgroundColor: 'rgba(43, 108, 176, 0.7)',
      },
      {
        label: 'Remboursement',
        data: results.tableau.map((r) => r.remboursement),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
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
        text: 'Service de l\'Emprunt Obligataire',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Emprunts Obligataires</h1>
          <p className="text-gray-600">
            Simulez une émission obligataire et son tableau de service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant de l'Émission (€)"
                type="number"
                name="montantEmission"
                value={formData.montantEmission}
                onChange={handleInputChange}
                min="10000"
                step="10000"
                required
              />
              
              <Input
                label="Valeur Nominale (€)"
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
                label="Prix d'Émission (€)"
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
                label="Prix de Remboursement (€)"
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
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Résumé */}
                <Card title="Caractéristiques de l'Émission">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Nombre d'Obligations</div>
                      <div className="text-xl font-bold text-blue-600">
                        {Math.round(results.nombreObligations).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Montant Réel</div>
                      <div className="text-xl font-bold text-green-600">
                        {formaterDevise(results.montantReelEmission)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Coupon Annuel</div>
                      <div className="text-xl font-bold text-purple-600">
                        {formaterDevise(results.couponAnnuel)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Coupons/an</div>
                      <div className="text-xl font-bold text-yellow-600">
                        {formaterDevise(results.totalCoupons)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Coût Total</div>
                      <div className="text-xl font-bold text-red-600">
                        {formaterDevise(results.coutTotal)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Taux de Rendement</div>
                      <div className="text-xl font-bold text-indigo-600">
                        {formaterPourcentage(results.tauxRendement / 100)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Primes */}
                <Card title="Primes">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Prime d'Émission</div>
                      <div className="text-lg font-bold text-orange-600">
                        {formaterDevise(results.primeEmission)} par obligation
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total : {formaterDevise(results.primeEmission * results.nombreObligations)}
                      </div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Prime de Remboursement</div>
                      <div className="text-lg font-bold text-cyan-600">
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
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Année</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Coupons</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Remboursement</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.tableau.map((row) => (
                          <tr key={row.annee} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{row.annee}</td>
                            <td className="px-4 py-3 text-sm text-blue-600 text-right">{formaterDevise(row.coupons)}</td>
                            <td className="px-4 py-3 text-sm text-red-600 text-right">{formaterDevise(row.remboursement)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formaterDevise(row.total)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold">
                          <td className="px-4 py-3 text-sm text-gray-900">TOTAL</td>
                          <td className="px-4 py-3 text-sm text-blue-600 text-right">
                            {formaterDevise(results.totalCoupons * formData.dureeAnnees)}
                          </td>
                          <td className="px-4 py-3 text-sm text-red-600 text-right">
                            {formaterDevise(results.montantRemboursement)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            {formaterDevise(results.totalCoupons * formData.dureeAnnees + results.montantRemboursement)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Coupon Annuel :</strong> C = Valeur Nominale × Taux du Coupon
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Prime d'Émission :</strong> PE = Valeur Nominale - Prix d'Émission
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Prime de Remboursement :</strong> PR = Prix de Remboursement - Valeur Nominale
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Rendement :</strong> R = Coût Total / Montant Réel / Durée
                    </div>
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

export default EmpruntObligataire;
