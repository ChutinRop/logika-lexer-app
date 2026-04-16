/**
 * Analizador Sintáctico y Semántico para el lenguaje LÓGIKA
 * 
 * Sintáctico: Verifica que la estructura de las sentencias sea correcta.
 * Semántico: Verifica coherencia de tipos y uso de variables.
 */

export function parse(tokens) {
  const syntacticErrors = [];
  const semanticErrors = [];
  const symbolTable = {}; // Almacena { nombre: tipo }
  let current = 0;

  // Filtrar comentarios para el análisis sintáctico
  const filteredTokens = tokens.filter(t => t.rawType !== 'T_COMENTARIO');

  function peek() {
    return filteredTokens[current] || null;
  }

  function consume() {
    return filteredTokens[current++];
  }

  function expect(type, message) {
    const token = peek();
    if (token && token.rawType === type) {
      return consume();
    }
    syntacticErrors.push({
      order: syntacticErrors.length + 1,
      value: token ? token.value : 'EOF',
      description: message,
      suggestion: token ? `Se encontró '${token.value}', pero se esperaba un token de tipo ${type}.` : 'Asegúrese de cerrar todas las sentencias.'
    });
    return null;
  }

  // Sincronización básica para no detenerse al primer error
  function synchronize() {
    while (current < filteredTokens.length) {
      if (filteredTokens[current].rawType === 'T_FIN') {
        current++;
        return;
      }
      if (['T_DATO', 'T_LLAVE_ABRE', 'T_LLAVE_CIERRA'].includes(filteredTokens[current].rawType)) {
        return;
      }
      current++;
    }
  }

  while (current < filteredTokens.length) {
    const token = peek();

    // REGLA: Declaración (entero x = 10 + a;)
    if (token.rawType === 'T_DATO') {
      const typeToken = consume();
      const idToken = expect('T_ID', "Se esperaba un nombre para la variable.");
      
      if (!idToken) {
        synchronize();
        continue;
      }

      // Semántico: ¿Ya existe?
      if (symbolTable[idToken.value]) {
        semanticErrors.push({
          order: semanticErrors.length + 1,
          value: idToken.value,
          description: `La variable '${idToken.value}' ya ha sido declarada.`,
          suggestion: "Use un nombre diferente o elimine la declaración duplicada."
        });
      } else {
        symbolTable[idToken.value] = typeToken.value;
      }

      const next = peek();
      if (next && next.rawType === 'T_ASIGNACION') {
        consume(); // '='
        // Procesar expresión hasta el ';'
        processExpression(typeToken.value);
      }

      expect('T_FIN', "Falta el punto y coma ';' al final de la declaración.");
    } 
    
    // REGLA: Asignación (x = y + 5;)
    else if (token.rawType === 'T_ID') {
      const idToken = consume();
      const varType = symbolTable[idToken.value];
      
      // Semántico: ¿Declarada?
      if (!varType) {
        semanticErrors.push({
          order: semanticErrors.length + 1,
          value: idToken.value,
          description: `La variable '${idToken.value}' no ha sido declarada.`,
          suggestion: `Declare la variable primero (ej: entero ${idToken.value};)`
        });
      }

      const assign = expect('T_ASIGNACION', "Se esperaba '=' para asignar un valor.");
      if (assign) {
        processExpression(varType || 'unknown');
      }
      expect('T_FIN', "Falta el punto y coma ';' al final de la asignación.");
    }

    // REGLA: Bloques (Permitir llaves sin forzar nada en su interior todavía)
    else if (token.rawType === 'T_LLAVE_ABRE' || token.rawType === 'T_LLAVE_CIERRA') {
      consume();
    }

    // REGLA: Paréntesis (Pueden venir de expresiones mal cortadas o mal formadas)
    else if (token.rawType === 'T_PAR_ABRE' || token.rawType === 'T_PAR_CIERRA') {
        consume();
    }

    else {
      syntacticErrors.push({
        order: syntacticErrors.length + 1,
        value: token.value,
        description: `Estructura inesperada: '${token.value}'.`,
        suggestion: "Verifique si el orden de los elementos es correcto."
      });
      consume();
    }
  }

  function processExpression(expectedType) {
    let hasBooleanOp = false;
    let firstLiteralOrId = null;
    const expressionTokens = [];

    while (current < filteredTokens.length && 
           filteredTokens[current].rawType !== 'T_FIN' && 
           filteredTokens[current].rawType !== 'T_LLAVE_CIERRA') {
      const t = consume();
      expressionTokens.push(t);
      
      // Detectar si la expresión dará un resultado lógico
      if (t.rawType === 'T_OP_REL' || t.rawType === 'T_OP_LOG') {
        hasBooleanOp = true;
      }

      // Semántico: Validar identificadores dentro de la expresión
      if (t.rawType === 'T_ID') {
        if (!symbolTable[t.value]) {
          semanticErrors.push({
            order: semanticErrors.length + 1,
            value: t.value,
            description: `Variable '${t.value}' no declarada en esta expresión.`,
            suggestion: "Asegúrese de declarar todas las variables antes de usarlas."
          });
        }
        if (!firstLiteralOrId) firstLiteralOrId = t;
      }

      if (!firstLiteralOrId && ['T_ENTERO', 'T_DECIMAL', 'T_TEXTO', 'T_LOGICO'].includes(t.rawType)) {
        firstLiteralOrId = t;
      }
    }

    // Inferencia de tipo final de la expresión
    if (expectedType !== 'unknown' && expressionTokens.length > 0) {
      let inferredType = 'unknown';

      if (hasBooleanOp) {
        inferredType = 'logico';
      } else if (firstLiteralOrId) {
        if (firstLiteralOrId.rawType === 'T_ID') {
          inferredType = symbolTable[firstLiteralOrId.value] || 'unknown';
        } else {
          // Mapear rawType a tipo lógico (T_ENTERO -> entero, etc.)
          const map = {
            'T_ENTERO': 'entero',
            'T_DECIMAL': 'decimal',
            'T_TEXTO': 'texto',
            'T_LOGICO': 'logico'
          };
          inferredType = map[firstLiteralOrId.rawType] || 'unknown';
        }
      }

      if (inferredType !== 'unknown') {
        validateTypeConsistency(expectedType, inferredType, expressionTokens[0]?.value || 'expresión', semanticErrors);
      }
    }
  }


  return { syntacticErrors, semanticErrors };
}

function validateTypeConsistency(expectedType, actualType, contextValue, semanticErrors) {
  let isCompatible = false;

  if (expectedType === actualType) isCompatible = true;
  else if (expectedType === 'decimal' && actualType === 'entero') isCompatible = true; // entero cabe en decimal
  else if (actualType === 'unknown') isCompatible = true; // Evitar errores en cascada

  if (!isCompatible) {
    semanticErrors.push({
      order: semanticErrors.length + 1,
      value: contextValue,
      description: `Incompatibilidad de tipos: No se puede asignar un resultado de tipo '${actualType}' a una variable de tipo '${expectedType}'.`,
      suggestion: `Asegúrese de que la expresión resulte en un valor compatible con '${expectedType}'.`
    });
  }
}
