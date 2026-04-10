export const TOKEN_TYPES = {
  T_DATO: 'Palabra Reservada (Tipo de Dato)',
  T_LOGICO: 'Valor Lógico',
  T_ID: 'Identificador',
  T_ENTERO: 'Número Entero',
  T_DECIMAL: 'Número Decimal',
  T_TEXTO: 'Cadena de Texto',
  T_OP_ARIT: 'Operador Aritmético',
  T_OP_REL: 'Operador Relacional',
  T_OP_LOG: 'Operador Lógico',
  T_ASIGNACION: 'Operador Asignación',
  T_PAR_ABRE: 'Paréntesis Abre',
  T_PAR_CIERRA: 'Paréntesis Cierra',
  T_LLAVE_ABRE: 'Llave Abre',
  T_LLAVE_CIERRA: 'Llave Cierra',
  T_FIN: 'Fin de Sentencia',
  T_COMENTARIO: 'Comentario',
};

const RULES = [
  { type: 'T_COMENTARIO', regex: /^\/\/.*/ },
  { type: 'T_TEXTO', regex: /^"[^"]*"/ },
  { type: 'T_DATO', regex: /^(entero|decimal|texto|logico)\b/ },
  { type: 'T_LOGICO', regex: /^(verdadero|falso)\b/ },
  { type: 'T_DECIMAL', regex: /^[0-9]+\.[0-9]+/ },
  { type: 'T_ENTERO', regex: /^[0-9]+/ },
  { type: 'T_OP_REL', regex: /^(>=|<=|==|!=|>|<)/ },
  { type: 'T_OP_LOG', regex: /^(&&|\|\||!)/ },
  { type: 'T_OP_ARIT', regex: /^(\+|-|\*|\/|%)/ },
  { type: 'T_ASIGNACION', regex: /^=/ },
  { type: 'T_FIN', regex: /^;/ },
  { type: 'T_PAR_ABRE', regex: /^\(/ },
  { type: 'T_PAR_CIERRA', regex: /^\)/ },
  { type: 'T_LLAVE_ABRE', regex: /^\{/ },
  { type: 'T_LLAVE_CIERRA', regex: /^\}/ },
  { type: 'T_ID', regex: /^[a-zA-Z][a-zA-Z0-9]*/ },
];

export function tokenize(code) {
  let tokens = [];
  let errors = [];
  let current = 0;
  let order = 1;
  let errorOrder = 1;

  while (current < code.length) {
    let char = code[current];

    // Skip whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    let remainingCode = code.slice(current);
    let matched = false;

    for (const rule of RULES) {
      const match = remainingCode.match(rule.regex);
      if (match) {
        tokens.push({
          order: order++,
          value: match[0],
          type: TOKEN_TYPES[rule.type],
          rawType: rule.type
        });
        current += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Find the end of the "broken" token (until next space or known symbol start)
      let invalidToken = '';
      let tempCurrent = current;
      while (tempCurrent < code.length && !/\s/.test(code[tempCurrent]) && !isStartOfToken(code.slice(tempCurrent))) {
        invalidToken += code[tempCurrent];
        tempCurrent++;
      }
      
      if (invalidToken === '') {
          invalidToken = code[current];
          tempCurrent++;
      }

      errors.push({
        order: errorOrder++,
        value: invalidToken,
        description: `Lexema '${invalidToken}' no reconocido por el lenguaje LÓGIKA.`,
        suggestion: getSuggestion(invalidToken)
      });
      current = tempCurrent;
    }
  }

  return { tokens, errors };
}

function isStartOfToken(remaining) {
  for (const rule of RULES) {
    if (rule.regex.test(remaining)) return true;
  }
  return false;
}

function getSuggestion(invalidToken) {
  if (invalidToken.startsWith('"') && !invalidToken.endsWith('"')) {
    return 'Cierre la cadena de texto con comillas dobles (").';
  }
  if (/^[0-9][a-zA-Z]/.test(invalidToken)) {
    return 'Los identificadores no pueden comenzar con un número.';
  }
  if (invalidToken === '&' || invalidToken === '|') {
    return `¿Quiso decir '${invalidToken}${invalidToken}'?`;
  }
  return 'Verifique la ortografía o el uso de caracteres especiales no permitidos.';
}
