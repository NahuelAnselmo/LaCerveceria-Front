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
import EditUserView from "../Views/routing/EditUserView"; 
import MenuView from "../Views/routing/MenuView";
import PublicMenuView from "../Views/routing/PublicMenuView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />, 
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
            path: "public-menu",
            element: <PublicMenuView />, 
          },
        ],
      },
      {
        path: "user",
        element: <PrivateView />, 
        children: [
          {
            path: "edit",
            element: <EditUserView />, 
          },
          {
            path: "menu",
            element: <MenuView />, 
          },
        ],
      },
      {
        path: "admin",
        element: <PrivateView />, 
        children: [
          {
            path: "",
            element: <AdminView />, 
          },

        ],
      },
    ],
  },
  {
    path: "/", 
    element: <AuthLayout />, 
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