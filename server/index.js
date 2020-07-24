const express = require("express");
const cors = require("cors");
const path = require("path");

/* Tests for SonarrRepository
 **
const SonarrRepository = require("./repositories/SonarrRepository");

const sonarr = new SonarrRepository(
  "https://sonarr.chriscatt.com",
  "dbba8221e16a40b0bf16772d333a18aa"
);

async function testSonnarGetExisting() {
  let test = await sonarr.getExistingSeries();

  console.log(test);
}

testSonnarGetExisting();

/*
async function testSonarrConnection() {
  let test = await sonarr.testConnection(
    "https://sonaarr.chriscatt.com",
    "dbba8221e16a40b0bf16772d333a18aa"
  );

  console.log(test);
}

testSonarr();
*/

var defaultRoute = require("./routes/route");

const app = express(); // create express app

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/", defaultRoute);

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
