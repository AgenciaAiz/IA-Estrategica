import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin = () => {} }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grid-slate-700/20">
      <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <Sparkles className="h-10 w-10 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-100">Inteligencia Estratégica AIZ</h1>
            <p className="mt-2 text-slate-400">Inicia sesión para acceder a tu estratega de IA</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-300 block mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              defaultValue="demo@aiz-agencia.com"
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-300 block mb-2">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              defaultValue="demopassword"
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-lg shadow-cyan-600/20 transition-all duration-300 transform hover:scale-105"
          >
            Acceder al Panel
          </button>
        </form>
      </div>
    </div>
  );
};

// Simple Sparkles icon component
const LucideSparkles: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
)

export default LoginScreen;