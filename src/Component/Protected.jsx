/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Protected({ children }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const facebookToken = localStorage.getItem("facebookToken");

      if (!token && !facebookToken) {
        alert("Anda tidak bisa mengakses halaman ini tanpa akun MyRecipe");
        navigate("/");
        return;
      }

      if (facebookToken) {
        // Jika ada facebookToken, cek waktu kedaluwarsa token
        const expiresIn = parseInt(localStorage.getItem("expiresIn"));
        const currentTime = Math.floor(Date.now() / 1000);

        if (expiresIn <= currentTime) {
          // Token telah kedaluwarsa, hapus token dan munculkan alert
          localStorage.removeItem("facebookToken");
          toast.error("Your Facebook token has expired");
          navigate("/");
          return;
        }

        // Jika token masih berlaku, setData sebagai facebookToken
        setData(facebookToken);
        return;
      }

      // Jika ada token, periksa validitasnya dengan memanggil API me
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            toast.error("Your token is invalid. Please log in again.");
            navigate("/");
            return;
          }
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    checkToken();
  }, [navigate]);

  return children;
}

export default Protected;
