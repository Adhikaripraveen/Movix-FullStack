const COMMENT_SCHEMA = require("../Models/CommentModel");
const CustomError = require("../Utils/CustomError");
const USER_SCHEMA = require("../Models/UserModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
exports.addComment = asyncHandler(async (req, res, next) => {
  let { media_id } = req.params;
  let { comment } = req.body;
  let _id = req.user._id;

  let user = await USER_SCHEMA.findOne({ _id });

  if (!user) return next(new CustomError("Please Login First", 404));
  try {
    const newComment = new COMMENT_SCHEMA({
      comment,
      user: _id,
      commentBy: user.userName,
      postId: media_id,
    });
    await newComment.save();
    res.status(201).json({
      success: true,
      message: "Comment Added",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error saving comment",
    });
  }
});
exports.fetchComment = asyncHandler(async (req, res, next) => {
  const { media_id } = req.params;
  let comments = await COMMENT_SCHEMA.find({
    postId: media_id,
  });
  res.status(200).json({
    success: true,
    comments,
  });
});
exports.deleteComment = asyncHandler(async (req, res, next) => {
  let deleteCommentId = req.params.deleteCommentId;

  const comment = await COMMENT_SCHEMA.findByIdAndDelete(deleteCommentId);
  res.status(200).json({
    success: true,
  });
});
exports.editComment = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let trimmedComment = req.body.comment.trim();

  const updateComment = {
    comment: trimmedComment,
    createdAt: Date.now(),
  };
  let updateEdit = await COMMENT_SCHEMA.findByIdAndUpdate(
    id,
    { comment: trimmedComment },
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "edited successfully",
  });
});
