import React, { useState } from "react";
import {toast} from "react-toastify";
import axios from  'axios';
import CloseIcon from "@mui/icons-material/Close";
import "./ResetPassword.css"
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate=useNavigate();
  const handleIcon=()=>{
	navigate('/trending')
  }
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setResetForm({ ...resetForm, [name]: value });
  };
  const saveForm = async (e) => {
    e.preventDefault();
    if (resetForm.password.trim() === "" || !resetForm.password)
      return toast.error("Please Enter Your Password");
    if (resetForm.confirmPassword.trim() === "" || !resetForm.confirmPassword)
      return toast.error("Please Enter your Password");
    if (resetForm.password !== resetForm.confirmPassword)
      return toast.error("Password does not match with confirm Password");
    try {
      axios.defaults.withCredentials=true;
      const response = await axios.patch(
        `${process.env.REACT_APP_PRODUCTION_URL}/Auth/resetPassword/`, 
        resetForm,{
          withCredentials:true,
        }
      );
      if (response.data.status) {
        toast.success("Password reset Successfully");
        setResetForm({
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const myStyle = {
    fontSize: "3rem",
  };
  return (
    <div>
      <div className="blurred-background"></div>
      <form onSubmit={saveForm}>
        <div className="reset_form">
          <CloseIcon
            style={myStyle}
            className="icon"
            onClick={handleIcon}
          />
          <h2>Reset Your Password</h2>

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={changeHandler}
            value={resetForm.password}
            placeholder="Enter Your Password"
            autoComplete="off"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter your Confirm password"
            onChange={changeHandler}
            value={resetForm.confirmPassword}
            autoComplete="off"
          />

          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
