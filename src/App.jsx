import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import UpdateData from "./pages/UpdateData";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import LandingScreen from "./pages/LandingScreen";
function App() {
  return (
    <div className="container">
      <ParticleBackground />
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updatedata" element={<UpdateData />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/success" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
