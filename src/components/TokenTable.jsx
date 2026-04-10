import React from 'react';

const TokenTable = ({ tokens }) => {
  if (tokens.length === 0) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl glass border border-white/10 glow">
      <div className="bg-white/5 px-6 py-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          Tabla de Tokens
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-300 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium"># Orden</th>
              <th className="px-6 py-4 font-medium">Lexema</th>
              <th className="px-6 py-4 font-medium">Tipo de Token</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tokens.map((token) => (
              <tr 
                key={token.order} 
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                  {token.order}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-mono border border-blue-500/20 group-hover:border-blue-500/40 transition-all">
                    {token.value}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-200">
                  {token.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenTable;
