import { create } from "zustand";
import { decodeJWT } from "../../utilities/decodeJWT";

export const useSession = create((set) => {

  const token = sessionStorage.getItem("token");
  let user = null;
  let isLoggedIn = false;

  if (token) {
    try {
      const userData = decodeJWT(token).user;
      user = userData;
      isLoggedIn = true;
    } catch (error) {
      console.error("Error decoding token:", error);
      sessionStorage.removeItem("token");
    }
  }

  return {
    user,
    isLoggedIn,
    login: (newUser) => {
      sessionStorage.setItem("token", newUser.token); // Asegúrate de que el token se guarda correctamente
      set({ user: newUser, isLoggedIn: true });
    },
    logout: () => {
      sessionStorage.removeItem("token");
      set({ user: null, isLoggedIn: false });
    },
  };
});
