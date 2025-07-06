const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/heart-hues');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is running on your system');
    console.log('You can start MongoDB with: mongod');
    
    // In development, we might want to continue without database
    if (process.env.NODE_ENV === 'development') {
      console.log('Continuing in development mode without database...');
      return null;
    } else {
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

module.exports = {
  connectDB,
  disconnectDB
}; 