const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "server/config.env"});
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute")
const orderRouter = require("./routes/orderRoute")
const paymentRouter = require("./routes/paymentRoute")

app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', paymentRouter);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
})

// Error Handler middlewares
app.use(errorMiddleware);

module.exports = app;