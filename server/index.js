const express = require("express");
const cors = require("cors");
const path = require("path");

var defaultRoute = require("./routes/route");

const app = express(); // create express app

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/", defaultRoute);

app.get("/", (req, res) => {
  res.json("This is from express.js");
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
