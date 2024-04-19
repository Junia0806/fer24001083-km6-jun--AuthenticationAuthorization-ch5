/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { toast } from "react-toastify";

export const Facebook = () => {
  const handleLoginSuccess = (response) => {
    console.log("Login Success!", response);
    console.log("expired Token", response.expiresIn);
    console.log("token", response.accessToken);
    // Simpan accessToken dari response ke local storage dengan nama "facebookToken"
    localStorage.setItem("facebookToken", response.accessToken);
    toast.success("You have successfully continue with facebook");
    setTimeout(() => {
      // Mengarahkan pengguna ke dashboard setelah berhasil masuk
      window.location.href = "/";
    }, 4000);
  };

  const handleLoginFail = (error) => {
    console.log("Login Failed!", error);
  };

  const handleProfileSuccess = (response) => {
    console.log("Get Profile Success!", response);
    console.log("nama ku adalah", response.name);
    localStorage.setItem("nama fb", response.name)
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <FacebookLogin
        appId="1420383742007353"
        onSuccess={handleLoginSuccess}
        onFail={handleLoginFail}
        onProfileSuccess={handleProfileSuccess}
        style={{ padding: "10px", backgroundColor: "#3b5998", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}
      />
    </div>
  );
};

