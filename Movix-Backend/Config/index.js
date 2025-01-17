const dotenv=require('dotenv');
dotenv.config();
module.exports={
	PORT_NUMBER:process.env.PORT_NUMBER || 5000,
	MONGODB_URL:process.env.MONGODB_URL,
	JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
	JWT_EXPIRES:process.env.JWT_EXPIRES,
	EMAIL_USER:process.env.EMAIL_USER,
	EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
	EMAIL_HOST:process.env.EMAIL_HOST,
	EMAIL_PORT:process.env.EMAIL_PORT,
	API_KEY:process.env.API_KEY,
	BASE_URL:process.env.BASE_URL,
}