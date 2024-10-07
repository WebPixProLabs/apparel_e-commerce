import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for successful connection event
    mongoose.connection.on('connected', () => {
      console.log("DB Connected successfully to the e-commerce database.");
    });

    // Listen for any disconnection or error event
    mongoose.connection.on('error', (err) => {
      console.error(`DB Connection Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log("MongoDB disconnected.");
    });

    // Connect to the MongoDB URI
    await mongoose.connect(process.env.MONGODB_URI, {
  
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
