/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import google from "../image/google.png";

function GoogleLogin({ buttonText }) {

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      // Mengarahkan pengguna ke dashboard setelah berhasil masuk
      toast.success("You have successfully continue with google");
      window.location.href = "/";
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <button
      onClick={loginWithGoogle}
      className="flex items-center justify-center shadow-lg bg-white hover:bg-slate-300 border-2 border-inherit w-48 h-12 cursor-pointer"
    >
      <img className="w-5 h-5" src={google} alt="Google" />
      <span className="text-black ml-[6px]">{buttonText}</span>
    </button>
  );
}

export default GoogleLogin;
