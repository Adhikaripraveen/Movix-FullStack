import "./index.css";
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
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Login from "./Components/Login/Login";
import Sign from "./Components/Signin/Sign";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import EditProfile from "./Components/EditProfile/EditProfile";
import PrivateComponent from "./Utils/PrivateComponent";
import NotFound from "./Components/NotFound/NotFound"
import axios from "axios";

const App = () => {
  const url = process.env.REACT_APP_PRODUCTION_URL;

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${url}/Auth/authStatus`, {
          withCredentials: true,
        });
        
        setLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error checking authentication:", error);
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
        <Route path="/" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/Modal/:media_id/:media_type"
          element={<Modal checkUser={{ loggedIn }} />}
        />
        <Route
          path="/Login"
          element={<Login checkUser={{ loggedIn, setLoggedIn }} />}
        />
        <Route path="/watchList" element={<WatchList />} />
        <Route
          path="/Sign-in"
          element={<Sign checkUser={{ loggedIn, setLoggedIn }} />}
        />
        <Route
          path="/editProfile"
          element={
            <PrivateComponent loggedIn={loggedIn}>
              <EditProfile />
            </PrivateComponent>
          }
        />
        <Route
          path="/UpdatePassword"
          element={
            <PrivateComponent loggedIn={loggedIn}>
              <UpdatePassword />
            </PrivateComponent>
          }
        />{" "}
        <Route
          path="/ResetPassword"
          element={
            <PrivateComponent loggedIn={loggedIn}>
              <ResetPassword />
            </PrivateComponent>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </>
  );
};

export default App;
