import { StrategicPerspective } from '../types';

const generateStrategicPerspectives = async (topic: string): Promise<StrategicPerspective[]> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido del servidor.' }));
      throw new Error(errorData.error || `Error del servidor: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if data is an array and either empty or the first item has the expected structure.
    if (Array.isArray(data)) {
        if (data.length === 0 || (data[0] && 'perspective_id' in data[0])) {
             return data as StrategicPerspective[];
        }
    }
    
    throw new Error("La estructura de datos recibida del servidor no es válida.");

  } catch (error) {
    console.error("Error al contactar el servicio de generación:", error);
    if (error instanceof Error) {
        throw new Error(`Falló la comunicación con el servicio de IA: ${error.message}`);
    }
    throw new Error("Ocurrió un error de red desconocido.");
  }
};

export default generateStrategicPerspectives;