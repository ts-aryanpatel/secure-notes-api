import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { hashToken } from "../utils/hashToken.js";


// Generate Token
const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

export const registerUser = async ({ name, email, password })=> {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email, 
        password: hashedPassword
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};

export const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = hashToken(refreshToken);
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

export const refreshTokenService = async (token) => {

    if (!token) {
        throw new AppError("Refresh Token missing", 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new AppError("Invalid refresh token", 403);
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const hashedToken = hashToken(token);

    if (user.refreshToken !== hashedToken) {
        throw new AppError("Refresh token mismatch", 403);
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};

export const logoutService = async (userId) => {
    
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    user.refreshToken = null;
    await user.save();

    return true;
};