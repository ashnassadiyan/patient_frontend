import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Admin/Dashboard/Dashboard.jsx";
import Verify from "../pages/Verify/Verify.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import AdminLayout from "../Layouts/AdminLayout.jsx";
import Doctors from "../pages/Admin/Doctors";
import Appointments from "../pages/Admin/Appointments";
import AddDoctors from "../pages/Admin/Doctors/AddDoctors";
import EditDoctors from "../pages/Admin/Doctors/Edit/EditDoctors";
import DoctorAvialability from "../pages/Admin/Avialability/DoctorAvialability";
import AddAvailability from "../pages/Admin/Avialability/AddAvailability";
import Patients from "../pages/Admin/Patients/Patients";
import FAQ from "../pages/FAQ";

export const adminRoutes = createBrowserRouter([
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
    element: <FAQ />,
    path: "/faq",
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/doctors",
        element: <Doctors />,
      },
      {
        path: "/admin/patients",
        element: <Patients />,
      },
      {
        path: "/admin/doctors/add",
        element: <AddDoctors />,
      },
      {
        path: "/admin/doctors/edit/:id",
        element: <EditDoctors />,
      },
      {
        path: "/admin/doctors/availability/:id",
        element: <DoctorAvialability />,
      },
      {
        path: "/admin/doctors/availability/add/:id",
        element: <AddAvailability />,
      },

      {
        path: "/admin/appoinments",
        element: <Appointments />,
      },

      {
        element: <PageNotFound />,
        path: "*",
      },
    ],
  },
]);
