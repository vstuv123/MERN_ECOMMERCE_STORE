const mongoose = require("mongoose");

const connection = () => {
    mongoose.connect(process.env.DB_URL)
    console.log(`Database connected successfully`);
}

module.exports = connection;