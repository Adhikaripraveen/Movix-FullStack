
const mongoose = require("mongoose");

const COMMENT_SCHEMA = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    commentBy:{
      type:String,
  
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Number,
      ref: "movie", 
      required: true,
    },
  },
  { timestamps: true } 
);

const comment= mongoose.model("Comment", COMMENT_SCHEMA);
module.exports =comment;
