import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, required: true},
        name: {type: String, required: true},
        password: {type: String ,required: true},
    }
);

const users = mongoose.model('users', userSchema);

export default users;