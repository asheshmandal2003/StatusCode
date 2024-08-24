import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Pages/HomePage";
import Dashboard from "./components/Pages/DashboardPage";
import FindDonorsPage from "./components/Pages/FindDonorsPage";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to={<Login />} />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={<Home />} />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to={<Home />} />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to={<Login />} />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to={<Login />} />}
      />
      <Route
        path="/find-donors"
        element={user ? <FindDonorsPage /> : <Navigate to={<Login />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
