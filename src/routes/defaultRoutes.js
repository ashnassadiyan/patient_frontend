import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FAQ from "../pages/FAQ";
import PrivayPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsAndConditions";
import ForgetPassword from "../pages/ForgetPassword";

export const defaultRouter = createBrowserRouter([
  {
    element: <Landing />,
    path: "/",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <FAQ />,
    path: "/faq",
  },
  {
    element: <PrivayPolicy />,
    path: "/privacypolicy",
  },
  {
    element: <TermsConditions />,
    path: "/termsconditions",
  },
  {
    element: <ForgetPassword />,
    path: "/forgotpassword",
  },
]);
