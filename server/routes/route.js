var express = require("express");
var axios = require("axios");
var router = express.Router();
const RespositoryController = require("../repositories/RepositoryController");

const repository = new RespositoryController();

var shows = new Set();
let lists = [];

router.post("/connection/test", async (req, res) => {
  let connectionStatus = await repository.testSettings(
    req.body.url,
    req.body.sonarrApiKey,
    req.body.traktApiKey
  );

  res.send(connectionStatus);
});

router.post("/connection/save", async (req, res) => {
  let setStatus = await repository.setSettings(
    req.body.url,
    req.body.sonarrApiKey,
    req.body.traktApiKey,
    req.body.interval
  );

  res.send(setStatus);
});

router.post("/lists", async (req, res) => {
  let data = {
    type: req.body.type,
    quality: req.body.quality,
    folder: req.body.folder,
  };

  if (req.body.type === "Custom") {
    //custom list
    data.username = req.body.username;
    data.listname = req.body.listname;
  } else if (req.body.type === "Watchlist") {
    //user watchlist
    data.username = req.body.username;
  } else {
    //trakt curated
    data.limit = req.body.limit;
  }

  lists.push(data);

  res.send(true);
});

router.get("/lists", (req, res) => {
  res.send(lists);
});

router.post("/trakt/list", async (req, res) => {
  let user = req.body.user;
  let list = req.body.list;

  let url =
    "https://api.trakt.tv/users/" + user + "/lists/" + list + "/items/show";

  console.log(url);

  try {
    let response = await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":
            "d04f391566cf6107225a431341d4272622eedda1e26abf49b5623899d29fb89d",
        },
      })
      .then(function (data) {
        //console.log(data.data);
        return data.data;
      })
      .catch(function (err) {
        return err;
      });

    res.send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }

  //console.log(response);
});

module.exports = router;
