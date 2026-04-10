import React from 'react';

const ErrorTable = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-red-500/5 border border-red-500/20 glow shadow-red-500/10">
      <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20">
        <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          Errores Léxicos Detectados
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-500/5 text-slate-300 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium"># Error</th>
              <th className="px-6 py-4 font-medium">Descripción</th>
              <th className="px-6 py-4 font-medium">Sugerencia de Corrección</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-500/10">
            {errors.map((error) => (
              <tr 
                key={error.order} 
                className="hover:bg-red-500/5 transition-colors"
              >
                <td className="px-6 py-4 text-red-300 font-mono text-sm max-w-[80px]">
                  {error.order}
                </td>
                <td className="px-6 py-4 text-slate-200">
                  <div className="flex flex-col">
                    <span className="text-red-400/80 text-xs font-mono uppercase mb-1">Error en lexema: {error.value}</span>
                    <p>{error.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-2 rounded-lg border border-emerald-400/20 italic text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {error.suggestion}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorTable;
