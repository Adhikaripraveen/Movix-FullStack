const mongoose = require("mongoose");
const { MONGODB_URL } = require(".");

const connectDB = async () => {
  
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
      
    });
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
