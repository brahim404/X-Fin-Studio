import React, { useState } from 'react';
import Card from '../components/common/Card';
import TiltButton from '../components/common/TiltButton';
import RangeSlider from '../components/common/RangeSlider';
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

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
              <RangeSlider
                label="Montant du Découvert"
                value={formData.montantDecouvert}
                onChange={(value) => handleSliderChange('montantDecouvert', value)}
                min={0}
                max={50000}
                step={100}
                formatValue={(v) => formaterDevise(v)}
              />
              
              <RangeSlider
                label="Taux d'Intérêt Annuel"
                value={formData.tauxAnnuel}
                onChange={(value) => handleSliderChange('tauxAnnuel', value)}
                min={0}
                max={25}
                step={0.5}
                unit="%"
              />
              
              <RangeSlider
                label="Durée du Découvert"
                value={formData.nombreJours}
                onChange={(value) => handleSliderChange('nombreJours', value)}
                min={1}
                max={365}
                step={1}
                formatValue={(v) => `${v} jour${v > 1 ? 's' : ''}`}
              />
              
              <TiltButton type="submit" className="w-full mt-4">
                Calculer les Agios
              </TiltButton>
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
