import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useGlobalContext } from "./contexts/GlobalContext.jsx";
import { NextUIProvider } from "@nextui-org/react";

// pages import
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Error from "./pages/Error.jsx";
import Services from "./pages/Services.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute
import NonProtectedRoute from "./components/NonProtectedRoute.jsx";
import OTPPage from "./pages/OTPPage.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "scholarships",
        element: <Scholarships />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "landing-page",
        element: <Landing />,
      },
      {
        path: "verify-otp",
        element: <OTPPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
 
    <RouterProvider router={router} />

);
