const USER_SCHEMA = require("../Models/UserModel");
const CustomError = require("../Utils/CustomError");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET_KEY, JWT_EXPIRES } = require("../Config/index");
const sendEmail = require("../Utils/Email");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.SignUpUser = asyncHandler(async (req, res, next) => {
  let { userName, email, password, confirmPassword } = req.body;

  let user = await USER_SCHEMA.create({
    userName,
    email,
    password,
    confirmPassword,
  });

  res.status(201).json({
    success: true,
    message: "SignUp Successfully",
  });
});
exports.NotFound = asyncHandler(async (req, res, next) => {
  let url = req.originalUrl;
  res.status(404).json({
    message: `Page Not Found at ${url}`,
    success: "fail",
  });
});
exports.loginUser = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser = await USER_SCHEMA.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  let isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(400).json({
      status: false,
      message: "Invalid Password",
    });
  }
  let token = jwt.sign(
    { id: existingUser._id, changePasswordAt: existingUser.changePasswordAt },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 24 * 5 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "None" : "lax",
    path: "/",
  });
  res.status(200).json({
    status: true,
    message: "Login Successfully",
    existingUser,
  });
});
exports.fetchAllUsers = asyncHandler(async (req, res, next) => {
  let allUser = await USER_SCHEMA.find({});
  res.status(200).json({
    message: "All Users fetched Successfully",
    status: true,
    allUser,
  });
});
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  let { email } = req.body;

  let existingUser = await USER_SCHEMA.findOne({ email });

  if (!existingUser) {
    let error = new CustomError("Invalid Email", 400);
    next(error);
  } else {
    let randomToken = crypto.randomBytes(32).toString("hex");
    let hashedToken = crypto
      .createHash("sha256")
      .update(randomToken)
      .digest("hex");
    existingUser.resetToken = hashedToken;
    existingUser.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
    await existingUser.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/Auth/resetPassword/${randomToken}`;
    const message = `We have received the reset password request.Please use the below link to reset your Password \n\n${resetUrl}\n\n This reset password link will be valid for 10 minutes.`;

    try {
      await sendEmail({
        email: existingUser.email,
        subject: "Password change request",
        message: message,
      });
      res.status(200).json({
        status: "success",
        message: "Password reset email sent successfully to the user Email",
      });
    } catch (err) {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save({ validateBeforeSave: false });
      return res.json({
        success: false,
        message: err,
      });
    }
  }
});
exports.resetPassword = asyncHandler(async (req, res, next) => {
  let token = req.params.token;
  let { password, confirmPassword } = req.body;
  let hashToken = crypto.createHash("sha256").update(token).digest("hex");
  let user = await USER_SCHEMA.findOne({
    resetToken: hashToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return next(new CustomError("Password reset Link has been expired", 400));
  if (password === confirmPassword) {
    let hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.confirmPassword = undefined;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.passwordChangedAt = Date.now();
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: true,
      message: "Password has been reset successfully",
    });
  }
  return next(
    new CustomError("Confirm Password does match with the Password", 400)
  );
});
exports.logOut = asyncHandler(async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "lax",
    path: "/",
  });
// await req.user.save();
  res.status(200).json({
    success: true,
    message: "You have been Logout successfully",
  });
});
exports.authStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.authToken;

  if (token) {
    return res.json({ isLoggedIn: true });
  }
  return res.json({ isLoggedIn: false });
});
