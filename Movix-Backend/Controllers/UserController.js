const USER_SCHEMA = require("../Models/UserModel");
const CustomError = require("../Utils/CustomError");
const asyncHandler = require("express-async-handler");
const { BASE_URL, API_KEY } = require("../Config/index");
const axios = require("axios");
const bcrypt = require("bcryptjs");

exports.updatePassword = asyncHandler(async (req, res, next) => {
  let id = req.user._id;
  let user = await USER_SCHEMA.findById(id);

  let oldPassword = req.body.oldPassword;
  let confirmPassword = req.body.confirmPassword;
  let newPassword = req.body.newPassword;

  if (confirmPassword !== newPassword)
    return next(
      new CustomError("newPassword and ConfirmPassword are not match", 400)
    );
  let match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return next(new CustomError("Password does not match", 400));

  user.password = newPassword;
  user.confirmPassword = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Password updated Successfully",
  });
});
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { selectedGenres, ...otherFields } = req.body;

  let userId = req.user._id;
  updateFields = {
    ...otherFields,
    Genre: selectedGenres,
  };
  const updateUser = await USER_SCHEMA.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated Successfully",
  });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let id = req.user._id;
  const user = await USER_SCHEMA.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});
// exports.gettingContent = asyncHandler(async (req, res, next) => {
//   const { media_type, media_id } = req.params;

//   try {
//     const content = await axios.get(
//       `${BASE_URL}${media_type}/${media_id}?api_key=${API_KEY}&language=en-US`
//     );
//     const video = await axios.get(
//       `${BASE_URL}${media_type}/${media_id}/videos?api_key=${API_KEY}&language=en-US`
//     );
//     const carouselData = await axios.get(
//       `${BASE_URL}${media_type}/${media_id}/credits?api_key=${API_KEY}&language=en-US`
//     );
//     // Send the data received from TMDB to the frontend
//     res.json({
//       content: content.data,
//       video: video.data,
//       carouselData: carouselData.data,
//     });
//   } catch (error) {
//     console.error("Error fetching data from TMDB:", error);
//     res.status(500).json({ message: "Failed to fetch data from TMDB" });
//   }
// });
  