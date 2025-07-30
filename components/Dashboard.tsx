import React, { useState } from 'react';
import StrategicIntelligence from './StrategicIntelligence';
import History from './History';
import { Bot, History as HistoryIcon, LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout?: () => void;
}

type View = 'intelligence' | 'history';

const Dashboard: React.FC<DashboardProps> = ({ onLogout = () => {} }) => {
  const [activeView, setActiveView] = useState<View>('intelligence');

  const NavItem = ({ icon, label, view, active }: { icon: React.ReactNode, label: string, view: View, active: boolean }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-cyan-600/20 text-cyan-300'
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/70 backdrop-blur-sm border-r border-slate-700 flex flex-col p-4">
        <div className="flex items-center mb-8">
            <Bot className="h-8 w-8 text-cyan-400 mr-3" />
            <h1 className="text-xl font-bold text-slate-100">Agencia AIZ</h1>
        </div>
        <nav className="flex-grow space-y-2">
            <NavItem icon={<Bot size={20} />} label="IA Estratégica" view="intelligence" active={activeView === 'intelligence'} />
            <NavItem icon={<HistoryIcon size={20} />} label="Historial de Generación" view="history" active={activeView === 'history'} />
        </nav>
        <div className="mt-auto">
            <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors duration-200"
            >
                <LogOut size={20} />
                <span className="ml-3">Cerrar Sesión</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {activeView === 'intelligence' && <StrategicIntelligence />}
        {activeView === 'history' && <History />}
      </main>
    </div>
  );
};

const LucideBot: React.FC<{size?: number, className?: string}> = ({size=24, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
const LucideHistoryIcon: React.FC<{size?: number, className?: string}> = ({size=24, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
);
const LucideLogOut: React.FC<{size?: number, className?: string}> = ({size=24, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

export default Dashboard;