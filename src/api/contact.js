const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postContacts = async (data) => {
  try {
    const res = await fetch(`${BACKEND_URL}/contact`, 
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error al enviar los datos');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Hubo un varios problemas con la solicitud', error);
    throw error;
  }
};

export const getContacts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/contact`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('Ocurrió un error leyendo los datos de contacto');
    }

    return data;
  } catch (error) {
    console.error('Hubo un problema con la solicitud', error);
    throw error;
  }
};
