import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { SiGoogle, SiGithub } from "react-icons/si";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const response = await axios.post(
        "http://192.168.100.171:5555/user/login",
        { email, password }
      );
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      alert("Service Error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="bg-white shadow-md rounded-lg px-8 py-8 w-96 mb-14">
        <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">
          Welcome Back!
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
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="pl-10 pr-3 py-2 w-full border-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log In
            </button>
            <div className="mt-4 text-center">
              <button
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto sm:ml-12"
                onClick={() => props.onFormSwitch("login")}
              >
                <SiGoogle className="text-white mr-2" />
                Continue with Google
              </button>
            </div>
            <div className="mt-2 text-center">
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto sm:ml-12">
                <SiGithub className="text-white mr-2" />
                Continue with GitHub
              </button>
            </div>
          </div>
          <div className="text-center">
            <button
              className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
              onClick={() => props.onFormSwitch("forgotPassword")}
            >
              Forgot password?
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-black text-sm focus:outline-none"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </div>
  );
};
