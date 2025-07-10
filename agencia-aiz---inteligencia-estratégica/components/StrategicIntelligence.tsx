import React, { useState, useCallback } from 'react';
import generateStrategicPerspectives from '../services/geminiService';
import { Report, StrategicPerspective } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Spinner from './common/Spinner';
import Card from './common/Card';
import { Download, Lightbulb, ChevronsUpDown, Layers, Target, CheckSquare } from 'lucide-react';

const PerspectiveCard: React.FC<{ perspective: StrategicPerspective }> = ({ perspective }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4 transition-all duration-300">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex justify-between items-center">
        <div className="flex items-center">
            <span className="text-cyan-400 font-bold mr-3">{perspective.perspective_id}.</span>
            <h3 className="text-lg font-semibold text-slate-100">{perspective.title}</h3>
        </div>
        <ChevronsUpDown className={`h-5 w-5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 pl-7 space-y-4 text-slate-300">
          <div className="border-l-2 border-slate-600 pl-4">
            <h4 className="flex items-center text-md font-semibold text-slate-200 mb-1">
              <Layers className="h-4 w-4 mr-2 text-cyan-400/80" />
              Capa 1: Estrategia
            </h4>
            <p className="text-sm">{perspective.layer1_strategy}</p>
          </div>
          <div className="border-l-2 border-slate-600 pl-4">
            <h4 className="flex items-center text-md font-semibold text-slate-200 mb-1">
              <Target className="h-4 w-4 mr-2 text-cyan-400/80" />
              Capa 2: Tácticas
            </h4>
            <p className="text-sm">{perspective.layer2_tactics}</p>
          </div>
          <div className="border-l-2 border-slate-600 pl-4">
            <h4 className="flex items-center text-md font-semibold text-slate-200 mb-1">
              <CheckSquare className="h-4 w-4 mr-2 text-cyan-400/80" />
              Capa 3: Acciones
            </h4>
            <p className="text-sm whitespace-pre-line">{perspective.layer3_actions}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

const StrategicIntelligence: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [perspectives, setPerspectives] = useState<StrategicPerspective[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useLocalStorage<Report[]>('strategic_reports', []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Por favor, introduce un tema.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPerspectives([]);

    try {
      const result = await generateStrategicPerspectives(topic);
      setPerspectives(result);
      const newReport: Report = {
        id: Date.now(),
        topic,
        perspectives: result,
        date: new Date().toISOString(),
      };
      setReports([newReport, ...reports]);
    } catch (e: any) {
      setError(e.message || 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, reports, setReports]);

  const handleDownload = useCallback(() => {
    if (perspectives.length === 0) return;
    
    const reportData = {
        topic,
        generatedAt: new Date().toISOString(),
        perspectives,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `perspectivas-estrategicas-${topic.replace(/\s+/g, '_')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }, [perspectives, topic]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-100 mb-2">IA de Inteligencia Estratégica</h1>
      <p className="text-slate-400 mb-8">Introduce un tema, desafío o idea para generar 50 perspectivas estratégicas únicas.</p>
      
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="ej., 'lanzar una nueva marca de café para la Gen Z'"
            className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md px-6 py-2 shadow-lg shadow-cyan-600/20 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? <Spinner /> : <><Lightbulb className="h-5 w-5 mr-2" /> Generar Perspectivas</>}
          </button>
        </div>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </Card>
      
      {perspectives.length > 0 && (
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-200">Perspectivas Generadas para "{topic}"</h2>
              <button onClick={handleDownload} className="flex items-center bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-md px-4 py-2 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar JSON
              </button>
          </div>
      )}

      <div>
        {perspectives.map((p) => (
          <PerspectiveCard key={p.perspective_id} perspective={p} />
        ))}
      </div>
    </div>
  );
};

const LucideLightbulb: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7c0-2.2-1.8-4-4-4S9.8 4.8 9.8 7c0 2 .3 3.2 1.5 4.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const LucideDownload: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const LucideChevronsUpDown: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
);
const LucideLayers: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const LucideTarget: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const LucideCheckSquare: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
);

export default StrategicIntelligence;