# Agencia AIZ - Inteligencia Estratégica con IA

Esta es una aplicación web de una sola página (SPA) construida con React, TypeScript y Vite, diseñada para generar perspectivas estratégicas de negocio utilizando la API de Google Gemini. La aplicación permite a los usuarios introducir un tema y recibir 50 perspectivas únicas y detalladas, organizadas en estrategia, tácticas y acciones.

## ✨ Características Principales

- **Generación de Estrategias por IA**: Utiliza el modelo `gemini-2.5-flash` para crear contenido estratégico relevante y creativo.
- **Interfaz Moderna**: UI limpia y responsiva construida con React y Tailwind CSS.
- **Inicio de Sesión Simulado**: Una pantalla de login para simular el acceso a un panel de control.
- **Historial Persistente**: Guarda todas las generaciones en el `localStorage` del navegador, permitiendo a los usuarios revisar informes pasados.
- **Agrupación de Historial**: El historial se agrupa por mes para una fácil navegación.
- **Descarga de Datos**: Permite descargar los informes generados en formato JSON.
- **Despliegue Seguro**: La lógica de la API de Gemini se maneja a través de una Serverless Function de Vercel para proteger la `API_KEY`.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS
- **API de IA**: Google Gemini (`@google/genai`)
- **Iconos**: Lucide React
- **Hosting**: Vercel
- **Componentes**: Componentes reutilizables para Cards, Spinners, etc.
- **Hooks**: Hooks personalizados (`useLocalStorage`) para un manejo de estado eficiente.

## 🚀 Despliegue en Vercel

Esta aplicación está configurada para un despliegue sencillo en Vercel.

1.  **Fork/Clona este repositorio y súbelo a tu cuenta de GitHub.**
2.  **Importa el proyecto en Vercel.** Vercel detectará automáticamente que es un proyecto Vite.
3.  **Configura las Variables de Entorno.** Ve a `Settings` > `Environment Variables` en tu proyecto de Vercel y añade la siguiente variable:
    -   `API_KEY`: Tu clave de la API de Google Gemini. **¡IMPORTANTE: NO SUBAS TU CLAVE A GITHUB!**

Cada vez que hagas un `push` a la rama `main`, Vercel desplegará automáticamente los cambios.

## ⚙️ Desarrollo Local

Para ejecutar este proyecto en tu máquina local de forma que la generación con IA funcione:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/AgenciaAiz/IA-Estrategica.git
    cd IA-Estrategica
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
    Este comando instalará todas las librerías necesarias, incluyendo `vercel` como dependencia de desarrollo.

3.  **Crea un archivo de entorno local**:
    Crea un archivo llamado `.env.local` en la raíz de tu proyecto. Este archivo es ignorado por Git y nunca se subirá a GitHub. Dentro de este archivo, añade tu clave de API:
    ```
    API_KEY=tu_clave_secreta_de_google_aqui
    ```

4.  **Ejecuta el servidor de desarrollo con Vercel**:
    Para simular el entorno de Vercel (incluyendo las funciones serverless de la carpeta `/api`), usaremos `npx` para ejecutar la CLI de Vercel.
    ```bash
    npx vercel dev
    ```
    Este comando iniciará tu aplicación, leerá tu archivo `.env.local` y hará que el endpoint `/api/generate` funcione en tu máquina local. Abre la URL que te indique en la terminal (usualmente `http://localhost:3000`).
