import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FormulaSection } from '../components/common/Math';
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
    <div className="min-h-screen py-8 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Compte Courant - Agios</h1>
          <p className="text-gray-400">
            Calculez les frais de découvert et agios pour votre compte courant
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 transition-all duration-700 ease-out ${results ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-xl mx-auto'}`}>
          {/* Formulaire */}
          <Card className={`lg:col-span-1 transition-all duration-700 ease-out ${results ? '' : 'lg:max-w-xl lg:w-full'}`}>
            <form onSubmit={handleCalculate}>
              <Input
                label="Montant du Découvert (TND)"
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
          {results && (
          <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
              <>
                {/* Résumé */}
                <Card title="Détail des Frais">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 stat-card">
                      <span className="text-gray-300">Montant du Découvert</span>
                      <span className="text-xl font-bold text-accent-400">
                        {formaterDevise(formData.montantDecouvert)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 stat-card">
                      <span className="text-gray-300">Intérêts Débiteurs</span>
                      <span className="text-xl font-bold text-orange-400">
                        {formaterDevise(results.interets)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 stat-card">
                      <span className="text-gray-300">Commission</span>
                      <span className="text-xl font-bold text-yellow-400">
                        {formaterDevise(results.commission)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 stat-card border-2 border-primary-500/50">
                      <span className="text-white font-semibold">Total des Agios</span>
                      <span className="text-2xl font-bold text-primary-400">
                        {formaterDevise(results.total)}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Récapitulatif */}
                <Card title="Récapitulatif">
                  <div className="overflow-x-auto">
                    <table className="table-dark">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th className="text-right">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Découvert sur {formData.nombreJours} jours</td>
                          <td className="text-right">{formaterDevise(formData.montantDecouvert)}</td>
                        </tr>
                        <tr>
                          <td>Taux appliqué</td>
                          <td className="text-right">{formaterPourcentage(formData.tauxAnnuel / 100)}</td>
                        </tr>
                        <tr>
                          <td>Intérêts débiteurs</td>
                          <td className="text-right text-orange-400">{formaterDevise(results.interets)}</td>
                        </tr>
                        <tr>
                          <td>Commission (0.05%)</td>
                          <td className="text-right text-yellow-400">{formaterDevise(results.commission)}</td>
                        </tr>
                        <tr className="bg-dark-700/50 font-semibold">
                          <td>Total à payer</td>
                          <td className="text-right text-primary-400">{formaterDevise(results.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Conseils */}
                <Card title="Conseils">
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Évitez les découverts autant que possible pour minimiser les frais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Négociez un taux de découvert autorisé avec votre banque</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Surveillez régulièrement votre solde pour éviter les frais</span>
                    </li>
                  </ul>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <FormulaSection
                    formulas={[
                      {
                        label: 'Intérêts Débiteurs',
                        formula: 'I = \\frac{M \\times t \\times j}{365}',
                        description: 'Calcul des intérêts sur la période'
                      },
                      {
                        label: 'Commission',
                        formula: 'C = M \\times 0.0005',
                        description: 'Commission bancaire (0.05%)'
                      },
                      {
                        label: 'Agios Totaux',
                        formula: 'A_{total} = I + C',
                        description: 'Total des frais bancaires'
                      }
                    ]}
                    legend="M = Montant du découvert, t = Taux annuel, j = Nombre de jours"
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

export default CompteCourant;
