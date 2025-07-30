
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Report } from '../types';
import Card from './common/Card';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';

const ReportDetails = ({ report }: { report: Report }) => {
    return (
        <div className="pl-8 py-4 bg-slate-800/30 rounded-b-lg">
            <h4 className="text-lg font-semibold text-slate-200 mb-3">Perspectivas ({report.perspectives.length})</h4>
            <div className="max-h-60 overflow-y-auto pr-4 space-y-2">
                {report.perspectives.map(p => (
                    <div key={p.perspective_id} className="text-sm p-2 bg-slate-700/50 rounded-md">
                        <span className="font-bold text-cyan-400/90">{p.perspective_id}.</span> <span className="text-slate-300">{p.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const History = () => {
  const [reports] = useLocalStorage<Report[]>('strategic_reports', []);
  const [groupedReports, setGroupedReports] = useState<Record<string, Report[]>>({});
  const [expandedReportId, setExpandedReportId] = useState<number | null>(null);

  useEffect(() => {
    const groups = reports.reduce((acc, report) => {
      const month = new Date(report.date).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      if (!acc[capitalizedMonth]) {
        acc[capitalizedMonth] = [];
      }
      acc[capitalizedMonth].push(report);
      return acc;
    }, {} as Record<string, Report[]>);
    setGroupedReports(groups);
  }, [reports]);

  const toggleReport = (id: number) => {
    setExpandedReportId(expandedReportId === id ? null : id);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-100 mb-2">Historial de Generaciones</h1>
      <p className="text-slate-400 mb-8">Revisa y accede a tus pasadas sesiones de generación estratégica.</p>
      
      {Object.keys(groupedReports).length === 0 ? (
          <Card>
              <p className="text-center text-slate-400">No se encontraron informes. Genera algunas perspectivas para ver tu historial aquí.</p>
          </Card>
      ) : (
        <div className="space-y-8">
            {Object.entries(groupedReports).map(([month, monthReports]) => (
                <div key={month}>
                    <h2 className="text-2xl font-semibold text-slate-300 mb-4 pb-2 border-b-2 border-slate-700">{month}</h2>
                    <div className="space-y-3">
                        {monthReports.map(report => (
                            <Card key={report.id} className="p-0 overflow-hidden">
                                <button onClick={() => toggleReport(report.id)} className="w-full flex items-center justify-between text-left p-4 hover:bg-slate-700/30 transition-colors">
                                    <div className="flex items-center">
                                        <FileText className="h-5 w-5 mr-4 text-cyan-400" />
                                        <div>
                                            <p className="font-semibold text-slate-100">{report.topic}</p>
                                            <p className="text-xs text-slate-400">Generado el {new Date(report.date).toLocaleDateString('es-ES')}</p>
                                        </div>
                                    </div>
                                    {expandedReportId === report.id ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                                </button>
                                {expandedReportId === report.id && <ReportDetails report={report} />}
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default History;
