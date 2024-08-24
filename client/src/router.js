import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Pages/HomePage";
import Dashboard from "./components/Pages/DashboardPage";
import FindDonorsPage from "./components/Pages/FindDonorsPage";

const AppRoutes = () => {
  const { isAuthenticated, isProfileComplete } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} /> */}

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={isProfileComplete ? "/dashboard" : "/profile"} />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to={isProfileComplete ? "/dashboard" : "/profile"} />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            isProfileComplete ? (
              <Dashboard />
            ) : (
              <Navigate to="/profile" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/find-donors" element={<FindDonorsPage />} />
    </Routes>
  );
};

export default AppRoutes;
