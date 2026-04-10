import React, { useState } from 'react';
import { tokenize } from './logic/lexer';
import TokenTable from './components/TokenTable';
import ErrorTable from './components/ErrorTable';
import ExampleSelector from './components/ExampleSelector';

function App() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState({ tokens: [], errors: [] });
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = () => {
    const { tokens, errors } = tokenize(code);
    setResults({ tokens, errors });
    setIsAnalyzed(true);
  };

  const handleClear = () => {
    setCode('');
    setResults({ tokens: [], errors: [] });
    setIsAnalyzed(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 selection:bg-primary-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-500/10 blur-[100px] -z-10 rounded-full"></div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-primary-300 to-primary-600 bg-clip-text text-transparent">
            LÓGIKA Lexer
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Analizador léxico moderno para el lenguaje de programación LÓGIKA. 
            Divide tu código en lexemas y detecta errores en tiempo real.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Section */}
          <section className="lg:col-span-12 xl:col-span-5 flex flex-col">
            <ExampleSelector onSelect={(sampleCode) => setCode(sampleCode)} />
            
            <div className="flex-1 rounded-2xl glass border border-white/10 overflow-hidden glow flex flex-col">
              <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
                <span className="text-sm font-mono text-slate-400">editor.logika</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Escribe tu código LÓGIKA aquí..."
                className="w-full h-[400px] p-6 bg-transparent text-slate-100 font-mono text-base resize-none focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-slate-600"
                spellCheck="false"
              ></textarea>

              <div className="p-4 bg-white/5 border-t border-white/10 flex gap-4">
                <button
                  onClick={handleAnalyze}
                  className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group shadow-lg shadow-primary-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-12 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Analizar Código
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="lg:col-span-12 xl:col-span-7">
            {!isAnalyzed ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-slate-500 animate-pulse bg-white/[0.02]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Los resultados del análisis aparecerán aquí</p>
                <p className="text-sm opacity-60">Ingresa código y presiona el botón "Analizar"</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TokenTable tokens={results.tokens} />
                <ErrorTable errors={results.errors} />
              </div>
            )}
          </section>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© 2026 LÓGIKA Lexer Project - Desarrollado para el análisis de lenguajes.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
