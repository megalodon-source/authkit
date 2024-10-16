import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";
import generateToken from "../../helpers/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        // 400 Bad Request
        res.status(400).json({ message: "All fields are required" });
    }

    // check password length
    if (password.length < 6) {
        return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        // bad request
        return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // generate token with user id
    const token = generateToken(user._id);

    // send back the user and token in the response to the client
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: true,
        secure: true,
    })

    console.log(token);

    if(user) {
        const { _id, name, email, role, photo, bio, isVerified } = user;

        // 201 Created
        res.status(201).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
});

// user login
export const loginUser = asyncHandler(async (req, res) => {
    res.send("Login route");
});
