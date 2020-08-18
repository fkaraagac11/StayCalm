const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./models/connection");
const List = require("./models/List");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const methodOverride = require("method-override");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
    require("express-session")({
        secret: "Listing is key function of StayCalm App",
        resave: false,
        saveUninitialized: false,
    })
);

mongoose.set("useCreateIndex", true);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
//Warning: You have to put double backslash to fix the problem for defining path
// app.use(
//     express.static(
//         "C:\\Users\\15713\\Documents\\Full-Stack\\EJS\\StayCalm\\public"
//     )
// );
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
connectDB();

app.get("/", (req, res) => {
    res.render("landing");
});

//*****************AUTHENTICATION********************/
//**********SIGNIN, LOGIN and LOGOUT implementation

app.get("/valuedUser", isLoggedIn, function (req, res) {
    res.render("valued_user");
});

// Show signup form
app.get("/register", (req, res) => {
    res.render("register");
});

// Handling user sign-up functionality
app.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
                // console.log("You are already registered");
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect("/valuedUser");
            });
        }
    );
});

// LOGIN ROUTES
// Render Login Form

app.get("/login", (req, res) => {
    res.render("login");
});

// Login functionality
//middleware

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/valueduser",
        failureRedirect: "/login",
    }),
    function (req, res) {}
);

// LOGOUT functionality

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Middleware authentication
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// User.deleteOne({ username: "faruk11" }, function (err) {
//     console.log(err);
//     console.log("Hi");
// });

//****ROUTES*******/
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
            console.log(lists);
            res.render("new", { lists: lists });
        }
    });
});

// //3- CREATE => '/listings' => POST for creating new list then redirect somewhere
app.post("/listings", (req, res) => {
    //Create list
    console.log(req.body);
    List.create(req.body.list, (err, newListing) => {
        if (err) {
            console.log(err);
            res.render("new");
        } else {
            //then redirect
            res.redirect("/listings");
        }
    });
});

// 4- SHOW => '/listings/:id => GET for showing info about one spesific listing

app.get("/listings/:id", function (req, res) {
    List.findById(req.params.id, function (err, foundList) {
        if (err) {
            res.redirect("/listings");
        } else {
            res.render("show", { list: foundList });
        }
    });
});

// 5- EDIT => '/listings/:id/edit' => GET for showing edit form for one list

app.get("/listings/:id/edit", (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if (err) {
            res.redirect("/listings");
        } else {
            res.render("edit", { list: foundList });
        }
    });
});

// 6- UPDATE => '/listings/:id' => PUT for updating a particular list and redirect somewhere

app.put("/listings/:id", (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body.list, function (
        err,
        updatedList
    ) {
        if (err) {
            res.redirect("/listings");
        } else {
            res.redirect("/listings/" + req.params.id);
        }
    });
});

// 7-DELETE => 'listings/:id' for deleting a particular list then redirect somewhere

app.delete("/listings/:id", (req, res) => {
    List.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/listings");
        } else {
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
