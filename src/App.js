import "./App.css";
import { RouterProvider } from "react-router-dom";
import { defaultRouter } from "./routes/defaultRoutes";
import { authorizedPatientsRoutes } from "./routes/authorizedPatientsRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { Provider } from "react-redux";
import store from "./store/index";
import CustomAlert from "./components/CustomAlerts/CustomAlert";
import { Backdrop } from "@mui/material";
import CustomLoader from "./components/CustomLoader/CustomLoader";

const App = () => {
  const user = JSON.parse(localStorage.getItem("osc-user"));
  let router = defaultRouter;

  if (user) {
    if (user.userType === "admin") {
      router = adminRoutes;
    } else {
      router = authorizedPatientsRoutes;
    }
  }

  return (
    <div className="App">
      <CustomLoader />
      <RouterProvider router={router} />
      <CustomAlert />
    </div>
  );
};

export default App;
