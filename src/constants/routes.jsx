import { createBrowserRouter } from "react-router-dom";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import RootView from "../Views/routing/RootView";
import HomePage from "../Views/routing/HomePageView";
import Error404View from "../Views/routing/Error404View";
import AdminView from "../Views/routing/AdminView";
import LoginPageView from "../Views/routing/LoginPageView";
import RegisterPageView from "../Views/routing/RegisterPageView";
import AuthLayout from "../components/AuthLayout/AuthLayout";

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
          {
            path: "admin",
            element: <AdminView />,
          },
        ],
      },
      {
        path: "admin",
        element: <PrivateView />,
        children: [
        ],
      },
    ],
  },
  {
    path: "/",  // Páginas de autenticación (sin header)
    element: <AuthLayout />,  // Envolvemos login y register en AuthLayout
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
