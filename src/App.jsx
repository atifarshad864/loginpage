import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UpdateData from "./pages/UpdateData";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { Login } from "./pages/Login";

function App() {
  return (
    <div className="container">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="updatedata" element={<UpdateData />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
