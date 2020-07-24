class TraktRepository {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiVersion = "2";
    this.contentType = "application/json";
  }

  getUserCustomList() {}

  getUserWatchList() {}

  getTraktCuratedList() {}
}

export default TraktRepository;
