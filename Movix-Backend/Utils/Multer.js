const fs=require('fs')
const multer=require("multer");
const CustomError=require("./CustomError")
const asyncHandler=require("express-async-handler")
const storage=multer.diskStorage({
	destination:function(req,file,cb){
		const uploadDir='uploads/';
		if(!fs.existsSync(uploadDir)){
			fs.mkdirSync(uploadDir)
		}
		cb(null,uploadDir)
	},
	filename:function(req,file,cb){
		cb(null,Date.now()+'-'+file.originalname)
		
	}
})
const upload=multer({storage})
const uploadFile=asyncHandler((req,res,next)=>{
	const singleUpload=upload.single('profileImage')
	singleUpload(req, res, (err) => {
		if (err) {
		  return next(new CustomError('Error in uploading Image'));
		} else {
		  return (req.file || null); // Resolve with `null` if no file is provided
		}
	  });
})
module.exports=uploadFile;