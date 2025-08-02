import { BASE_API_URL } from "./../config/config.js";


export async function sendForm(form, ruta, options = {}) {
  if (!form || !ruta) {
    throw new Error("Formulario o ruta no proporcionados");
  }

  const method = form.getAttribute("method").toUpperCase() || "POST";
  const formData = new FormData(form);

  try {
    const response = await fetch(`${BASE_API_URL}${ruta}`, {
      method: method,
      body: formData,
      headers: {
        ...options.headers,
      },
    });

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      const error = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      throw new Error(error.message || "Error en la solicitud.");
    }

    return contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
