import "./App.css";
import { RouterProvider } from "react-router-dom";
import { defaultRouter } from "./routes/defaultRoutes";
import { authorizedPatientsRoutes } from "./routes/authorizedPatientsRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { Provider } from "react-redux";
import store from "./store/index";

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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
