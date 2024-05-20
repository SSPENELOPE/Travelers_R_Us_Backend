import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
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
    firstName: string;
    lastName: string;
    trails: mongoose.Types.ObjectId[];
}

const User = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument }; 