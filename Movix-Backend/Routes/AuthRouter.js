const {
  SignUpUser,
  NotFound,
  loginUser,
  fetchAllUsers,
  forgetPassword,
  resetPassword,
  logOut,
  isLoggedIn,
  authStatus
} = require("../Controllers/AuthController");

const { authenticate } = require("../Middlewares/AuthMiddleware");
const express = require("express");
const { Router } = express;
const router = Router();

router.post("/signup", SignUpUser);
router.post("/login", loginUser);
router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token",  resetPassword);
router.get("/users",authenticate ,fetchAllUsers);
router.post("/logout",logOut)
router.get("/authStatus", authStatus)

router.all("*", NotFound);
module.exports = router;
