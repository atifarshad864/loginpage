import React, {useState} from "react";
import {
    FiEye,
    FiEyeOff,
} 
from "react-icons/fi";

export const PasswordInput = () =>{
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return(
        <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
    )
} 