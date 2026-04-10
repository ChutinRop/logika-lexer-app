# Proyecto: LÓGIKA Lexer - Guía de Explicación y Presentación

Este documento sirve como base técnica y narrativa para explicar el proyecto a una audiencia externa (clase, tutor o cliente) y proporciona instrucciones estructuradas para que una IA genere una presentación visual (diapositivas, landing page de presentación, etc.).

---

## 1. Ficha Técnica del Proyecto
*   **Nombre:** LÓGIKA Lexer
*   **Propósito:** Analizador léxico para el lenguaje de programación experimental "LÓGIKA".
*   **Stack Tecnológico:**
    *   **Frontend:** React 18+ (Vite)
    *   **Estilos:** Tailwind CSS (Arquitectura de diseño Glassmorphism).
    *   **Lógica:** JavaScript (Motores de Expresiones Regulares).

---

## 2. Conceptos Fundamentales (Para la Explicación)

### ¿Qué es un Analizador Léxico?
Es la primera fase de un compilador. Su función es leer el código fuente (texto plano) y agrupar los caracteres en unidades con significado llamadas **Lexemas**, clasificándolos en **Tokens**.

### El Lenguaje LÓGIKA
LÓGIKA es un lenguaje estructurado con reglas estrictas:
1.  **Tipado fuerte:** `entero`, `decimal`, `texto`, `logico`.
2.  **Identificadores:** Deben comenzar con una letra.
3.  **Operadores:** Incluye soporte para operaciones aritméticas, relacionales y lógicas.

---

## 3. Arquitectura del Código

### Lógica de Análisis (`src/logic/lexer.js`)
*   **Definición de Reglas:** Se usa un arreglo de objetos `RULES` donde cada uno contiene un tipo de token y su expresión regular asociada.
*   **Prioridad:** El orden en el arreglo importa. Por ejemplo, las palabras reservadas como `entero` se evalúan antes que los identificadores para evitar que `entero` sea clasificado como un nombre de variable.
*   **Manejo de Errores:** Si ningún regex coincide, el sistema extrae el lexema problemático y busca patrones conocidos para ofrecer una **sugerencia de corrección** (ej. "olvidaste cerrar las comillas").

### Componentes de Interfaz
*   **App.jsx:** Orquestador del estado (maneja el código de entrada y los resultados del análisis).
*   **TokenTable.jsx:** Renderiza los tokens identificados con un diseño limpio.
*   **ErrorTable.jsx:** Resalta los fallos léxicos con alertas visuales y sugerencias.

---

## 4. Guía para la Presentación (Storytelling)

Si vas a presentar este proyecto, sigue este orden:

1.  **Introducción (Slide 1):** Presenta el problema (la necesidad de entender cómo las máquinas "leen" código) y la solución (LÓGIKA Lexer).
2.  **Demostración en Vivo (Slide 2):** Abre la aplicación, usa un ejemplo del "ExampleSelector" y presiona "Analizar". Señala cómo el código se transforma en una tabla organizada.
3.  **El "Cerebro" (Slide 3):** Explica brevemente que detrás hay **Expresiones Regulares (Regex)**. Menciona que es como un "filtro" que clasifica palabras.
4.  **Manejo de Errores (Slide 4):** Provoca un error a propósito (ej. escribe `1variable` o `"hola`). Muestra cómo la herramienta no solo dice que está mal, sino que **ayuda al programador** indicando qué hacer.
5.  **Diseño (Slide 5):** Resalta que es una herramienta moderna (Glassmorphism, Modo Oscuro), no una consola aburrida.

---

## 5. Instrucciones para la IA (Presentación Automática)

*Si deseas que una IA genere diapositivas o contenido visual basado en este archivo, utiliza este prompt:*

> "Actúa como un experto en compiladores y diseño de UI. Basándote en el archivo 'EXPLICACION_PROYECTO.md', crea una estructura de 5 diapositivas para una presentación ejecutiva. Cada diapositiva debe tener un título impactante, 3 puntos clave y una sugerencia de imagen o gráfico visual (como un diagrama de flujo del lexer o un mockup de la tabla de tokens). Asegúrate de enfatizar el uso de React y Tailwind CSS para la modernidad del proyecto."

---

## 6. Ejemplos de Código LÓGIKA
Para demostrar el funcionamiento, usa estos fragmentos:

**Éxito:**
```logika
entero edad = 20;
logico esMayor = verdadero;
texto mensaje = "Bienvenido";
```

**Con Error (Para demostrar corrección):**
```logika
decimal 0.5valor = 10; // Error: ID comienza con número
texto error = "Sin cerrar; // Error: Comillas faltantes
```
