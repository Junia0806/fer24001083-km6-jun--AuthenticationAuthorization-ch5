/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLogin from "../Component/GoogleLogin";
import batb from "../image/poster.jpg";
import { Facebook } from "./Facebook";

function Login() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "email") setEmail(e.target.value);
      if (e.target.id === "password") setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API}/v1/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      // Mengarahkan pengguna ke dashboard setelah berhasil masuk
      toast.success("Suceed. Redirecting in your account...");
      setTimeout(() => {
        // Mengarahkan pengguna ke dashboard setelah berhasil masuk
        window.location.href = "/";
      }, 4000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex h-[34rem] w-[50rem] rounded-xl overflow-hidden shadow-2xl bg-white">
        <div className="w-1/3">
          <img src={batb} alt="poster" className="object-cover h-full w-full" />
        </div>
        <div className="flex flex-col bg-white bg-opacity-70 w-2/3 p-10 gap-4 text-black">
          <div className="flex flex-col gap-2 mb-2">
            <div className="text-3xl font-bold text-center">MyRecipe App</div>
            <div className=" text-gray-600 text-center">
              Login To Your Account MyRecipe App
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-black">Email</span>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="text-black px-3 py-2 bg-white ring-1 ring-slate-400 placeholder-slate-600 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <span className="text-black">Password</span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password in here"
              className="text-black px-3 py-2 bg-white ring-1 ring-slate-400 placeholder-slate-600 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
              onChange={handleInput}
            />
            <button
              className="absolute top-10 right-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          <span className="text-sm text-end cursor-pointer">
            {/* <div>Remember me</div> */}
          </span>
          <button
            onClick={onSubmit}
            className="bg-gray-900 hover:hover:bg-gray-700 text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <div>
            <span className="text-black">
              Dont have an account?{" "}
              <a
                href="/Register"
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Register
              </a>
            </span>
            <div className="flex items-center gap-4">
              <hr className="w-full bg-white" />
              <div>Or</div>
              <hr className="w-full bg-white" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-center">
              <GoogleLogin buttonText=" Continue with Google" />
              <Facebook/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
