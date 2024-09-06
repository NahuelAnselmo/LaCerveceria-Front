import { decodeJWT } from "../utilities/decodeJWT";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const postLoginFn = async (data) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data, res);

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    throw new Error("Respuesta vacía del servidor");
  }

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Ocurrió un error");
  }

  const token = resData.data;

  if (!token) {
    throw new Error(resData.message || "Ocurrió un error");
  }

  const userData = decodeJWT(token).user;

  sessionStorage.setItem("token", token);

  return userData;
};


export const postRegisterFn = async (data) => {
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      dni: data.dni,
      email: data.email,
      password: data.password,
    }),
  });

  if (!res.ok) {
    throw new Error("Ocurrió un error al crear el usuario");
  }

  const userData = await postLoginFn({
    email: data.email,
    password: data.password,
  });

  return userData;
};

// PUT REGISTER FUNTION
export const putRegisterFn = async ([userId, updatedData]) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

// GET REGISTER FUNTION EMAIL CONTROL
export const checkEmailExists = async (email) => {
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
};