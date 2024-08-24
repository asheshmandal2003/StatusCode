import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Pages/HomePage";
import FindDonorsPage from './components/Pages/FindDonorsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/find-donors" element={<FindDonorsPage />} />
  </Routes>
);

export default AppRoutes;
