const asyncHandler = require("express-async-handler");
const CustomError = require("../Utils/CustomError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../Config/index");
const USER_SCHEMA = require("../Models/UserModel");

exports.authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.authToken;

  if (!token) {
    let error = new CustomError("Please Login first", 401);
    next(error);
  } else {
    let decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    const user = await USER_SCHEMA.findById(decodedToken.id);

    if (!user) return next(new CustomError("Invalid User", 400));
    req.user = user;
    next();
  }
});
