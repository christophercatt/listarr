const axios = require("axios");

class TraktRepository {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiVersion = "2";
    this.contentType = "application/json";
  }

  async getUserCustomList(user, list) {
    const url = `https://api.trakt.tv/users/${user}/lists/${list}/items/shows`;
    let shows = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "trakt-api-version": this.apiVersion,
          "trakt-api-key": this.apiKey,
        },
      })
      .then((data) => {
        data.data.forEach((entry) => {
          shows.push({ title: entry.show.title, tvdb: entry.show.ids.tvdb });
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          shows = "Invalid Username or List Name";
        } else {
          shows = "Unknown Error";
        }
      });

    return shows;
  }

  async getUserWatchList(user) {
    const url = `https://api.trakt.tv/users/${user}/watchlist/shows`;
    let shows = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "trakt-api-version": this.apiVersion,
          "trakt-api-key": this.apiKey,
        },
      })
      .then((data) => {
        data.data.forEach((entry) => {
          shows.push({ title: entry.show.title, tvdb: entry.show.ids.tvdb });
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          shows = "Invalid Username or No Watchlist";
        } else {
          shows = "Unknown Error";
        }
      });

    return shows;
  }

  async getTraktCuratedList(type) {
    let url = `https://api.trakt.tv/shows/${type}`;
    let shows = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "trakt-api-version": this.apiVersion,
          "trakt-api-key": this.apiKey,
        },
      })
      .then((data) => {
        data.data.forEach((entry) => {
          if (type == "popular") {
            shows.push({ title: entry.title, tvdb: entry.ids.tvdb });
          } else {
            shows.push({ title: entry.show.title, tvdb: entry.show.ids.tvdb });
          }
        });
      })
      .catch((err) => {
        shows = "Unknown Error";
      });

    return shows;
  }
}

module.exports = TraktRepository;
