import mongoose from 'mongoose';

// Your database connection URI
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Traveler_R_Us';

// Connect to the database
mongoose.connect(uri);

// Export the mongoose connection object
export default mongoose.connection;