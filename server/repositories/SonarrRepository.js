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

  async getQualityProfiles() {
    const url = `${this.baseUrl}/profile`;
    let profiles = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "X-Api-Key": this.apiKey,
        },
      })
      .then((data) => {
        data = data.data;

        data.forEach((profile) => {
          profiles.push({ name: profile.name, profileId: profile.id });
        });
      })
      .catch((err) => {
        profiles = "Error Getting Profiles";
      });

    return profiles;
  }

  async getRootFolder() {
    const url = `${this.baseUrl}/rootFolder`;
    let rootFolders = [];

    await axios
      .get(url, {
        headers: {
          "Content-Type": this.contentType,
          "X-Api-Key": this.apiKey,
        },
      })
      .then((data) => {
        data = data.data;

        data.forEach((folder) => {
          rootFolders.push({ id: folder.id, path: folder.path });
        });
      })
      .catch((err) => {
        rootFolders = "Error Getting Root Folders";
      });

    return rootFolders;
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

  async listLookup(list) {
    let shows = [];
    let failed = [];

    for (const show of list) {
      let url = `${this.baseUrl}/series/lookup?term=tvdb:${show.tvdb}`;

      await axios
        .get(url, {
          headers: {
            "Content-Type": this.contentType,
            "X-Api-Key": this.apiKey,
          },
        })
        .then((data) => {
          data = data.data[0];

          shows.push({
            tvdb: data.tvdbId,
            title: data.title,
            titleSlug: data.titleSlug,
            images: data.images,
            seasons: data.seasons,
          });
        })
        .catch((err) => {
          failed.push(show.title);
          //shows = "Show Not Found - is Trakt ID Correct?";
        });
    }

    if (failed.length !== 0) {
      shows.push({ failedShows: failed });
    }

    return shows;
  }

  addList() {}
}

module.exports = SonarrRepository;
