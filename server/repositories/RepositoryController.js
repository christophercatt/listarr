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

  async addListItems() {}
}

module.exports = RepositoryController;
