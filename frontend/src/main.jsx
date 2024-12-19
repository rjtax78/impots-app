import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Contributeurs from "./pages/Contributeurs";
import Paiements from "./pages/Paiements";
import RendezVous from "./pages/RendezVous";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="" element={<PrivateRoute />}>
          <Route index={true} path="/" element={<Dashboard />} />
          <Route path="/contributeurs" element={<Contributeurs />} />
          <Route path="/paiements" element={<Paiements />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
        </Route>
      </Route>
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/login-page" element={<LoginPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
