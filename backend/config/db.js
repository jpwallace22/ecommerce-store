import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // URI comes from mongoDB
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline); //visual aid
  } catch (error) {
    console.error(`Error: ${error.message}`).red.underline.bold; // visual aid
    process.exit(1);
  }
};

export default connectDB;
