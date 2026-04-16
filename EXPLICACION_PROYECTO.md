# Proyecto: LÓGIKA Lexer - Guía de Explicación y Presentación

Este documento sirve como base técnica y narrativa para explicar el proyecto a una audiencia externa (clase, tutor o cliente) y proporciona instrucciones estructuradas para que una IA genere una presentación visual.

---

## 🚀 GUÍA PARA LA EXPOSICIÓN (PASO A PASO)

Si vas a presentar este código, la clave es dividirlo en las **3 fases del análisis de lenguajes** que implementamos:

### 1. Fase Léxica (El Diccionario)
*   **Qué explicar:** Es el nivel más básico. El programa "lee" el texto carácter por carácter y lo agrupa en palabras con significado (tokens).
*   **En el código:** Muestra `lexer.js`. Explica que usamos **Expresiones Regulares (Regex)** para definir qué es un número, qué es un texto y qué es una palabra reservada (como `entero`).
*   **Ejemplo para mostrar:** Escribe `entero x = 10;`. Muestra cómo la tabla de tokens lo separa en: `T_DATO`, `T_ID`, `T_ASIGNACION`, `T_ENTERO` y `T_FIN`.

### 2. Fase Sintáctica (La Gramática)
*   **Qué explicar:** Aquí validamos que el orden de las palabras tenga sentido. No es lo mismo decir `entero x = 10;` (Correcto) que decir `10 = x entero;` (Incorrecto).
*   **En el código:** Muestra `parser.js`. Explica que usamos un **Analizador Sintáctico Descendente** que va "esperando" tokens en un orden específico.
*   **Ejemplo para mostrar:** Escribe `entero x = ;`. Verás que aparece un **Error Sintáctico** porque falta el valor después del `=`.

### 3. Fase Semántica (La Coherencia)
*   **Qué explicar:** Es la fase más inteligente. Aquí no vemos si está bien escrito, sino si tiene **sentido lógico**.
*   **En el código:** También está en `parser.js`. Usamos una **Tabla de Símbolos** para recordar qué variables ya declaramos y de qué tipo son.
*   **Reglas implementadas:**
    *   **Verificación de Existencia:** No puedes usar una variable que no hayas declarado antes.
    *   **Compatibilidad de Tipos:** No puedes guardar un `"texto"` en una variable de tipo `entero`.
*   **Ejemplo para mostrar:** Escribe `entero x = "hola";`. Verás un **Error Semántico** indicando que los tipos no coinciden.

---

## 🛠️ FICHA TÉCNICA
*   **Nombre:** LÓGIKA Compiler Frontend
*   **Stack:** React + Vite + Tailwind CSS.
*   **Lógica:** JavaScript puro para los motores de análisis.

---

## 📝 INSTRUCCIONES PARA LA IA (DIAPOSITIVAS)
Si quieres generar diapositivas automáticas, usa este prompt en ChatGPT o Claude:

> "Actúa como un experto en teoría de compiladores. Basándote en que mi proyecto 'LÓGIKA' implementa análisis léxico (con Regex), sintáctico (estructuras de control) y semántico (validación de tipos), genera un esquema de 6 diapositivas. Incluye una diapositiva para cada fase, un ejemplo de error para cada una y resalta que el frontend fue creado con React y Tailwind para una experiencia moderna."

---

## 📄 EJEMPLOS DE PRUEBA PARA LA CLASE

**Caso Ideal (Todo verde):**
```logika
entero edad = 20;
decimal pi = 3.14;
texto nombre = "Lógica";
{
  entero suma = edad + 5;
}
```

**Caso con Errores (Para lucirte explicando):**
```logika
entero x = "error"; // Error Semántico (Tipo incorrecto)
y = 10;              // Error Semántico (No declarada)
decimal z = ;        // Error Sintáctico (Falta valor)
$variable;           // Error Léxico (Carácter no permitido)
```
