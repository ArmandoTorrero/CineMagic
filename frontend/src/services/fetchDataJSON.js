

/**
 *Función que envia información al backend y este le devuelve un JSON
 *
 * @export
 * @param {*} url
 * @param {*} [data={}]
 * @param {*} [opciones={}]
 * @return {*} 
 */
export async function fetchDataJSON(url, data = {}, opciones = {}) {
  try {
    const response = await fetch(`${url}`, {
      method: opciones.method || "POST",
      headers: {
        "Content-Type": "application/json",
        ...(opciones.headers || {}),
      },
      body: JSON.stringify(data),
      ...opciones,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}