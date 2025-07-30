
import React, { useState } from 'react';
import StrategicIntelligence from './StrategicIntelligence';
import History from './History';
import { Bot, History as HistoryIcon, LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout?: () => void;
}

type View = 'intelligence' | 'history';

const Dashboard = ({ onLogout = () => {} }: DashboardProps) => {
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

export default Dashboard;
