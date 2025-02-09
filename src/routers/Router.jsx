import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import About from "../pages/about/About";
import Disclaimer from "../pages/disclaimer/Disclaimer";
import LegalResources from "../pages/legalResources/LegalResources";
import CreateAccount from "../pages/createAccount/CreateAccount";
import Login from "../pages/login/Login";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import OtpCode from "../pages/otpCode/OtpCode";
import { CreateNewPassword } from "../pages/createNewPassword/CreateNewPassword";
import PasswordSuccessfull from "../pages/passwordSuccessfull/PasswordSuccessfull";

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
    {
      path: "/login",
      element:<Login />
    },
    {
      path: "/forget-password",
      element:<ForgetPassword />
    },
    {
      path: "/otp-code",
      element:<OtpCode />
    },
    {
      path: "/create-new-password",
      element:<CreateNewPassword />
    },
    {
      path: "/password-successfull",
      element:<PasswordSuccessfull />
    },
]);

export default router;