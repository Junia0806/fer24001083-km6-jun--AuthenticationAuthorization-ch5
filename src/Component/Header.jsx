/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem("nama fb");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const facebookToken = localStorage.getItem("facebookToken");
    setIsLoggedIn(token || facebookToken); 
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms logout
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out",
          icon: "success",
        }).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("facebookToken");
          localStorage.removeItem("nama fb");
          setIsLoggedIn(false);
          window.location.reload(); // Reload the page
          navigate("/"); // Redirect to home page
        });
      }
    });
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-white text-2xl font-bold tracking-wide"
            >
              MyRecipe
            </NavLink>
          </div>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/users/category"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Category
                </NavLink>
                <NavLink
                  to="/users/area"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Area
                </NavLink>
                <NavLink
                  to="/users/search"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Search
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-white hover:text-black"
                  style={{ border: "1px solid white" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-white hover:text-black"
                  style={{ border: "1px solid white" }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="text-black px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-300"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
