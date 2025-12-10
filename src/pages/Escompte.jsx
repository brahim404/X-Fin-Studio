import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { calculerBordereauEscompte } from '../utils/finance/escompte';
import { formaterDevise, exporterCSV } from '../utils/helpers';

const Escompte = () => {
  const [effets, setEffets] = useState([
    { valeur: 5000, jours: 60 },
  ]);
  const [tauxAnnuel, setTauxAnnuel] = useState(5);
  const [results, setResults] = useState(null);

  const handleEffetChange = (index, field, value) => {
    const newEffets = [...effets];
    newEffets[index][field] = parseFloat(value) || 0;
    setEffets(newEffets);
  };

  const addEffet = () => {
    setEffets([...effets, { valeur: 1000, jours: 30 }]);
  };

  const removeEffet = (index) => {
    if (effets.length > 1) {
      setEffets(effets.filter((_, i) => i !== index));
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const bordereau = calculerBordereauEscompte(effets, tauxAnnuel / 100);
    setResults(bordereau);
  };

  const handleExport = () => {
    if (results) {
      exporterCSV(results.effets, 'bordereau-escompte');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Escompte Commercial</h1>
          <p className="text-gray-400">
            Générez un bordereau d'escompte et calculez la valeur actuelle de vos effets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleCalculate}>
              <Input
                label="Taux d'Escompte Annuel (%)"
                type="number"
                value={tauxAnnuel}
                onChange={(e) => setTauxAnnuel(parseFloat(e.target.value) || 0)}
                min="0"
                max="20"
                step="0.1"
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Effets de Commerce
                </label>
                {effets.map((effet, index) => (
                  <div key={index} className="mb-3 p-3 bg-dark-700/50 border border-dark-600/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Effet #{index + 1}</span>
                      {effets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEffet(index)}
                          className="text-accent-400 hover:text-accent-300 text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Valeur nominale (TND)"
                        value={effet.valeur}
                        onChange={(e) => handleEffetChange(index, 'valeur', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-800 border border-dark-600 text-gray-100 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none"
                        min="0"
                        step="100"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Nombre de jours"
                        value={effet.jours}
                        onChange={(e) => handleEffetChange(index, 'jours', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-800 border border-dark-600 text-gray-100 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none"
                        min="1"
                        max="360"
                        required
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addEffet} variant="secondary" className="w-full text-sm">
                  + Ajouter un Effet
                </Button>
              </div>

              <Button type="submit" className="w-full">
                Générer le Bordereau
              </Button>
            </form>
          </Card>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Résumé */}
                <Card 
                  title="Bordereau d'Escompte"
                  headerAction={
                    <Button onClick={handleExport} variant="secondary" className="text-sm">
                      Exporter CSV
                    </Button>
                  }
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Nombre d'Effets</div>
                      <div className="text-xl font-bold text-primary-400">
                        {results.nombreEffets}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Valeur Nominale</div>
                      <div className="text-xl font-bold text-steel-400">
                        {formaterDevise(results.totaux.valeurNominale)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Total Frais</div>
                      <div className="text-xl font-bold text-accent-400">
                        {formaterDevise(results.totaux.totalFrais)}
                      </div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-sm text-gray-400 mb-1">Valeur Nette</div>
                      <div className="text-xl font-bold text-green-400">
                        {formaterDevise(results.totaux.valeurNette)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tableau détaillé */}
                <Card title="Détail des Effets">
                  <div className="overflow-x-auto">
                    <table className="table-dark">
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th className="text-right">Val. Nominale</th>
                          <th className="text-right">Jours</th>
                          <th className="text-right">Escompte</th>
                          <th className="text-right">Commission</th>
                          <th className="text-right">Frais Fixes</th>
                          <th className="text-right">Total Frais</th>
                          <th className="text-right">Val. Nette</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.effets.map((effet) => (
                          <tr key={effet.numero}>
                            <td>{effet.numero}</td>
                            <td className="text-right">{formaterDevise(effet.valeurNominale)}</td>
                            <td className="text-right">{effet.jours}</td>
                            <td className="text-right text-accent-400">{formaterDevise(effet.escompte)}</td>
                            <td className="text-right text-orange-400">{formaterDevise(effet.commission)}</td>
                            <td className="text-right text-yellow-400">{formaterDevise(effet.fraisFixes)}</td>
                            <td className="text-right text-accent-400 font-medium">{formaterDevise(effet.totalFrais)}</td>
                            <td className="text-right text-green-400 font-medium">{formaterDevise(effet.valeurNette)}</td>
                          </tr>
                        ))}
                        <tr className="bg-dark-700/50 font-semibold">
                          <td>TOTAL</td>
                          <td className="text-right">{formaterDevise(results.totaux.valeurNominale)}</td>
                          <td></td>
                          <td className="text-right text-accent-400">{formaterDevise(results.totaux.escompte)}</td>
                          <td className="text-right text-orange-400">{formaterDevise(results.totaux.commission)}</td>
                          <td className="text-right text-yellow-400">{formaterDevise(results.totaux.fraisFixes)}</td>
                          <td className="text-right text-accent-400">{formaterDevise(results.totaux.totalFrais)}</td>
                          <td className="text-right text-green-400">{formaterDevise(results.totaux.valeurNette)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                      <strong className="text-gray-300">Escompte Commercial :</strong> <span className="text-gray-400">E = V × t × n / 360</span>
                    </div>
                    <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                      <strong className="text-gray-300">Valeur Actuelle :</strong> <span className="text-gray-400">VA = V - E - Commission - Frais</span>
                    </div>
                    <div className="p-3 bg-dark-700/50 border border-dark-600/50">
                      <strong className="text-gray-300">Commission :</strong> <span className="text-gray-400">C = V × 0.006 (0.6%)</span>
                    </div>
                    <p className="text-gray-500">
                      Où V = valeur nominale, t = taux d'escompte, n = nombre de jours
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

export default Escompte;
