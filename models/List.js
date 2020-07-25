const mongoose = require("mongoose");

//SCHEMA SETUP
const listSchema = new mongoose.Schema({
  name: String,
  image: String,
  city: String,
  type: String,
  roomNumber: Number,
});

// SCHEMA compiled to module
const List = mongoose.model("List", listSchema);

export default List;
