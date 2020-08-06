var express = require("express");
var router = express.Router();
const RespositoryController = require("../repositories/RepositoryController");

const repository = new RespositoryController("./config/settings.json");

let lists = [];

let interval = repository.interval;
let intervalId;

function startInterval(_interval) {
  intervalId = setInterval(() => {
    repository.addShows(lists);
  }, _interval * 60000);
}

function restartInterval(_interval) {
  interval = _interval;
  clearInterval(intervalId);
  startInterval(interval);
}

startInterval(interval);

/*setInterval(() => {
  repository.addShows(lists);
}, r.interval * 60000);*/

router.post("/connection/test", async (req, res) => {
  let connectionStatus = await repository.testSettings(
    req.body.sonarrUrl,
    req.body.sonarrApiKey,
    req.body.traktApiKey
  );

  res.send(connectionStatus);
});

router.post("/connection/save", async (req, res) => {
  const URLCheck = req.body.sonarrUrl;
  let URLIncludes = false;
  if (
    URLCheck.includes("http") ||
    URLCheck.includes("https") ||
    URLCheck.includes("HTTP") ||
    URLCheck.includes("HTTPS")
  ) {
    URLIncludes = true;
  }
  console.log("URL contains http:// : " + URLIncludes);
  console.time("Set Settings - route.js");
  let setStatus = await repository.setSettings(
    req.body.sonarrUrl,
    req.body.sonarrApiKey,
    req.body.traktApiKey,
    req.body.interval
  );
  console.timeEnd("Set Settings - route.js");

  if (setStatus === "Success") {
    restartInterval(req.body.interval);

    console.time("Get Sonarr Folders - route.js");
    let folders = await repository.sonarr.getRootFolder();
    console.timeEnd("Get Sonarr Folders - route.js");
    console.time("Get Sonarr Qualities - route.js");
    let quality = await repository.sonarr.getQualityProfiles();
    console.timeEnd("Get Sonarr Qualities - route.js");
    let data = {
      status: setStatus,
      folders: folders,
      profiles: quality,
    };

    res.send(data);
  } else {
    console.log("setStatus failed");
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
    let limit = req.body.limit;
    if (limit === "" || limit === " ") {
      limit = "10";
    }

    data.limit = limit;
  }

  lists.push(data);

  repository.fs.writeDataToFile("./config/lists.json", lists);

  res.send(true);
});

router.post("/lists/update", async (req, res) => {
  lists = req.body;
  repository.fs.writeDataToFile("./config/lists.json", lists);
  res.send(true);
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
