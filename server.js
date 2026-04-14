import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥");
  console.log(err);
  process.exit(1);
});

const startServer = async ()=> {
    try {
        await connectDB();
        const server = app.listen(PORT, ()=> {
            console.log(`Server is running on port: ${PORT}`);
        });

        process.on("unhandledRejection", (err) => {
            console.log("UNHANDLED REJECTION 💥 Shutting down...");
            console.log(err.name, err.message);

            server.close(() => {
                process.exit(1);
            });
        });

    } catch (err) {
        console.error("Server startup error:", err);
        process.exit(1);
    }
};

startServer();

