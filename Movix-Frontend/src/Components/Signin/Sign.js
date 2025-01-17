import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import "./sign.css";
const Sign = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [validation, setValidation] = useState({
    minLength: false,
    upperCase: false,
    char: false,
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setValidation((prevValidation) => ({
        ...prevValidation,
        minLength: value.length >= 8,
        upperCase: /[A-Z]/.test(value),
        char: /[!@#$%^&*()_+{}[\]:;<>,.?~-]/.test(value),
      }));
    }
  };

  const saveForm = async (e) => {
    e.preventDefault();

    if (
      formData["email"].trim() === "" &&
      formData["confirmPassword"].trim() === "" &&
      formData["password"].trim() === "" &&
      formData["userName"].trim() === ""
    ) {
      toast.error("Please fill the details");
    } else if (formData["userName"].trim() === "") {
      toast.error("Please Enter the username");
    } else if (formData["email"].trim() === "") {
      toast.error("Please Enter the Email");
    } else if (formData["password"].trim() === "") {
      toast.error("Please Enter the Password");
    } else if (formData["confirmPassword"].trim() === "") {
      toast.error("Please Enter the Confirm Password");
    } else if (formData["password"] !== formData["confirmPassword"]) {
      toast.error("Confirm Password does not match");
    } else if (
      validation["char"] === true &&
      validation.minLength === true &&
      validation.upperCase === true
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_PRODUCTION_URL}/Auth/signup`,
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (err) {
        toast.success(err.response.data.message, {
          limit: 1,
        });
      }

      setFormData({
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
      setValidation({
        minLength: false,
        upperCase: false,
        char: false,
      });
    }
  };

  const myStyle = {
    fontSize: "3rem",
  };
  const handleIcon = () => {
   
    navigate("/trending");
  };
  return (
    <>
      <div className="blurred-background"></div>
      <form onSubmit={saveForm}>
        <div className="sign_form">
          <CloseIcon style={myStyle} className="icon" onClick={handleIcon} />
          <h2>Sign up</h2>

          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            type="text"
            onChange={changeHandler}
            value={formData.userName}
            placeholder="Enter the Username"
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            value={formData.password}
            autoComplete="off"
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onChange={changeHandler}
            autoComplete="off"
            value={formData.confirmPassword}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            onChange={changeHandler}
            value={formData.email}
            autoComplete="off"
          />
          <button type="submit">Sign Up</button>
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
    </>
  );
};
export default Sign;
