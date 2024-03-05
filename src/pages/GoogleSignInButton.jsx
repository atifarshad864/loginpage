import axios from "axios";
import React, { useEffect } from "react";
import { SiGoogle } from "react-icons/si";

const GoogleSignInButton = () => {
  const handleGoogleLogin = () => {
    window.open("http://192.168.100.171:3000/auth/google", "_self");
  };

  const checkTokenValidity = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      axios
        .post("http://localhost:5000/auth/google", { token })
        .then((response) => {
          if (response.data.valid) {
            alert("Token is valid!");
          } else {
            alert("Token is invalid!");
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);

          alert("An error occurred while validating token.");
        });
    }
  };
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <div>
      <div className="text-center">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto sm:ml-12"
        >
          <SiGoogle className="text-white mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export { GoogleSignInButton };
