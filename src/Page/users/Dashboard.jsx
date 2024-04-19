/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(""); // State untuk menyimpan informasi pengguna
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const facebookToken = localStorage.getItem("facebookToken");
      const name = localStorage.getItem("nama fb");

      if (facebookToken) {
        // Jika ada facebookToken, set nama pengguna berdasarkan token Facebook
        setUser({ name });
      } else if (token) {
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
          // Jika token valid, set nama pengguna berdasarkan respons API
          setUser(response.data.data); // Ganti dengan properti yang berisi nama pengguna
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // If not valid token
            if (error.response.status === 401) {
              localStorage.removeItem("token");
              return (window.location.href = "/");
            }
  
            toast.error(error.response.data.message);
            return;
          }
          toast.error(error.message);
        }
      } else {
        // Jika tidak ada token atau facebookToken, navigate ke halaman login
        alert("Anda tidak bisa mengakses halaman ini tanpa akun MyRecipe");
        navigate("/");
      }
      setLoading(false); // Set loading to false after token check is done
    };

    checkToken();
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-landing">
        <div className="mb-8">
          {/* Tampilkan nama pengguna */}
          <h1 className="text-black font-bold text-5xl text-center judul">
            Special for you, {user?.name}
          </h1>
        </div>
        <div className="flex">
          <Link
            to="/random"
            className="bg-gray-900 py-2 px-4 rounded text-white font-semibold hover:bg-gray-400 hover:text-black mr-3 mb-3 sm:mb-0"
          >
            Get It Now
          </Link>
        </div>
      </div>
      <div className="bg-white mx-auto px-4 py-20">
        <h1 className="text-black font-bold text-3xl text-center mb-4">
          Meal Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <Link to={`/category/${category.strCategory}`}>
                <div
                  className="bg-cover bg-center rounded-full shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${category.strCategoryThumb})`,
                    height: "150px", // Change height as needed
                    width: "150px", // Change width as needed
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-0 text-white hover:text-black">
                    <p className="font-bold text-lg">{category.strCategory}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
