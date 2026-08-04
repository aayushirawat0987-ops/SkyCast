const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas / Local database via Mongoose
 */
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      'mongodb+srv://aayurawat74_db_user:BtlLCsUC64yHuCKq@cluster0.ln2hknn.mongodb.net/skycast?retryWrites=true&w=majority&appName=Cluster0';

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
