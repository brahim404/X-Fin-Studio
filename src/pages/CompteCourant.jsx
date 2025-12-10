import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { calculerAgios } from '../utils/finance/interetsSimples';
import { formaterDevise, formaterPourcentage } from '../utils/helpers';

const CompteCourant = () => {
  const [formData, setFormData] = useState({
    montantDecouvert: 1000,
    tauxAnnuel: 12,
    nombreJours: 30,
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
    const agios = calculerAgios(
      formData.montantDecouvert,
      formData.tauxAnnuel / 100,
      formData.nombreJours
    );
    setResults(agios);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏧 Compte Courant - Agios</h1>
          <p className="text-gray-600">
            Calculez les frais de découvert et agios pour votre compte courant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant du Découvert (€)"
                type="number"
                name="montantDecouvert"
                value={formData.montantDecouvert}
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
                max="30"
                step="0.1"
                required
                helperText="Taux débiteur appliqué par la banque"
              />
              
              <Input
                label="Nombre de Jours"
                type="number"
                name="nombreJours"
                value={formData.nombreJours}
                onChange={handleInputChange}
                min="1"
                max="365"
                step="1"
                required
                helperText="Durée du découvert"
              />
              
              <Button type="submit" className="w-full">
                Calculer les Agios
              </Button>
            </form>
          </Card>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Résumé */}
                <Card title="Détail des Frais">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="text-gray-700">Montant du Découvert</span>
                      <span className="text-xl font-bold text-red-600">
                        {formaterDevise(formData.montantDecouvert)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <span className="text-gray-700">Intérêts Débiteurs</span>
                      <span className="text-xl font-bold text-orange-600">
                        {formaterDevise(results.interets)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700">Commission</span>
                      <span className="text-xl font-bold text-yellow-600">
                        {formaterDevise(results.commission)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <span className="text-gray-900 font-semibold">Total des Agios</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {formaterDevise(results.total)}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Récapitulatif */}
                <Card title="Récapitulatif">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Découvert sur {formData.nombreJours} jours</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formaterDevise(formData.montantDecouvert)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Taux appliqué</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formaterPourcentage(formData.tauxAnnuel / 100)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Intérêts débiteurs</td>
                          <td className="px-4 py-3 text-sm text-orange-600 text-right">{formaterDevise(results.interets)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Commission (0.05%)</td>
                          <td className="px-4 py-3 text-sm text-yellow-600 text-right">{formaterDevise(results.commission)}</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="px-4 py-3 text-sm text-gray-900">Total à payer</td>
                          <td className="px-4 py-3 text-sm text-purple-600 text-right">{formaterDevise(results.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Conseils */}
                <Card title="💡 Conseils">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Évitez les découverts autant que possible pour minimiser les frais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Négociez un taux de découvert autorisé avec votre banque</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Surveillez régulièrement votre solde pour éviter les frais</span>
                    </li>
                  </ul>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Intérêts Débiteurs :</strong> I = (Montant × Taux × Jours) / 365
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Commission :</strong> C = Montant × 0.0005
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Agios Totaux :</strong> Total = Intérêts + Commission
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

export default CompteCourant;
