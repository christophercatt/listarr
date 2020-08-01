var express = require("express");
var axios = require("axios");
var router = express.Router();
const RespositoryController = require("../repositories/RepositoryController");

const repository = new RespositoryController("./config/settings.json");

let lists = [];

setInterval(() => {
  repository.addShows(lists);
}, repository.interval * 60000);

router.post("/connection/test", async (req, res) => {
  let connectionStatus = await repository.testSettings(
    req.body.sonarrUrl,
    req.body.sonarrApiKey,
    req.body.traktApiKey
  );

  res.send(connectionStatus);
});

router.post("/connection/save", async (req, res) => {
  let setStatus = await repository.setSettings(
    req.body.sonarrUrl,
    req.body.sonarrApiKey,
    req.body.traktApiKey,
    req.body.interval
  );

  if (setStatus === "Success") {
    let folders = await repository.sonarr.getRootFolder();
    let quality = await repository.sonarr.getQualityProfiles();
    let data = {
      status: setStatus,
      folders: folders,
      profiles: quality,
    };

    res.send(data);
  } else {
    res.send(setStatus);
  }
});

router.post("/lists", async (req, res) => {
  let data = {
    type: req.body.type,
    quality: req.body.quality,
    folder: req.body.folder,
  };

  if (req.body.type === "Custom") {
    data.username = req.body.username;
    data.listname = req.body.listname;
  } else if (req.body.type === "Watchlist") {
    data.username = req.body.username;
  } else {
    data.limit = req.body.limit;
  }

  lists.push(data);

  repository.fs.writeDataToFile("./config/lists.json", lists);

  res.send(true);
});

router.post("/lists/update", async (req, res) => {
  lists = req.body;
  repository.fs.writeDataToFile("./config/lists.json", lists);
});

router.get("/lists", (req, res) => {
  res.send(lists);
});

router.get("/config", async (req, res) => {
  let config = await repository.getConfig();
  if (repository.fs.checkFileExists("./config/lists.json")) {
    lists = repository.fs.readDataFromFile("./config/lists.json");
  }
  config.lists = lists;
  res.send(config);
});

module.exports = router;
