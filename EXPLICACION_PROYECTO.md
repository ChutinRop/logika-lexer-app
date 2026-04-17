# Proyecto: LÓGIKA Lexer - Guía de Explicación y Presentación

Este documento sirve como base técnica y narrativa para explicar el proyecto a una audiencia externa y proporciona instrucciones detalladas sobre el funcionamiento interno del software.

---

## 🚀 GUÍA PARA LA EXPOSICIÓN (PASO A PASO)

Si vas a presentar este código, la clave es dividirlo en las **3 fases del análisis de lenguajes** que implementamos:

### 1. Fase Léxica (El Diccionario)
*   **Qué es:** El programa "lee" el texto carácter por carácter y lo agrupa en palabras con significado (tokens).
*   **Cómo funciona:** Usamos **Expresiones Regulares (Regex)** en `lexer.js`. Cada vez que el programa encuentra un grupo de letras que coincide con un patrón (ej. `/^[0-9]+/` para números), genera un objeto llamado "Token".
*   **Errores Léxicos:** Ocurren cuando el programa encuentra un carácter que no está en ninguna de nuestras reglas (ej. un símbolo extraño como `$`).

### 2. Fase Sintáctica (La Gramática)
*   **Qué es:** Validamos que el orden de las palabras tenga sentido según las reglas del lenguaje LÓGIKA.
*   **Cómo funciona:** En `parser.js`, usamos un puntero que recorre los tokens. El programa tiene "expectativas": si lee la palabra `entero`, **espera** que lo siguiente sea un nombre de variable. Si no lo es, genera un error.
*   **Errores Sintácticos:** Ocurren por estructuras incompletas o mal ordenadas (ej. `entero x = ;` o `x entero;`).

### 3. Fase Semántica (La Coherencia)
*   **Qué es:** Validamos que el código tenga sentido lógico. No solo que esté bien escrito, sino que sea coherente.
*   **Cómo funciona:** Usamos una **Tabla de Símbolos** (un objeto interno que guarda los nombres y tipos de las variables).
*   **Errores Semánticos:**
    *   **Tipos:** Intentar meter un texto en un entero.
    *   **Existencia:** Usar una variable que nunca declaraste.
    *   **Duplicados:** Declarar dos veces la misma variable.

---

## 🔍 PROFUNDIDAD TÉCNICA: ¿CÓMO SE DETECTAN LOS ERRORES?

Si el profesor te pregunta: **"¿Cómo sabe el programa que hay un error?"**, aquí tienes la respuesta técnica:

1.  **En el Lexer:** Tenemos un bucle `while`. Si después de intentar todas las expresiones regulares (Regex) nada coincide, el programa "se rinde" con ese carácter, lo guarda como un error léxico y sigue adelante.
2.  **En el Parser (Sintaxis):** Usamos una función llamada `expect(tipo)`. Esta función mira el siguiente token: si coincide con lo que esperamos, seguimos; si no, añadimos un error a la lista de "Errores Sintácticos" y usamos una técnica llamada **Sincronización** para saltar al siguiente punto y coma `;` y seguir analizando el resto del código.
3.  **En la Semántica:** Cuando el Parser encuentra un valor (ej. `x = 10`), mira en su **Tabla de Símbolos**. Si `x` fue guardada previamente como `logico`, pero `10` es un número, lanza una alerta de **Incompatibilidad de Tipos**.

---

## 📄 EJEMPLOS CRÍTICOS PARA LA DEMOSTRACIÓN

| Tipo de Error | Código de Ejemplo | Explicación Técnica |
| :--- | :--- | :--- |
| **Léxico** | `entero @valor = 10;` | El carácter `@` no está definido en el archivo `lexer.js`. |
| **Sintáctico** | `entero x 10;` | El Parser esperaba un `=` o un `;` después de `x`, pero encontró un número. |
| **Semántico** | `texto t = 50;` | El Parser detecta que `50` es un entero, pero la tabla de símbolos dice que `t` debe ser texto. |

---

## 📝 PROMPT PARA GENERAR DIAPOSITIVAS
> "Genera una presentación de 6 diapositivas sobre un compilador del lenguaje LÓGIKA. Diapositiva 1: Portada. Diapositiva 2: Análisis Léxico con Regex. Diapositiva 3: Análisis Sintáctico y gramática. Diapositiva 4: Análisis Semántico y Tabla de Símbolos. Diapositiva 5: Manejo y visualización de errores en React. Diapositiva 6: Conclusión."
