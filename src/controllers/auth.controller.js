import { registerUser, loginUser, refreshTokenService, logoutService } from "../services/auth.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const user = await registerUser({ name, email, password });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    });
});

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    const { accessToken, refreshToken, user } = result;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // production me true (HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            accessToken,
            user
        }
    });
   
});

export const refreshToken = asyncHandler(async (req, res) => {
    
    const token = req.cookies.refreshToken;

    const { accessToken, refreshToken } = await refreshTokenService(token);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        accessToken: accessToken
    });
});

export const logout = asyncHandler(async (req, res) => {

    await logoutService(req.user.id);

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});