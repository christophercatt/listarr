const axios = require("axios");

class TraktRepository {
  constructor(apiKey) {
    this.headers = {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": apiKey,
    };
  }

  async testConnection(apiKey) {
    const url = "https://api.trakt.tv/shows/trending?page=1&limit=1";
    let connection = false;

    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": apiKey,
        },
      })
      .then(() => {
        connection = true;
      })
      .catch(() => {
        connection = false;
      });

    return connection;
  }

  async getUserCustomList(user, list) {
    const url = `https://api.trakt.tv/users/${user}/lists/${list}/items/shows`;
    const headers = this.headers;
    let shows = [];

    await axios
      .get(url, {
        headers,
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
    const headers = this.headers;
    let shows = [];

    await axios
      .get(url, {
        headers,
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

  async getTraktCuratedList(type, amount) {
    if (amount === undefined) {
      amount = 10;
    }

    let url = `https://api.trakt.tv/shows/${type}?page=1&limit=${amount}`;
    const headers = this.headers;
    let shows = [];

    await axios
      .get(url, {
        headers,
      })
      .then((data) => {
        data.data.forEach((entry) => {
          if (type === "popular") {
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
