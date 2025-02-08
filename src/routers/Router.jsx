import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import About from "../pages/about/About";
import Disclaimer from "../pages/disclaimer/Disclaimer";
import LegalResources from "../pages/legalResources/LegalResources";
import CreateAccount from "../pages/createAccount/CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/legal-resources",
        element: <LegalResources />,
      },
    ],
  },
    // footer hidden page
    {
      path: "/create-account",
      element:<CreateAccount />
    },
]);

export default router;