import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },

    email: {
        type: String,
        required: [true, "Please an email"],
        unique: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please add valid email"],
    },

    password: {
        type: String,
        required: [true, "Please add password"],
    },

    photo: {
        type: String,
        default: "./",
    },
});