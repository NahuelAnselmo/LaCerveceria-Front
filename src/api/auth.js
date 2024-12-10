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


    const resData = await res.json();
    console.log("Datos de respuesta del servidor:", resData);


    const token = resData?.data?.token || resData?.token;
    if (!token || token === "undefined" || token === "null") {
      throw new Error("Token inválido. No se puede almacenar.");
    }


    localStorage.setItem("token", token);
    console.log("Token almacenado en localStorage:", localStorage.getItem("token"));

 
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

    return await postLoginFn({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.error("Error en el proceso de registro:", error);
    throw error;
  }
};


export const putRegisterFn = async (userId, updatedData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, {
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

export const fetchUserById = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/users/${id}`, {
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


export const checkEmailExists = async (email) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/users/check-email?email=${email}`, {
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


export const putEditUserFn = async (userId, updatedData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/edit/${userId}`, {
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
