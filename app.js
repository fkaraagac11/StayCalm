const express = require("express");
const app = express();
const connectDB = require("./models/connection");
const List = require("./models/List");
const bodyParser = require("body-parser");

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/staycalm", (req, res) => {
    res.send("StayCalm Project Server started");
});

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/listings", (req, res) => {
    //GET all lists from DB
    List.find({}, (err, allLists) => {
        if (err) {
            console.log(err);
        } else {
            res.render("listings", { listings: allLists });
        }
    });
});

app.post("/listings", (req, res) => {
    var name = req.body.name;
    var middleName = req.body.middleName;
    var lastName = req.body.lastName;
    var houseType = req.body.houseType;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var newListing = {
        name: name,
        middleName: middleName,
        lastName: lastName,
        houseType: houseType,
        address: address,
        city: city,
        state: state,
        zip: zip,
    };

    List.create(newListing, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/listings");
        }
    });
});

app.get("/listings/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(5555, () => {
    console.log("TO STAY CALM YOU NEED STAYCALM");
});

// List.find({}, function (err, lists) {
//     if (err) {
//         console.log("OH NO ERROR!!!");
//         console.log(err);
//     } else {
//         console.log("ALL THE LISTS ....");
//         console.log(lists);
//     }
// });

// List.create(
//     {
//         name: "Blue House",
//         image:
//             "https://images.pexels.com/photos/69776/tulips-bed-colorful-color-69776.jpeg?auto=compress&cs=tinysrgb&h=350",
//         city: "McLean",
//         type: "Single House",
//         roomNumber: 3,
//     },
//     (err, lists) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(lists);
//         }
//     }
// );
