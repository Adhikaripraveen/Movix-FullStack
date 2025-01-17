import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {
 
  const{logged,setLoggedIn}=props.checkUser;
  
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const forgetPassword = async () => {
    if (!logInForm.email || logInForm.email.trim() === "")
      return toast.error("Please Enter the email");

    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_PRODUCTION_URL}/Auth/forgetPassword`,
        logInForm
      );

      if (response.data.status) {
        toast.success("Link sent to your registered Email successfully");

        navigate("/ResetPassword");
      }
    } catch (err) {
      toast.error(
        err.response.data.message || "An error occurred Please try again later."
      );
    }

  };
  const handleIcon=()=>{
    navigate("/trending")
  }

  const saveForm = async (e) => {
    e.preventDefault();
    if (!logInForm.email || logInForm.email.trim() === "")
      return toast.error("Please Enter your Email");
    if (!logInForm.password || logInForm.password.trim() === "")
      return toast.error("Please Enter Your Password");

    try {
      axios.defaults.withCredentials=true;
      const response = await axios.post(
        `${process.env.REACT_APP_PRODUCTION_URL}/Auth/login`,
        logInForm,
        { withCredentials: true }
      );

      if (response.data.status) {
        toast.success("Login Successfully");
        setLogInForm({
          email: "",
          password: "",
        });
       
        const user=response.data.existingUser._id;
       sessionStorage.setItem('user',user)
        setLoggedIn(true);
      
        navigate("/trending");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLogInForm({ ...logInForm, [name]: value });
  };

  const myStyle = {
    fontSize: "3rem",
  };
  return (
    <div>
      <div className="blurred-background"></div>
      <form onSubmit={saveForm}>
        <div className="login_from">
          <CloseIcon
            style={myStyle}
            className="icon"
            
            onClick={handleIcon}
          />
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            onChange={changeHandler}
            value={logInForm.email}
            placeholder="Enter the Email"
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            value={logInForm.password}
            autoComplete="off"
          />

          <div className="button_container">
            <button type="submit">Log in</button>
            <button type="button" onClick={forgetPassword}>
              Forget Password
            </button>
           
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
