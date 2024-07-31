const app = require("./app");
const connection = require("./db/database");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    process.exit(1);
})   // like console.log(youtube) i.e. youtube is not defined

// Config
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "server/config.env"});
}

// Database Connection
connection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

// unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
})  // wrong connection string or mongodb such related errors