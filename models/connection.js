const mongoose = require("mongoose");

//DB Connection
const connectDB = () => {
    mongoose
        .connect("mongodb://localhost:27017/staycalmDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to DB!"))
        .catch((error) => console.log(error.message));
};

module.exports = connectDB;
