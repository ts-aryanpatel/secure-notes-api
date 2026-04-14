import mongoose from "mongoose";

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid ID format";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(", ");
    }

    res.status(statusCode).json({
        success: false,
        status: err.status || 'error',
        message
    });
};

export default errorMiddleware;