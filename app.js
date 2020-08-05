const express = require("express");
const app = express();
const connectDB = require("./models/connection");
const List = require("./models/List");
const bodyParser = require("body-parser");

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});
//1-INDEX => '/listings' => GET for listing all listings

app.get("/listings", (req, res) => {
    List.find({}, (err, lists) => {
        if (err) {
            console.log("ERROR!!");
        } else {
            res.render("listings", { lists: lists });
        }
    });
});

//2- NEW => '/listings/new' => GET for showing new list form
app.get("/listings/new", (req, res) => {
    //GET all lists from DB
    List.find({}, (err, lists) => {
        if (err) {
            console.log(err);
        } else {
            res.render("new", { lists: lists });
        }
    });
});

//3- CREATE => '/listings' => POST for creating new list then redirect somewhere
app.post("/listings", (req, res) => {
    //Create list
    List.create(req.body.list, (err, newListing) => {
        if (err) {
            res.render("new");
        } else {
            //then redirect
            res.redirect("/listings");
        }
    });
});

/*
app.post("/listings", (req, res) => {
    var name = req.body.name;
    var lastName = req.body.lastName;
    var houseType = req.body.houseType;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var newListing = {
        name: name,
        lastName: lastName,
        houseType: houseType,
        address: address,
        city: city,
        state: state,
        zip: zip,
    };
    */

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
