const mongoose = require("mongoose");

//SCHEMA SETUP
const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: String,

    //define array in schema
    // arr: [
    //     {
    //         comment:String,

    //     },
    // ],
    houseType: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    image: String,
    price: Number,
});

// listSchema SCHEMA is being compiled to List module
const List = mongoose.model("List", listSchema);

List.deleteOne({ name: "Fehmi" }, function (err) {});

//For detail info click the link https://mongoosejs.com/docs/subdocs.html
//find() vs findOne() find hepsini digeri birini bulur
// List.find({ name: "Fehmi" }).exec((err, x) => {
//     if (err) {
//         console.log(123);

//         console.log(err);
//     } else {
//         console.log(x);
//     }
// });

//For detail info click the link https://mongoosejs.com/docs/subdocs.html
// List.findOne({ name: "Fehmi" }).exec((err, x) => {
//     if (err) {
//         console.log(123);

//         console.log(err);
//     } else {
//         console.log(x);
//     }
// });
//For detail info click the link https://mongoosejs.com/docs/subdocs.html
// List.find({ name: "Fehmi" }).exec((err, x) => {
//     if (err) {
//         console.log(123);

//         console.log(err);
//     } else {
//         console.log(x);
//     }
// });

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
