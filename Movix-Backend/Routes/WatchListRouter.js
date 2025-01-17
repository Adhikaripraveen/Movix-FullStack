const {Router}=require("express");
const {authenticate}=require("../Middlewares/AuthMiddleware");
const {AddToWatchList, gettingWatchListItems,deleteWatchListItems}=require("../Controllers/WatchListController");
const router=Router();
router.post('/AddToWatchList',authenticate,AddToWatchList);
router.get("/watchListItems",authenticate,gettingWatchListItems)
router.delete("/deleteWatchListItems/:media_id",authenticate,deleteWatchListItems);
module.exports=router;