import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        trails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'trails'
            }
        ],
        campgrounds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'campgrounds'
            }
        ],
        nationalParks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'nationalParks'
            }
        ] 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    trails: mongoose.Types.ObjectId[];
}

export default mongoose.model<UserDocument>('User', userSchema);
