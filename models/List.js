const mongoose = require("mongoose");

//SCHEMA SETUP
const listSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    houseType: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    image: String,
    price: Number,
});

// SCHEMA compiled to module
const List = mongoose.model("List", listSchema);

module.exports = List;

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
