import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import TiltButton from '../components/common/TiltButton';
import RangeSlider from '../components/common/RangeSlider';
import DatePicker from '../components/common/DatePicker';
import { FormulaSection } from '../components/common/Math';
import { calculerBordereauEscompte } from '../utils/finance/escompte';
import { formaterDevise, exporterCSV } from '../utils/helpers';

const Escompte = () => {
  const today = new Date();
  const formatDateISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [effets, setEffets] = useState([
    { 
      valeur: 5000, 
      dateCreation: formatDateISO(today),
      dateEcheance: formatDateISO(new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)),
      tireur: 'Société ABC',
      tire: 'Client XYZ',
      lieuPaiement: 'Tunis',
    },
  ]);
  const [tauxAnnuel, setTauxAnnuel] = useState(5);
  const [tauxCommission, setTauxCommission] = useState(0.6);
  const [fraisFixes, setFraisFixes] = useState(2);
  const [nomBanque, setNomBanque] = useState('Banque Nationale');
  const [dateRemise, setDateRemise] = useState(formatDateISO(today));
  const [results, setResults] = useState(null);

  const calculateDays = (dateCreation, dateEcheance) => {
    if (!dateCreation || !dateEcheance) return 0;
    const start = new Date(dateCreation);
    const end = new Date(dateEcheance);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleEffetChange = (index, field, value) => {
    const newEffets = [...effets];
    newEffets[index][field] = field === 'valeur' ? (parseFloat(value) || 0) : value;
    setEffets(newEffets);
  };

  const addEffet = () => {
    const newDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    setEffets([...effets, { 
      valeur: 1000, 
      dateCreation: formatDateISO(today),
      dateEcheance: formatDateISO(newDate),
      tireur: '',
      tire: '',
      lieuPaiement: 'Tunis',
    }]);
  };

  const removeEffet = (index) => {
    if (effets.length > 1) {
      setEffets(effets.filter((_, i) => i !== index));
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const effetsWithDays = effets.map(effet => ({
      ...effet,
      valeur: effet.valeur,
      jours: calculateDays(dateRemise, effet.dateEcheance),
    }));
    const bordereau = calculerBordereauEscompte(
      effetsWithDays, 
      tauxAnnuel / 100, 
      tauxCommission / 100,
      fraisFixes
    );
    // Merge original effet data with calculated results
    const enrichedEffets = bordereau.effets.map((result, index) => ({
      ...result,
      tireur: effets[index].tireur,
      tire: effets[index].tire,
      dateCreation: effets[index].dateCreation,
      dateEcheance: effets[index].dateEcheance,
      lieuPaiement: effets[index].lieuPaiement,
    }));
    setResults({ ...bordereau, effets: enrichedEffets, dateRemise, nomBanque });
  };

  const handleExport = () => {
    if (results) {
      exporterCSV(results.effets, 'bordereau-escompte');
    }
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen py-8 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Escompte Commercial</h1>
          <p className="text-gray-400">
            Générez un bordereau d'escompte détaillé avec calcul de la valeur actuelle de vos effets de commerce
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 transition-all duration-700 ease-out ${results ? 'xl:grid-cols-4' : 'lg:grid-cols-1 max-w-2xl mx-auto'}`}>
          {/* Formulaire */}
          <Card colorTheme="purple" className={`transition-all duration-700 ease-out ${results ? 'xl:col-span-1' : ''}`}>
            <form onSubmit={handleCalculate}>
              {/* Bank and Date Info */}
              <div className="mb-6 p-4 bg-dark-800/50 border border-purple-500/20"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">Informations Générales</h3>
                <Input
                  label="Nom de la Banque"
                  type="text"
                  value={nomBanque}
                  onChange={(e) => setNomBanque(e.target.value)}
                  placeholder="Nom de la banque"
                />
                <DatePicker
                  label="Date de Remise"
                  value={dateRemise}
                  onChange={setDateRemise}
                />
              </div>

              {/* Rate Settings */}
              <div className="mb-6 p-4 bg-dark-800/50 border border-dark-600/50"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Paramètres de Calcul</h3>
                <RangeSlider
                  colorTheme="purple"
                  label="Taux d'Escompte Annuel"
                  value={tauxAnnuel}
                  onChange={setTauxAnnuel}
                  min={0}
                  max={20}
                  step={0.1}
                  unit="%"
                />
                <RangeSlider
                  colorTheme="purple"
                  label="Taux de Commission"
                  value={tauxCommission}
                  onChange={setTauxCommission}
                  min={0}
                  max={2}
                  step={0.05}
                  unit="%"
                />
                <RangeSlider
                  colorTheme="purple"
                  label="Frais Fixes par Effet"
                  value={fraisFixes}
                  onChange={setFraisFixes}
                  min={0}
                  max={20}
                  step={0.5}
                  formatValue={(v) => formaterDevise(v)}
                />
              </div>

              {/* Effects List */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                  Effets de Commerce ({effets.length})
                </label>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-purple">
                  {effets.map((effet, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-dark-700/50 border border-dark-600/50 transition-all duration-300 hover:border-purple-500/30"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-purple-400">Effet #{index + 1}</span>
                        {effets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEffet(index)}
                            className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors"
                          >
                            ✕ Supprimer
                          </button>
                        )}
                      </div>
                      
                      {/* Value Input */}
                      <div className="mb-3">
                        <label className="block text-xs text-gray-400 mb-1">Valeur Nominale (TND)</label>
                        <input
                          type="number"
                          value={effet.valeur}
                          onChange={(e) => handleEffetChange(index, 'valeur', e.target.value)}
                          className="w-full px-3 py-2 bg-dark-800 border border-dark-600 text-gray-100 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                      
                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Date Création</label>
                          <input
                            type="date"
                            value={effet.dateCreation}
                            onChange={(e) => handleEffetChange(index, 'dateCreation', e.target.value)}
                            className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 text-gray-100 text-xs focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Date Échéance</label>
                          <input
                            type="date"
                            value={effet.dateEcheance}
                            onChange={(e) => handleEffetChange(index, 'dateEcheance', e.target.value)}
                            className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 text-gray-100 text-xs focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none"
                          />
                        </div>
                      </div>
                      
                      {/* Tireur/Tiré */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Tireur</label>
                          <input
                            type="text"
                            value={effet.tireur}
                            onChange={(e) => handleEffetChange(index, 'tireur', e.target.value)}
                            placeholder="Nom du tireur"
                            className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 text-gray-100 text-xs focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Tiré</label>
                          <input
                            type="text"
                            value={effet.tire}
                            onChange={(e) => handleEffetChange(index, 'tire', e.target.value)}
                            placeholder="Nom du tiré"
                            className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 text-gray-100 text-xs focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none"
                          />
                        </div>
                      </div>
                      
                      {/* Lieu */}
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Lieu de Paiement</label>
                        <input
                          type="text"
                          value={effet.lieuPaiement}
                          onChange={(e) => handleEffetChange(index, 'lieuPaiement', e.target.value)}
                          placeholder="Lieu de paiement"
                          className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 text-gray-100 text-xs focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none"
                        />
                      </div>
                      
                      {/* Days Preview */}
                      <div className="mt-3 pt-3 border-t border-dark-600/50">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Jours restants:</span>
                          <span className="text-purple-400 font-bold">
                            {calculateDays(dateRemise, effet.dateEcheance)} jours
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <TiltButton 
                  type="button" 
                  onClick={addEffet} 
                  variant="secondary" 
                  className="w-full text-sm mt-4"
                >
                  + Ajouter un Effet
                </TiltButton>
              </div>

              <TiltButton type="submit" variant="purple" className="w-full">
                Générer le Bordereau
              </TiltButton>
            </form>
          </Card>

          {/* Résultats - Enhanced Bordereau */}
          {results && (
          <div className="xl:col-span-3 space-y-6 animate-slide-in-right">
              {/* Official Bordereau Document */}
              <div 
                className="bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800 border-2 border-primary-500/30 p-8 relative overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.15), inset 0 0 100px rgba(0, 212, 255, 0.03)'
                }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary-500/30" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-accent-500/30" />
                
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-primary-500/20 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                  <h2 
                    className="text-3xl font-bold text-white mb-2 font-display tracking-wider uppercase"
                    style={{ textShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
                  >
                    Bordereau d'Escompte
                  </h2>
                  <p className="text-gray-400 text-lg">{results.nomBanque}</p>
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Date de remise: </span>
                      <span className="text-primary-400 font-bold">{formatDateDisplay(results.dateRemise)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">N° Bordereau: </span>
                      <span className="text-primary-400 font-bold">BE-{Date.now().toString().slice(-6)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  <div className="bg-dark-800/80 p-4 border border-dark-600/50 text-center"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Effets</div>
                    <div className="text-2xl font-bold text-primary-400 font-display">{results.nombreEffets}</div>
                  </div>
                  <div className="bg-dark-800/80 p-4 border border-dark-600/50 text-center"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nominale</div>
                    <div className="text-xl font-bold text-white font-display">{formaterDevise(results.totaux.valeurNominale)}</div>
                  </div>
                  <div className="bg-dark-800/80 p-4 border border-dark-600/50 text-center"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Escompte</div>
                    <div className="text-xl font-bold text-orange-400 font-display">{formaterDevise(results.totaux.escompte)}</div>
                  </div>
                  <div className="bg-dark-800/80 p-4 border border-accent-500/30 text-center"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Frais</div>
                    <div className="text-xl font-bold text-accent-400 font-display">{formaterDevise(results.totaux.totalFrais)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/30 p-4 border-2 border-primary-500/50 text-center"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))', boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}>
                    <div className="text-xs text-primary-300 uppercase tracking-wider mb-1">Valeur Nette</div>
                    <div className="text-xl font-bold text-green-400 font-display">{formaterDevise(results.totaux.valeurNette)}</div>
                  </div>
                </div>

                {/* Detailed Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-dark-800/80">
                        <th className="px-3 py-3 text-left text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">N°</th>
                        <th className="px-3 py-3 text-left text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Tireur / Tiré</th>
                        <th className="px-3 py-3 text-center text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Échéance</th>
                        <th className="px-3 py-3 text-center text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Jours</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Nominale</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Escompte</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Commission</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Frais</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-dark-600">Total Frais</th>
                        <th className="px-3 py-3 text-right text-xs font-bold text-green-400 uppercase tracking-wider border-b border-dark-600">Nette</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.effets.map((effet, index) => (
                        <tr 
                          key={effet.numero} 
                          className={`transition-all duration-200 hover:bg-dark-700/50 ${index % 2 === 0 ? 'bg-dark-800/30' : 'bg-dark-800/10'}`}
                        >
                          <td className="px-3 py-3 text-sm font-bold text-primary-400 border-b border-dark-700/50">{effet.numero}</td>
                          <td className="px-3 py-3 border-b border-dark-700/50">
                            <div className="text-sm text-white font-medium">{effet.tireur || '-'}</div>
                            <div className="text-xs text-gray-500">{effet.tire || '-'}</div>
                          </td>
                          <td className="px-3 py-3 text-center text-sm text-gray-300 border-b border-dark-700/50">{formatDateDisplay(effet.dateEcheance)}</td>
                          <td className="px-3 py-3 text-center text-sm text-gray-300 border-b border-dark-700/50">{effet.jours}</td>
                          <td className="px-3 py-3 text-right text-sm text-white font-medium border-b border-dark-700/50">{formaterDevise(effet.valeurNominale)}</td>
                          <td className="px-3 py-3 text-right text-sm text-orange-400 border-b border-dark-700/50">{formaterDevise(effet.escompte)}</td>
                          <td className="px-3 py-3 text-right text-sm text-yellow-400 border-b border-dark-700/50">{formaterDevise(effet.commission)}</td>
                          <td className="px-3 py-3 text-right text-sm text-gray-400 border-b border-dark-700/50">{formaterDevise(effet.fraisFixes)}</td>
                          <td className="px-3 py-3 text-right text-sm text-accent-400 font-medium border-b border-dark-700/50">{formaterDevise(effet.totalFrais)}</td>
                          <td className="px-3 py-3 text-right text-sm text-green-400 font-bold border-b border-dark-700/50">{formaterDevise(effet.valeurNette)}</td>
                        </tr>
                      ))}
                      <tr className="bg-dark-700/80 font-bold">
                        <td colSpan="4" className="px-3 py-4 text-sm text-white uppercase border-t-2 border-primary-500/30">TOTAL</td>
                        <td className="px-3 py-4 text-right text-sm text-white border-t-2 border-primary-500/30">{formaterDevise(results.totaux.valeurNominale)}</td>
                        <td className="px-3 py-4 text-right text-sm text-orange-400 border-t-2 border-primary-500/30">{formaterDevise(results.totaux.escompte)}</td>
                        <td className="px-3 py-4 text-right text-sm text-yellow-400 border-t-2 border-primary-500/30">{formaterDevise(results.totaux.commission)}</td>
                        <td className="px-3 py-4 text-right text-sm text-gray-400 border-t-2 border-primary-500/30">{formaterDevise(results.totaux.fraisFixes)}</td>
                        <td className="px-3 py-4 text-right text-sm text-accent-400 border-t-2 border-primary-500/30">{formaterDevise(results.totaux.totalFrais)}</td>
                        <td className="px-3 py-4 text-right text-sm text-green-400 border-t-2 border-primary-500/30">{formaterDevise(results.totaux.valeurNette)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer with calculations breakdown and signature area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-dark-600/50">
                  {/* Calculations Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Détail des Calculs</h4>
                    <div className="flex justify-between text-sm py-1 border-b border-dark-700/50">
                      <span className="text-gray-400">Taux d'escompte appliqué:</span>
                      <span className="text-white font-medium">{tauxAnnuel}% annuel</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-dark-700/50">
                      <span className="text-gray-400">Taux de commission:</span>
                      <span className="text-white font-medium">{tauxCommission}%</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-dark-700/50">
                      <span className="text-gray-400">Frais fixes par effet:</span>
                      <span className="text-white font-medium">{formaterDevise(fraisFixes)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-dark-700/50">
                      <span className="text-gray-400">Base de calcul:</span>
                      <span className="text-white font-medium">360 jours</span>
                    </div>
                  </div>
                  
                  {/* Signature Area */}
                  <div className="text-center">
                    <div className="inline-block p-4 border border-dashed border-dark-500 min-w-[200px]">
                      <p className="text-xs text-gray-500 mb-8">Cachet et Signature de la Banque</p>
                      <div className="border-t border-dark-600 pt-2">
                        <p className="text-xs text-gray-500">Date: {formatDateDisplay(results.dateRemise)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Button */}
                <div className="mt-6 pt-6 border-t border-dark-600/50 flex justify-end">
                  <TiltButton onClick={handleExport} variant="secondary">
                    📊 Exporter CSV
                  </TiltButton>
                </div>
              </div>

              {/* Formulas Card */}
              <Card colorTheme="purple" title="Formules Utilisées">
                <FormulaSection
                  formulas={[
                    {
                      label: 'Escompte Commercial',
                      formula: 'E = \\frac{V \\times t \\times n}{360}',
                      description: 'Montant de l\'escompte (base 360 jours)'
                    },
                    {
                      label: 'Valeur Actuelle',
                      formula: 'V_A = V - E - C - F',
                      description: 'Valeur nette après déduction des frais'
                    },
                    {
                      label: 'Commission',
                      formula: 'C = V \\times t_c',
                      description: `Commission bancaire (${tauxCommission}%)`
                    },
                    {
                      label: 'Taux Réel',
                      formula: 't_r = \\frac{E + C + F}{V_A} \\times \\frac{360}{n}',
                      description: 'Taux effectif de l\'opération'
                    }
                  ]}
                  legend="V = Valeur nominale, t = Taux d'escompte, n = Nombre de jours, F = Frais fixes, tc = Taux commission"
                />
              </Card>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Escompte;
