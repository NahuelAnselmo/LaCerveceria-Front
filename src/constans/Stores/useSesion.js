import { create } from "zustand";
import { decodeJWT } from "../../utilities/decodeJWT";

export const useSession = create((set) => {
  
  const token = localStorage.getItem("token");
  let user = null;
  let isLoggedIn = false;

  if (token && token !== "undefined" && token !== "null") {
    try {
      const userData = decodeJWT(token).user;
      user = userData;
      isLoggedIn = true;
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
    }
  }

  return {
    user,
    isLoggedIn,
    login: (newToken) => {
      try {
        localStorage.setItem("token", newToken); 
        const userData = decodeJWT(newToken).user;
        set({ user: userData, isLoggedIn: true });
        console.log("Login exitoso. isLoggedIn debe ser true ahora.");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, isLoggedIn: false });
    },
  };
});
