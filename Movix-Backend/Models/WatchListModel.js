const mongoose = require("mongoose");

const WATCHLIST_SCHEMA = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user's ID
    ref: "User", // Assuming you have a User model
    required: true,
  },
  mediaId: {
    type: String, // TMDB media ID
    required: true,
    unique:true,
  },
  media_type: {
    type: String, // Either "movie" or "tv"
    required: true,
  },
  title: {
    type: String, // Title of the movie or TV show
    required: true,
  },
  poster: {
    type: String, // Path to the poster image
    required: true,
  },
  rating: {
    type: Number, // Average rating
    default: 0,
  },
  formattedDate: {
    type: String, // Release or first air date (formatted)
    default: "Unknown",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-generate timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Auto-generate timestamp
  },
});

// Add a compound index to ensure unique watchlist entries per user
// watchListSchema.index({ userId: 1, mediaId: 1 }, { unique: true });

const WatchList = mongoose.model("WatchList", WATCHLIST_SCHEMA);

module.exports = WatchList;
