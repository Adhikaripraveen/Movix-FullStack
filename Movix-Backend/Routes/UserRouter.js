const { Router } = require('express');
const router = Router();
const { updatePassword ,updateProfile,deleteUser,gettingContent} = require("../Controllers/UserController");
const { authenticate } = require("../Middlewares/AuthMiddleware");
router.patch("/updatePassword",authenticate,  updatePassword);
router.get("/gettingContent/:media_type/:media_id",gettingContent)
router.patch("/updateProfile/",authenticate,updateProfile);
router.delete("/deleteUser/:id",authenticate,deleteUser)
module.exports=router;
