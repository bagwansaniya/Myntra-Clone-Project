import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Bag from "./routes/bag.jsx";
import HomeItems from "./routes/Homeitems.jsx";
import myntrastore from "./store/index.js";
import ProfileComponent from "./components/ProfileComponent.jsx";
import App1 from "./routes/App1.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "/app1",
    element: <App1 />,
    children: [
      { path: "/app1", element: <HomeItems /> },
      { path: "/app1/bag", element: <Bag /> },
      { path: "/app1/profile", element: <ProfileComponent /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myntrastore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
