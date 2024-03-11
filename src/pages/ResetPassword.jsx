import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/buttons/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { inputField } from "../utils/commonStyles";
const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const handleResetPasswordToken = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("resetToken", token);
        setResetToken(token);
      }
    };

    handleResetPasswordToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(resetPassword);
      console.log(localStorage.getItem("resetToken"));
      const token = localStorage.getItem("resetToken");
      const response = await axios.post(
        "http://localhost:3001/user/resetpassword",
        { token, newpassword: resetPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Password Successfully Reset");
      window.location.href = "/";
    } catch (error) {
      alert("Service Error");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            type={passwordVisible ? "text" : "password"}
            placeholder="********"
            id="password"
            name="password"
            className={inputField.field}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            {passwordVisible ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="text-center mt-6">
          <Button type="submit">Reset Password</Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
