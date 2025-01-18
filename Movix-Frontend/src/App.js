import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Trending from "./Pages/Trending/Trending";
import Tv from "./Pages/TV/Tv";
import Search from "./Pages/Search/Search";
import Movies from "./Pages/Movies/Movies";
import Header from "./Components/Header/Header";
import Modal from "./Pages/Modal/Modal";
import WatchList from "./Pages/WatchList/WatchList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Login from "./Components/Login/Login";
import Sign from "./Components/Signin/Sign";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import EditProfile from "./Components/EditProfile/EditProfile";
import axios from "axios";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        axios.defaults.credentials = true;
        const { data } = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_URL}/Auth/authStatus`,
          {
            withCredentials: true,
          }
        );

        setLoggedIn(data.isLoggedIn);
      } catch (error) {
       console.log(error)
      }
    };

    checkAuthStatus();
  }, []);
  return (
    <>
      <ToastContainer limit={1} />
      <Header checkUser={{ loggedIn, setLoggedIn }} />
      <Routes>
        <Route path="/trending" element={<Trending />} />
        <Route path="/MOVIX" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/Modal/:media_id/:media_type"
          element={<Modal checkUser={{ loggedIn }} />}
        />

        <Route path="/watchList" element={<WatchList />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route
          path="/Login"
          element={<Login checkUser={{ loggedIn, setLoggedIn }} />}
        />
        <Route
          path="/Sign-in"
          element={<Sign checkUser={{ loggedIn, setLoggedIn }} />}
        />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/EditProfile" element={<EditProfile />} />
      </Routes>
      <Navbar />
      
    </>
  );
};

export default App;
