import React, { useState } from "react";
import "./UpdatePassword.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [updateForm, setUpdateForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    minLength: false,
    upperCase: false,
    char: false,
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUpdateForm({ ...updateForm, [name]: value });
    if (name === "newPassword") {
      setValidation((prevValidation) => ({
        ...prevValidation,
        minLength: value.length >= 8,
        upperCase: /[A-Z]/.test(value),
        char: /[!@#$%^&*()_+{}[\]:;<>,.?~-]/.test(value),
      }));
    }
  };

  const myStyle = {
    fontSize: "3rem",
  };
  const handleIcon = () => {
    navigate("/trending");
  };
  const saveForm = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.patch(
        `${process.env.REACT_APP_PRODUCTION_URL}/User/updatePassword/`,
        updateForm,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Password Updated Successfully");
        setUpdateForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={saveForm}>
        <div className="update_form">
          <CloseIcon style={myStyle} className="icon" onClick={handleIcon} />
          <h2>Update Your Password</h2>

          <label htmlFor="oldPassword">Old Password</label>
          <input
            name="oldPassword"
            type="password"
            onChange={changeHandler}
            value={updateForm.oldPassword}
            placeholder="Enter Your Old Password"
            autoComplete="off"
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            name="newPassword"
            type="password"
            placeholder="Enter your New Password"
            onChange={changeHandler}
            value={updateForm.newPassword}
            autoComplete="off"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your Confirm Password"
            onChange={changeHandler}
            autoComplete="off"
            value={updateForm.confirmPassword}
          />

          <button type="submit">Update Password</button>
          <div className="validation">
            <p className={validation.minLength ? "valid" : "invalid"}>
              At least 8 characters.{" "}
            </p>
            <p className={validation.upperCase ? "valid" : "invalid"}>
              At least one uppercase letter.
            </p>
            <p className={validation.char ? "valid" : "invalid"}>
              At least one special character(e.g., !, @, #, $).
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
