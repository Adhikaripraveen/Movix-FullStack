const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const USER_SCHEMA = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
 Genre:{
  type:[String],
  default:'All'
 }, 
});
USER_SCHEMA.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User", USER_SCHEMA);
module.exports = User;
