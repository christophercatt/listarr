const express = require("express");
const cors = require("cors");
const path = require("path");

/* Tests for SonarrRepository
 **
const SonarrRepository = require("./repositories/SonarrRepository");

const sonarr = new SonarrRepository(
  "",
  ""
);

async function testSonnarGetExisting() {
  let test = await sonarr.getExistingSeries();

  console.log(test);
}

testSonnarGetExisting();

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
  ""
);

/*async function testUserWatchList() {
  let test = await trakt.getUserWatchList("lish408");

  console.log(test);
}

testUserWatchList();*/

/*async function testTraktCurated() {
  let test = await trakt.getTraktCuratedList("popular");

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
