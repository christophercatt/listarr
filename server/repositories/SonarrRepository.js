const axios = require("axios");

class SonarrRepository {
  constructor(url, apiKey) {
    this.baseUrl = `${url}/api`;
    this.apiKey = apiKey;
    this.contentType = "application/json";
  }

  async testConnection(url, apiKey) {
    url = `${url}/api/system/status`;

    let response = await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "X-Api-Key": apiKey,
        },
      })
      .then(() => {
        return "Success";
      })
      .catch((err) => {
        if (err.hasOwnProperty("code")) {
          return "Invalid URL";
        } else if (err.hasOwnProperty("stack") && !err.hasOwnProperty("code")) {
          return "Invalid API Key";
        } else {
          return "Unknown Error";
        }
      });

    return response;
  }

  async getExistingSeries() {
    const url = `${this.baseUrl}/series`;
    let shows = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "X-Api-Key": this.apiKey,
        },
      })
      .then((data) => {
        data.data.forEach((show) => {
          shows.push(show.title);
        });
      })
      .catch((err) => {
        shows = "Error Receiving Existing Shows";
      });

    return shows;
  }

  itemLookup() {}

  addList() {}
}

module.exports = SonarrRepository;
