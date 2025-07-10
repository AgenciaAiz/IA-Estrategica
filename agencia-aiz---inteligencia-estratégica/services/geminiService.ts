import { GoogleGenAI } from "@google/genai";
import { StrategicPerspective } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateStrategicPerspectives = async (topic: string): Promise<StrategicPerspective[]> => {
  const prompt = `
    Eres un consultor experto en estrategia empresarial e innovación. Para el siguiente tema: "${topic}", genera exactamente 50 perspectivas estratégicas únicas y aleatorias.
    Devuelve la respuesta como un array JSON válido. Cada objeto en el array debe representar una única perspectiva y tener la siguiente estructura estricta:
    {
      "perspective_id": number (del 1 al 50),
      "title": "Un título conciso y creativo para la perspectiva",
      "layer1_strategy": "Una visión estratégica de alto nivel. El 'qué' y el 'porqué'.",
      "layer2_tactics": "Tácticas específicas para implementar la estrategia. El 'cómo'.",
      "layer3_actions": "Tres pasos concretos y accionables para ejecutar las tácticas. La 'lista de tareas'."
    }
    Asegúrate de que las perspectivas sean diversas, creativas y cubran una amplia gama de posibilidades, incluyendo marketing, operaciones, tecnología, finanzas y recursos humanos. No incluyas ningún texto introductorio, solo el array JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
        topP: 0.95,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      // Basic validation of the first item's structure
      const firstItem = parsedData[0];
      if ('perspective_id' in firstItem && 'title' in firstItem && 'layer1_strategy' in firstItem) {
        return parsedData as StrategicPerspective[];
      }
    }
    
    throw new Error("La estructura de datos recibida de la API no es válida.");

  } catch (error) {
    console.error("Error al generar perspectivas:", error);
    throw new Error("Falló la generación de perspectivas estratégicas desde la IA. Por favor, revisa la consola para más detalles.");
  }
};

export default generateStrategicPerspectives;