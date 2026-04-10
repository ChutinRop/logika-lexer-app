import React from 'react';

const EXAMPLES = [
  {
    name: 'Declaración Básica',
    code: `entero x = 10;
decimal pi = 3.1416;
texto saludo = "Hola LÓGIKA";
logico esCierto = verdadero;`
  },
  {
    name: 'Operaciones',
    code: `entero suma = 5 + 10 * 2;
logico comparacion = suma >= 20 && verdadero;
// Esto es un comentario
decimal resultado = suma / 2.5;`
  },
  {
    name: 'Condicional (Estructura)',
    code: `logico flag = falso;
{
  entero a = 5;
  entero b = 10;
  logico res = (a < b) || flag;
}`
  },
  {
    name: 'Errores de Prueba',
    code: `entero 1variable = 100;
texto sinCierre = "Cadena abierta;
decimal malFormado = 10.abc;
$caracter_invalido;`
  }
];

const ExampleSelector = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Ejemplos de Prueba
      </h3>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example.name}
            onClick={() => onSelect(example.code)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-primary-500/10 hover:border-primary-500/30 text-slate-300 hover:text-primary-400 transition-all text-sm font-medium"
          >
            {example.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleSelector;
