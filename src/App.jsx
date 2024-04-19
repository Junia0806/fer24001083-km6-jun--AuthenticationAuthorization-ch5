import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Login from "./Page/Login";
import Register from "./Page/Register";
import NoTokenAccess from "./Component/NoTokenAccess";
import Home from "./Page/Home";
import Protected from "./Component/Protected";
import Dashboard from "./Page/users/Dashboard";
import { ToastContainer } from "react-toastify";
import MealDetail from "./Page/users/Detail";
import Random from "./Page/users/Random";
import MealList from "./Page/users/ListMeal";
import RecipeSearch from "./Page/users/Search";
import Area from "./Page/users/Area";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <NoTokenAccess>
                <Login />
               </NoTokenAccess>
            }
          />
          <Route
            path="/register"
            element={
              <NoTokenAccess>
                <Register />
              </NoTokenAccess>
            }
          />
          <Route
            path="/users/category"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
           <Route
            path="/detail/:idMeal"
            element={
              <Protected>
                <MealDetail />
              </Protected>
            }
          />
            <Route
            path="/random"
            element={
              <Protected>
                <Random />
              </Protected>
            }
          />
           <Route
            path="/category/:category"
            element={
              <Protected>
                <MealList />
              </Protected>
            }
          />
          <Route
            path="/users/search"
            element={
              <Protected>
                <RecipeSearch />
              </Protected>
            }
          />
           <Route
            path="/users/area"
            element={
              <Protected>
                <Area />
              </Protected>
            }
          />
        </Routes>
        <ToastContainer theme="colored" />
        <Footer/>
      </BrowserRouter>
     </GoogleOAuthProvider>
  );
}

export default App;