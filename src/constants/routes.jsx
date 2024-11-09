import { createBrowserRouter } from "react-router-dom";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import RootView from "../Views/routing/RooTView";
import HomePage from "../Views/routing/HomePageView";
import Error404View from "../Views/routing/Error404View";
import AdminView from "../Views/routing/AdminView";
import LoginPageView from "../Views/routing/LoginPageView";
import RegisterPageView from "../Views/routing/RegisterPageView";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import EditUserView from "../Views/routing/EditUserView"; // Importamos la vista de editar usuario

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />, // Este contiene el header
    children: [
      {
        path: "/",
        element: <PublicView />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "menu",
            element: <></>,
          },
        ],
      },
      {
        path: "/user",
        element: <PrivateView />, // Para usuarios autenticados y administradores
        children: [
          {
            path: "edit",
            element: <EditUserView />, // Página para editar usuario
          },
        ],
      },
      {
        path: "/admin",
        element: <PrivateView />, // Solo para administradores (usando la lógica de diferenciación en PrivateView)
        children: [
          {
            path: "/admin",
            element: <AdminView />, // Página de administrador
          },
        ],
      },
    ],
  },
  {
    path: "/", // Páginas de autenticación (sin header)
    element: <AuthLayout />, // Envolvemos login y register en AuthLayout
    children: [
      {
        path: "login",
        element: <LoginPageView />,
      },
      {
        path: "register",
        element: <RegisterPageView />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404View />,
  },
]);
