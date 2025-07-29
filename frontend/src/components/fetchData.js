
/**
 *Función para hacer peticiones al backend y que este le devuelva información
 *
 * @export
 * @param {*} url
 * @param {*} [opciones={}]
 * @return {*} 
 */
export async function fetchData(url, opciones = {}) {
  try {
    const response = await fetch(`${url}`, opciones);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}