const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createOrder = async (orderData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!res.ok) {
        throw new Error("Error al crear el pedido");
      }
  
      const newOrder = await res.json();
      return newOrder;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  