var express = require("express");
var axios = require("axios");
var router = express.Router();

var shows = new Set();

/*try {
  axios
    .get("https://sonarr.chriscatt.com/api/series", {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "dbba8221e16a40b0bf16772d333a18aa",
      },
    })
    .then(function (data) {
      data.data.forEach(function (show) {
        shows.add(show.title);
      });
      //console.log(data.data[0]);
    })
    .then(function () {
      console.log(shows.size);
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (err) {
  console.log(err);
}*/

router.get("/api/hello", (req, res) => {
  res.json("hello react");
});

router.post("/test-connection", async (req, res) => {
  let url = req.body.url;
  let apiKey = req.body.apiKey;

  url = `${url}/api/system/status`;

  try {
    let response = await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
      })
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        return err;
      });
    res.send(JSON.stringify(response));
  } catch (err) {
    console.log("err");
  }
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
