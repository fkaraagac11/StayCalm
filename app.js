const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
    .connect("mongodb://localhost:27017/staycalmDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to DB!"))
    .catch((error) => console.log(error.message));

const listSchema = new mongoose.Schema({
    name: String,
    image: String,
    city: String,
    type: String,
    roomNumber: Number,
});

const List = mongoose.model("List", listSchema);

List.find({}, function (err, lists) {
    if (err) {
        console.log("OH NO ERROR!!!");
        console.log(err);
    } else {
        console.log("ALL THE LISTS ....");
        console.log(lists);
    }
});

List.create(
    {
        name: "Blue House",
        image:
            "https://images.pexels.com/photos/69776/tulips-bed-colorful-color-69776.jpeg?auto=compress&cs=tinysrgb&h=350",
        city: "McLean",
        type: "Single House",
        roomNumber: 3,
    },
    (err, lists) => {
        if (err) {
            console.log(err);
        } else {
            console.log(lists);
        }
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/staycalm", (req, res) => {
    res.send("StayCalm Project Server started");
});

app.get("/", (req, res) => {
    res.render("landing");
});

app.listen(5555, () => {
    console.log("TO STAY CALM YOU NEED nSTAYCALM");
});
