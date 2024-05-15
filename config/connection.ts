import { connect, connection } from 'mongoose';

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Traveler_R_Us');

export default connection;