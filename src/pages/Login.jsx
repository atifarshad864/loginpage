import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { SiGoogle } from "react-icons/si";
import axios from "axios";

export const Login = (props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.100.171:3000/user/login",
        { email, password }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      alert("Service Error");
      console.error(error);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword");
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      window.open("http://192.168.100.171:3000/auth/google", "_self");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/dashboard");
    }
  }, [token]);

  let message = null;
  if (token !== null) {
    message = <h2>Token = {token}</h2>;
  } else if (error !== null) {
    message = <h2>Error = {error}</h2>;
  }

  return (
    <>
      <div className="flex justify-center items-center max-h-screen ml-9">
        <div className="bg-white shadow-md rounded-lg px-8 py-8 w-full max-w-md mb-14">
          <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">
            Welcome Back!
            <br />
            {message}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  <FiMail />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  className="pl-10 pr-3 py-2 w-full border-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  <FiLock />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  className="pl-10 pr-3 py-2 w-full border-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Log In
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto sm:ml-12"
              >
                <SiGoogle className="text-white mr-2" />
                Continue with Google
              </button>
            </div>
            <div className="text-center flex flex-col mt-4">
              <button
                className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </button>
              <button
                className="text-black text-sm mt-4 focus:outline-none"
                onClick={() => props.onFormSwitch("register")}
              >
                Don't have an account? Register here.
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
