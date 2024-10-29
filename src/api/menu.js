const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


// Función para actualizar el stock de un producto
export const updateStockFn = async (productId, quantity) => {
    const response = await fetch(`${BACKEND_URL}/products/${productId}/update-stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar el stock");
    }
  
    return response.json();
  };

export const getMenuFn = async () => {
    const res= await fetch (`${BACKEND_URL}/products`);
    const data = await res.json();

    if (!res.ok){
        throw new Error ('Ocurrió un error leyendo las entradas del menu');
        }
    return data; 
};