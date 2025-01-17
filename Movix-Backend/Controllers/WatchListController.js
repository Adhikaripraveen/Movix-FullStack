const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const WATCHLIST_SCHEMA = require("../Models/WatchListModel");
exports.AddToWatchList = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
 
  const userId = req.user._id;

  await WATCHLIST_SCHEMA.create({
    ...content,
    userId,
    mediaId: content.id,
  });
  res.status(200).json({ success: true, message: "Added to watchlist." });
});
exports.gettingWatchListItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const watchListItems = await WATCHLIST_SCHEMA.find({ userId });

  res.status(200).json({
    success: true,
    watchList: watchListItems,
  });
});
exports.deleteWatchListItems = asyncHandler(async (req, res, next) => {
  let user = req.user._id;
  let contentId = req.params.media_id;
  await WATCHLIST_SCHEMA.findOneAndDelete({ userId: user, mediaId: contentId });
  res.status(200).json({ success: true, message: "Removed from watchlist." });
});
