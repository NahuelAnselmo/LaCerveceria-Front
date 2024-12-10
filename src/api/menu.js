const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getMenuFn = async () => {
    const res= await fetch (`${BACKEND_URL}/api/v1/products`);
    const data = await res.json();

    if (!res.ok){
        throw new Error ('Ocurrió un error leyendo las entradas del menu');
        }
    return data; 
};