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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 Escompte Commercial</h1>
          <p className="text-gray-600">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effets de Commerce
                </label>
                {effets.map((effet, index) => (
                  <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Effet #{index + 1}</span>
                      {effets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEffet(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Valeur nominale (€)"
                        value={effet.valeur}
                        onChange={(e) => handleEffetChange(index, 'valeur', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        min="0"
                        step="100"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Nombre de jours"
                        value={effet.jours}
                        onChange={(e) => handleEffetChange(index, 'jours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
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
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Nombre d'Effets</div>
                      <div className="text-xl font-bold text-blue-600">
                        {results.nombreEffets}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Valeur Nominale</div>
                      <div className="text-xl font-bold text-green-600">
                        {formaterDevise(results.totaux.valeurNominale)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Frais</div>
                      <div className="text-xl font-bold text-red-600">
                        {formaterDevise(results.totaux.totalFrais)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Valeur Nette</div>
                      <div className="text-xl font-bold text-purple-600">
                        {formaterDevise(results.totaux.valeurNette)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tableau détaillé */}
                <Card title="Détail des Effets">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">N°</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Val. Nominale</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Jours</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Escompte</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Commission</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Frais Fixes</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Frais</th>
                          <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Val. Nette</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.effets.map((effet) => (
                          <tr key={effet.numero} className="hover:bg-gray-50">
                            <td className="px-3 py-3 text-sm text-gray-900">{effet.numero}</td>
                            <td className="px-3 py-3 text-sm text-gray-900 text-right">{formaterDevise(effet.valeurNominale)}</td>
                            <td className="px-3 py-3 text-sm text-gray-900 text-right">{effet.jours}</td>
                            <td className="px-3 py-3 text-sm text-red-600 text-right">{formaterDevise(effet.escompte)}</td>
                            <td className="px-3 py-3 text-sm text-orange-600 text-right">{formaterDevise(effet.commission)}</td>
                            <td className="px-3 py-3 text-sm text-yellow-600 text-right">{formaterDevise(effet.fraisFixes)}</td>
                            <td className="px-3 py-3 text-sm text-red-600 text-right font-medium">{formaterDevise(effet.totalFrais)}</td>
                            <td className="px-3 py-3 text-sm text-green-600 text-right font-medium">{formaterDevise(effet.valeurNette)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold">
                          <td colSpan="1" className="px-3 py-3 text-sm text-gray-900">TOTAL</td>
                          <td className="px-3 py-3 text-sm text-gray-900 text-right">{formaterDevise(results.totaux.valeurNominale)}</td>
                          <td className="px-3 py-3"></td>
                          <td className="px-3 py-3 text-sm text-red-600 text-right">{formaterDevise(results.totaux.escompte)}</td>
                          <td className="px-3 py-3 text-sm text-orange-600 text-right">{formaterDevise(results.totaux.commission)}</td>
                          <td className="px-3 py-3 text-sm text-yellow-600 text-right">{formaterDevise(results.totaux.fraisFixes)}</td>
                          <td className="px-3 py-3 text-sm text-red-600 text-right">{formaterDevise(results.totaux.totalFrais)}</td>
                          <td className="px-3 py-3 text-sm text-green-600 text-right">{formaterDevise(results.totaux.valeurNette)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Formules */}
                <Card title="Formules Utilisées">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Escompte Commercial :</strong> E = V × t × n / 360
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Valeur Actuelle :</strong> VA = V - E - Commission - Frais
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Commission :</strong> C = V × 0.006 (0.6%)
                    </div>
                    <p className="text-gray-600">
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
