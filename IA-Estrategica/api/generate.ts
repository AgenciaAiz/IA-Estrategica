import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic } = request.body;

  if (!topic) {
    return response.status(400).json({ error: 'Topic is required' });
  }

  if (!process.env.API_KEY) {
    return response.status(500).json({ error: 'API_KEY environment variable not set on server' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Eres un consultor experto en estrategia empresarial e innovación. Para el siguiente tema: "${topic}", genera exactamente 50 perspectivas estratégicas únicas y aleatorias.
    Asegúrate de que las perspectivas sean diversas, creativas y cubran una amplia gama de posibilidades, incluyendo marketing, operaciones, tecnología, finanzas y recursos humanos.
  `;
  
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        perspective_id: { type: Type.INTEGER, description: 'ID numérico de la perspectiva, del 1 al 50.' },
        title: { type: Type.STRING, description: 'Un título conciso y creativo para la perspectiva.' },
        layer1_strategy: { type: Type.STRING, description: 'Una visión estratégica de alto nivel. El "qué" y el "porqué".' },
        layer2_tactics: { type: Type.STRING, description: 'Tácticas específicas para implementar la estrategia. El "cómo".' },
        layer3_actions: { type: Type.STRING, description: 'Tres pasos concretos y accionables para ejecutar las tácticas. La "lista de tareas".' }
      },
      required: ['perspective_id', 'title', 'layer1_strategy', 'layer2_tactics', 'layer3_actions']
    }
  };

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonStr = result.text.trim();
    const parsedData = JSON.parse(jsonStr);
    
    return response.status(200).json(parsedData);

  } catch (error) {
    console.error("Error al generar perspectivas desde la API de Vercel:", error);
    return response.status(500).json({ error: "Falló la generación de perspectivas estratégicas desde la IA." });
  }
}
