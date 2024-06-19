import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import Verify from "../pages/Verify/Verify";
import PatientDashBoard from "../pages/Patient_Dashboard/PatientDashBoard";
import PatientLayout from "../Layouts/PatientLayout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import MyAppoinments from "../pages/MyAppointments/MyAppoinments";
import DiagnoseReports from "../pages/DiagnoseReports/DiagnoseReports";
import MyProfile from "../pages/MyProfile/MyProfile";
import Diagnose from "../pages/Diagnose/Diagnose";
import Instruction from "../pages/Instruction/Instruction";

export const authorizedPatientsRoutes = createBrowserRouter([
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
    element: <Verify />,
    path: "/verify",
  },

  {
    element: <PatientLayout />,
    children: [
      {
        path: "/patient/dashboard",
        element: <PatientDashBoard />,
      },
      {
        path: "/patient/myappoinments",
        element: <MyAppoinments />,
      },
      {
        path: "/patient/diagnosereports",
        element: <DiagnoseReports />,
      },
      {
        path: "/patient/diagnose",
        element: <Diagnose />,
      },
      {
        path: "/patient/instruction",
        element: <Instruction />,
      },
      {
        path: "/patient/myprofile",
        element: <MyProfile />,
      },
      {
        element: <PageNotFound />,
        path: "*",
      },
    ],
  },
]);
