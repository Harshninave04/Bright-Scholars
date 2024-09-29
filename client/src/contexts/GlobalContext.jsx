import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SERVER_URL = "http://localhost:3000/api/auth";

// Create a Context for the global state
const GlobalContext = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleToast = (message, status) => {
    const toastType = {
      success: toast.success,
      error: toast.error,
    };

    if (toastType[status]) {
      toastType[status](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Signup function
  const signup = async (formData) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const user = response.data.user;
      const message = response.data.message;

      setUser(user);
      setMessage(message);
      setIsAuthenticated(true);

      handleToast("Signup successful!", "success");
      navigate("/verify-otp");
    } catch (err) {
      const errorMessage = err.response.data.message;
      setError(errorMessage);
      handleToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      const user = response.data.user;
      const message = response.data.message;

      setUser(user);
      setMessage(message);
      setIsAuthenticated(true);

      handleToast("Login successful!", "success");
      navigate("/");
    } catch (err) {
      const errorMessage = err.response.data.message;
      setError(errorMessage);
      handleToast(errorMessage, "error");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true });

      setUser(null);
      setIsAuthenticated(false);
      handleToast("Logout successful!", "success");

      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error in Logout";
      setError(errorMessage);
      handleToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Email Verification function
  const verifyEmail = async (code) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_URL}/verify-email`,
        { code },
        { withCredentials: true }
      );

      setUser(response.data.user);
      setIsAuthenticated(true);
      handleToast("Email verified successfully!", "success");

      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in email verification";
      setError(errorMessage);
      handleToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Check Auth Status function
  const checkAuth = async () => {
    setIsCheckingAuth(true);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/check-auth`, {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setError(
        err.response?.data?.message || "Error checking authentication status"
      );
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Forgot Password function
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(
        `${SERVER_URL}/forgot-password`,
        { email },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      handleToast(response.data.message || "Reset password email sent successfully!", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in password reset";
      setError(errorMessage);
      handleToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password function
  const resetPassword = async (token, password) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(
        `${SERVER_URL}/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      handleToast(response.data.message || "Password Reset Successful", "success");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in password reset";
      setError(errorMessage);
      handleToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    error,
    setError,
    isLoading,
    setIsLoading,
    isCheckingAuth,
    setIsCheckingAuth,
    message,
    setMessage,
    signup,
    login,
    verifyEmail,
    logout,
    checkAuth,
    forgotPassword,
    resetPassword,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
