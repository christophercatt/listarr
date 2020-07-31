const SonarrRepository = require("./SonarrRepository");
const TraktRepository = require("./TraktRepository");

class RepositoryController {
  sonarr = new SonarrRepository("", "");
  trakt = new TraktRepository("");
  interval = 60;

  async testSettings(sonarrURL, sonarrApiKey, traktApiKey) {
    let sonarrTest = await this.sonarr.testConnection(sonarrURL, sonarrApiKey);
    let traktTest = await this.trakt.testConnection(traktApiKey);

    if (sonarrTest === "Success" && traktTest === true) {
      return "Success";
    } else if (sonarrTest !== "Success" && traktTest === true) {
      return sonarrTest;
    } else if (sonarrTest === "Success" && traktTest !== true) {
      return "Trakt API Key Invalid";
    } else {
      return "Sonarr and Trakt Settings Have Errors";
    }
  }

  async setSettings(sonarrURL, sonarrApiKey, traktApiKey, interval) {
    try {
      this.sonarr = new SonarrRepository(sonarrURL, sonarrApiKey);
      this.trakt = new TraktRepository(traktApiKey);
      this.interval = interval;

      return "Success";
    } catch (err) {
      return "Error Saving Settings";
    }
  }

  async getConfig() {
    let folders = await this.sonarr.getRootFolder();
    let profiles = await this.sonarr.getQualityProfiles();

    let url = this.sonarr.baseUrl;
    url = url.substring(0, url.length - 4);

    let settings = {
      sonarrUrl: url,
      sonarrApiKey: this.sonarr.apiKey,
      traktApiKey: this.trakt.apiKey,
      interval: this.interval,
    };

    let data = {
      folders: folders,
      profiles: profiles,
    };

    if (settings.sonarrApiKey !== "" && settings.sonarrApiKey !== " ") {
      data.settings = settings;
    }

    return data;
  }

  async addShows(lists) {
    let shows = new Set();
    let existing = await this.sonarr.getExistingSeries();

    for (const list of lists) {
      let response;

      if (list.type === "Custom") {
        //custom list
        response = await this.trakt.getUserCustomList(
          list.username,
          list.listname
        );
      } else if (list.type === "Watchlist") {
        //user watchlist
        response = await this.trakt.getUserWatchList(list.username);
      } else {
        //popular, trending or anticipated
        response = await this.trakt.getTraktCuratedList(
          list.type.toLowerCase(),
          list.limit
        );
      }

      if (Array.isArray(response)) {
        response.forEach((show) => {
          if (!existing.includes(show.title)) {
            shows.add({
              title: show.title,
              tvdb: show.tvdb,
              quality: list.quality,
              folder: list.folder,
            });
          }
        });
      }
    }

    let list = Array.from(shows);

    if (list.length !== 0) {
      shows = await this.sonarr.listLookup(list);
      this.sonarr.addList(shows);
    }
  }
}

module.exports = RepositoryController;
