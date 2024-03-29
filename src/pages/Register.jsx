import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiMapPin,
  FiCamera,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { SiGoogle } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";
import {
  spanStyles,
  iconStyles,
  labelStyles,
  inputField,
  addressField,
} from "../utils/commonStyles";
export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("null");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // do not restart the page
    if (!name || !email || !pass || !dob || !address) {
      setError("All fields are required.");
      return;
    }
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   setError("Invalid email format.");
    //   return;
    // }
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", pass);
      formData.append("dateofbirth", dob);
      formData.append("address", address);
      formData.append("image", profilePic);
      const response = await axios.post(
        // fetch data from api here
        "http://localhost:3001/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.status === "error") {
        if (response.data.error === "email already in use") {
          window.alert("Email already exists in the database.");
        } else {
          throw new Error(response.data.error); // Throw error for unexpected errors
        }
      } else {
        navigate("/login");
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error("Registration Error:", error); // Log the error for debugging
      window.alert("Registration Error: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const empty = () => {
    setName("");
    setEmail("");
    setPass("");
    setDob("");
    setAddress("");
    setProfilePic(null);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-200 shadow-md rounded-lg px-8 py-12 max-w-screen-xl w-full sm:w-[800px]">
        <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">
          User Register
        </h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className={labelStyles.label}>
                <FiUser className={iconStyles.icon} />
                Full Name <span className={spanStyles.required}>*</span>
              </label>
              <input
                className={inputField.field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={labelStyles.label}>
                <FiMail className={iconStyles.icon} />
                Email <span className={spanStyles.required}>*</span>
              </label>
              <input
                className={inputField.field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={labelStyles.label}>
                <FiLock className={iconStyles.icon} />
                Password <span className={spanStyles.required}>*</span>
              </label>
              <div className="relative">
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
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
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className={labelStyles.label}>
                <FiCalendar className={iconStyles.icon} />
                Date of Birth <span className={spanStyles.required}>*</span>
              </label>
              <input
                className={inputField.field}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                id="dob"
                name="dob"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className={labelStyles.label}>
                <FiMapPin className={iconStyles.icon} />
                Address <span className={spanStyles.required}>*</span>
              </label>
              <textarea
                className={addressField.addressStyle}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                name="address"
                rows="3"
                placeholder="Your address..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="profilePic" className={labelStyles.label}>
                <FiCamera className={iconStyles.icon} />
                Profile Picture <span className={spanStyles.required}>*</span>
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleFileChange}
              />
              {profilePic && (
                <img
                  src={
                    profilePic !== "null"
                      ? URL.createObjectURL(profilePic)
                      : "Add Image"
                  }
                  alt="Add"
                  className="mt-2 rounded-full w-14 h-14 object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button
              onClick={empty}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-2 sm:mb-0"
            >
              Reset
            </button>

            <Button type="submit">Register</Button>
            <Button onClick={() => navigate("/login")}>Back To Login</Button>
          </div>
          {error && (
            <p className="{spanStyles.required} text-sm mb-4">{error}</p>
          )}
        </form>
        <div className="mt-4 flex justify-center">
          <Button
            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline sm:w-auto"
            onClick={() => navigate("/login")}
          >
            <SiGoogle className="text-white mr-2" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Register;
