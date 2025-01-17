
const {Router}=require('express');
const { addComment, fetchComment, deleteComment,editComment } = require('../Controllers/CommentController');
const { authenticate } = require('../Middlewares/AuthMiddleware');
const router=Router();
router.post("/addComment/:media_id",authenticate,addComment);
router.get("/getComment/:media_id",fetchComment);
router.delete("/deleteComment/:deleteCommentId",authenticate,deleteComment);
router.patch("/editComment/:id",authenticate,editComment);
module.exports=router;