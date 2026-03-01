const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️  MongoDB Connection Failed: ${error.message}`);
    console.log('⚠️  Server will run without database. Please install MongoDB for full functionality.');
    console.log('📖 See SETUP.md for MongoDB installation instructions.');
    return false;
  }
};

module.exports = connectDB;
