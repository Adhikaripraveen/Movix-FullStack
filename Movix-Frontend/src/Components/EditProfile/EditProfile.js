import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./EditProfile.css";
import { toast } from "react-toastify";
import axios from "axios";
const EditProfile = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [availableGenres, setAvailableGenres] = useState([
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",

    "Drama",
    "Family",
    "Fantasy",

    "Horror",

    "Mystery",
    "Romance",
    "Science-Fiction",

    "Thriller",
  ]);
  const [profileForm, setProfileForm] = useState({
    email: "",
    userName: "",
    selectedGenres: [],
  });

  const handleAdd = (genre) => {
    setSelectedGenres((prev) => [...prev, genre]);
    setAvailableGenres((prev) => prev.filter((item) => item !== genre));
  };

  const handleRemove = (genre) => {
    setAvailableGenres((prev) => [...prev, genre]);
    setSelectedGenres((prev) => prev.filter((item) => item !== genre));
  };

  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };
  const saveForm = async (e) => {
    e.preventDefault();

    const updatedProfileForm = {
      ...profileForm,
      selectedGenres,
    };

    if (
      updatedProfileForm.userName.trim() === "" &&
      updatedProfileForm.email.trim() === "" &&
      updatedProfileForm.selectedGenres.length === 0
    ) {
      return toast.error("Please fill details");
    }
    if (updatedProfileForm.userName.trim() === "")
      return toast.error("Please Enter the Username");
    if (updatedProfileForm.email.trim() === "")
      return toast.error("Please Enter the Email");
    if (updatedProfileForm.selectedGenres.length === 0)
      return toast.error("Please Select your Genre");

    try {
      axios.defaults.withCredentials = true;

      const response = await axios.patch(
        `${process.env.REACT_APP_DEVELOPMENT_URL}/User/updateProfile/`,
        updatedProfileForm,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Profile updated Successfully");

        // Reset states
        setProfileForm({
          email: "",
          userName: "",
          selectedGenres: [],
        });
        setSelectedGenres([]);
        setAvailableGenres([
          "Action",
          "Adventure",
          "Animation",
          "Comedy",
          "Crime",
          "Drama",
          "Family",
          "Fantasy",
          "Horror",
          "Mystery",
          "Romance",
          "Science-Fiction",
          "Thriller",
        ]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const showSign = () => {
    navigate("/trending");
  };
  const myStyle = {
    fontSize: "4rem",
  };
  return (
    <div>
      <form onSubmit={saveForm}>
        <div className="profile_form">
          <CloseIcon
            style={myStyle}
            className="icon"
            onClick={() => showSign()}
          />
          <h2>Update Your Profile</h2>

          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            type="text"
            onChange={changeHandler}
            value={profileForm.userName}
            placeholder="Enter the Username"
            autoComplete="off"
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            onChange={changeHandler}
            value={profileForm.email}
            autoComplete="off"
          />
          <label>Select Your Favourite Genres</label>
          <div className="Edit_genre_section">
            {selectedGenres &&
              selectedGenres.map((genreItem, i) => (
                <span
                  className="Edit_select_genre"
                  key={i}
                  onClick={() => handleRemove(genreItem)}
                >
                  {genreItem}
                </span>
              ))}

            {availableGenres.map((genreItem, i) => (
              <span
                className="Edit_genre"
                key={i}
                onClick={() => handleAdd(genreItem)}
              >
                {genreItem}
              </span>
            ))}
          </div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
