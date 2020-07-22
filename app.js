const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Stay Calm Project Server started");
});

app.listen(5555);
