import { decodeJWT } from "../utilities/decodeJWT";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postLoginFn = async (data) => {
  try {
    console.log("Iniciando solicitud al backend en:", BACKEND_URL);

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Ocurrió un error al iniciar sesión");
    }

    // Obtener los datos de la respuesta solo una vez
    const resData = await res.json();
    console.log("Datos de respuesta del servidor:", resData);

    // Asegúrate de estar accediendo al token correctamente
    const token = resData?.data?.token || resData?.token;
    if (!token || token === "undefined" || token === "null") {
      throw new Error("Token inválido. No se puede almacenar.");
    }

    // Almacenar el token en localStorage
    localStorage.setItem("token", token);
    console.log("Token almacenado en localStorage:", localStorage.getItem("token"));

    // Decodificar el token y obtener los datos del usuario
    const userData = decodeJWT(token)?.user;
    if (!userData) {
      throw new Error("Error al decodificar el token.");
    }
    console.log("Datos del usuario decodificados:", userData);

    return userData;
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    throw error;
  }
};


// Función para registrar usuarios
export const postRegisterFn = async (data) => {
  try {
    console.log("Iniciando solicitud de registro en:", BACKEND_URL);

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Ocurrió un error al crear el usuario");
    }

    console.log("Registro exitoso. Iniciando sesión automáticamente...");
    // Iniciar sesión automáticamente después del registro exitoso
    return await postLoginFn({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.error("Error en el proceso de registro:", error);
    throw error;
  }
};

// PUT REGISTER FUNCTION
export const putRegisterFn = async (userId, updatedData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error("Error en el backend:", errorResponse);
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = await res.json();
    return updatedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// GET by ID
export const fetchUserById = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching user:", errorData);
      throw new Error("Error al obtener el usuario");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in fetchUserById:", error);
    throw error;
  }
};

// GET REGISTER FUNCTION EMAIL CONTROL
export const checkEmailExists = async (email) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/check-email?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al verificar el correo");
    }

    const data = await res.json();
    return data.exists;
  } catch (error) {
    console.error("Error in checkEmailExists:", error);
    throw error;
  }
};
