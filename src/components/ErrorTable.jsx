import React from 'react';

const ErrorTable = ({ errors, title = "Errores Léxicos", type = "lexical" }) => {
  if (errors.length === 0) return null;

  const styles = {
    lexical: {
      container: "bg-red-500/5 border-red-500/20 shadow-red-500/10",
      header: "bg-red-500/10 border-red-500/20",
      title: "text-red-400",
      dot: "bg-red-500",
      th: "bg-red-500/5",
      divide: "divide-red-500/10",
      rowHover: "hover:bg-red-500/5",
      orderCell: "text-red-300",
      label: "text-red-400/80"
    },
    syntactic: {
      container: "bg-amber-500/5 border-amber-500/20 shadow-amber-500/10",
      header: "bg-amber-500/10 border-amber-500/20",
      title: "text-amber-400",
      dot: "bg-amber-500",
      th: "bg-amber-500/5",
      divide: "divide-amber-500/10",
      rowHover: "hover:bg-amber-500/5",
      orderCell: "text-amber-300",
      label: "text-amber-400/80"
    },
    semantic: {
      container: "bg-fuchsia-500/5 border-fuchsia-500/20 shadow-fuchsia-500/10",
      header: "bg-fuchsia-500/10 border-fuchsia-500/20",
      title: "text-fuchsia-400",
      dot: "bg-fuchsia-500",
      th: "bg-fuchsia-500/5",
      divide: "divide-fuchsia-500/10",
      rowHover: "hover:bg-fuchsia-500/5",
      orderCell: "text-fuchsia-300",
      label: "text-fuchsia-400/80"
    }
  };

  const s = styles[type] || styles.lexical;

  return (
    <div className={`mt-8 overflow-hidden rounded-xl border glow ${s.container}`}>
      <div className={`px-6 py-4 border-b ${s.header}`}>
        <h2 className={`text-xl font-bold flex items-center gap-2 ${s.title}`}>
          <span className={`w-3 h-3 rounded-full animate-pulse ${s.dot}`}></span>
          {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`text-slate-300 text-sm uppercase tracking-wider ${s.th}`}>
              <th className="px-6 py-4 font-medium">#</th>
              <th className="px-6 py-4 font-medium">Descripción</th>
              <th className="px-6 py-4 font-medium">Sugerencia de Corrección</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${s.divide}`}>
            {errors.map((error) => (
              <tr 
                key={error.order} 
                className={`transition-colors ${s.rowHover}`}
              >
                <td className={`px-6 py-4 font-mono text-sm max-w-[80px] ${s.orderCell}`}>
                  {error.order}
                </td>
                <td className="px-6 py-4 text-slate-200">
                  <div className="flex flex-col">
                    <span className={`text-xs font-mono uppercase mb-1 ${s.label}`}>
                      {type === 'lexical' ? 'Lexema' : 'Incidencia'}: {error.value}
                    </span>
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
