import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Pages/HomePage";
import Dashboard from "./components/Pages/DashboardPage";
import FindDonorsPage from "./components/Pages/FindDonorsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/find-donors" element={<FindDonorsPage />} />
    </Routes>
  );
};

export default AppRoutes;
