import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Disclaimer from "../pages/disclaimer/Disclaimer";
import LegalResources from "../pages/legalResources/LegalResources";
import AttorneyTm from "../pages/attorneyTm/AttorneyTm";
import AttorneyDetails from "../pages/attorneyTm/AttorneyDetails";
import CreateAccount from "../pages/createAccount/CreateAccount";
import Login from "../pages/login/Login";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import OtpCode from "../pages/otpCode/OtpCode";
import { CreateNewPassword } from "../pages/createNewPassword/CreateNewPassword";
import PasswordSuccessfull from "../pages/passwordSuccessfull/PasswordSuccessfull";
import UserProfile from "../pages/profile/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import CommonLayout from "../pages/dashboard/commonLayout/CommonLayout";
import AddCategories from "../pages/dashboard/addCategories/AddCategories";
import ManageUser from "../pages/dashboard/manageUser/ManageUser";
import Seetings from "../pages/dashboard/settings/Seetings";
import DashboardPersonalInformation from "../pages/dashboard/settings/nestedRoute/DashboardPersonalInformation";
import DashboardAbout from "../pages/dashboard/settings/nestedRoute/DashboardAbout";
import DashboardDisclaimer from "../pages/dashboard/settings/nestedRoute/DashboardDisclaimer";
import DashboardLegalResources from "../pages/dashboard/settings/nestedRoute/DashboardLegalResources";
import DashboardLogin from "../pages/dashboard/dashboardAuthentication/dashboardLogin/DashboardLogin";
import DashboardForgetPassword from "../pages/dashboard/dashboardAuthentication/DashboardForgetPassword";
import DashboardCreateNewPassword from "../pages/dashboard/dashboardAuthentication/dashboardLogin/DashboardCreateNewPassword";
import DashboardCongratulation from "../pages/dashboard/dashboardAuthentication/dashboardLogin/DashboardCongratulation";
import DashboardOtpVerification from "../pages/dashboard/dashboardAuthentication/dashboardLogin/DashboardOtpVerification";


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
      {
        path: "/attorney-tm",
        element: <AttorneyTm />,
      },
      {
        path: "/attorney-tm-details/:id",
        element: <AttorneyDetails />,
      },
    ],
  },
  // footer hidden page
  {
    path: "/create-account",
    element: <CreateAccount />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />
  },
  {
    path: "/otp-code",
    element: <OtpCode />
  },
  {
    path: "/create-new-password",
    element: <CreateNewPassword />
  },
  {
    path: "/password-successfull",
    element: <PasswordSuccessfull />
  },
  {
    path: "/user-profile",
    element: <UserProfile />
  },
  // dashboard layout
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <CommonLayout />
      },
      {
        path: '/admin/dashboard/add-categories',
        element: <AddCategories />
      },
      {
        path: '/admin/dashboard/manage-user',
        element: <ManageUser />
      },

      {
        path: '/admin/dashboard/setting',
        element: <Seetings />,
        children: [
          {
            path:"personal-information",
            element:<DashboardPersonalInformation />
          },
          {
            path:"about-us",
            element:<DashboardAbout />
          },
          {
            path:"disclai-mer",
            element:<DashboardDisclaimer />
          },
          {
            path:"legal-re-sources",
            element:<DashboardLegalResources />
          },
        ],
      },
    ],
  },
  //=================== Dashboard Authentication ================
{
  path:'/admin/dashboard/login',
  element:<DashboardLogin />
},
{
  path:'/admin/dashboard/forget-password',
  element:<DashboardForgetPassword />
},
{
  path:'/admin/dashboard/otp-verification',
  element:<DashboardOtpVerification />
},
{
  path:'/admin/dashboard/create-new-password',
  element:<DashboardCreateNewPassword />
},
{
  path:'/admin/dashboard/congratulation',
  element:<DashboardCongratulation />
},

]);

export default router;