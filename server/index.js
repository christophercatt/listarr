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

/*async function testGetRootFolders() {
  let test = await sonarr.getRootFolder();

  console.log(test);
}

testGetRootFolders();*/

/*async function testGetProfiles() {
  let test = await sonarr.getQualityProfiles();

  console.log(test);
}

testGetProfiles();*/

/*async function testListLookup() {
  let test = await sonarr.listLookup([
    { title: "Arrow", tvdb: 257655 },
    { title: "Cursed (2020)", tvdb: 3650 },
  ]);

  console.log(test);
}

testListLookup();*/

/*async function testSonnarGetExisting() {
  let test = await sonarr.getExistingSeries();

  console.log(test);
}

testSonnarGetExisting();*/

/*
async function testSonarrConnection() {
  let test = await sonarr.testConnection(
    "",
    ""
  );

  console.log(test);
}

testSonarr();
*/

/* Tests for TraktRepository
 **
const TraktRepository = require("./repositories/TraktRepository");

const trakt = new TraktRepository(
  "d04f391566cf6107225a431341d4272622eedda1e26abf49b5623899d29fb89d"
);

/*async function testUserWatchList() {
  let test = await trakt.getUserWatchList("lish408");

  console.log(test);
}

testUserWatchList();*/

/*async function testTraktConnection() {
  let test = await trakt.testConnection(
    "d04f391566cf6125a431341d4272622eedda1e26abf49b5623899d29fb89d"
  );

  console.log(test);
}

testTraktConnection();*/

/*async function testTraktCurated() {
  let test = await trakt.getTraktCuratedList("trending", 10);

  console.log(test);
}

testTraktCurated();*/

/*async function testUserCustomList() {
  let test = await trakt.getUserCustomList(
    "painbringer112",
    "netflix-top-10-shows"
  );

  console.log(test);
}

testUserCustomList();*/
/*
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
