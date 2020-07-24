import React from "react";
import axios from "axios";

const Settings = () => {
  const testConnection = async () => {
    let url = document.getElementById("url").value;
    let apiKey = document.getElementById("apiKey").value;
    const button = document.getElementById("testConnection");

    button.classList.toggle("is-loading");

    let resp = await axios
      .post("/test-connection", {
        url: url,
        apiKey: apiKey,
      })
      .then((data) => {
        return data.data;
      });

    let err = true;

    if (resp.hasOwnProperty("version")) {
      err = false;
      button.innerHTML = "Success";
    } else if (resp.hasOwnProperty("code")) {
      button.innerHTML = "Invalid URL";
    } else if (resp.hasOwnProperty("stack") && !resp.hasOwnProperty("code")) {
      button.innerHTML = "Invalid API Key";
    } else {
      button.innerHTML = "Unknown Error";
    }

    if (err == true) {
      button.classList.remove("is-link");
      button.classList.add("is-danger");
    }

    button.classList.toggle("is-loading");

    setTimeout(() => {
      button.innerHTML = "Test Connection";
      if (err == true) {
        button.classList.remove("is-danger");
        button.classList.add("is-link");
      }
    }, 3000);
  };

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <div className="field">
            <label className="label">Sonarr URL</label>
            <div className="control">
              <input
                id="url"
                type="text"
                className="input"
                placeholder="e.g. https://sonarr.domain.com or http://domain.com/sonarr"
              />
            </div>
            <p className="help">
              Where you access your Sonarr installation (please include http/s
              in the URL)
            </p>
          </div>
          <div className="field">
            <label className="label">API Key</label>
            <div className="control">
              <input
                id="apiKey"
                type="text"
                className="input"
                placeholder="In 'Settings > General > Security'"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Update Interval (In Minutes)</label>
            <div className="control">
              <input
                type="number"
                min="30"
                max="10080"
                step="5"
                placeholder="60"
                className="input"
              />
            </div>
            <p className="help">
              How often to check for list updates. (Min. 30 minutes, Max. 10080
              minutes - one week)
            </p>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                id="testConnection"
                onClick={testConnection}
                className="button is-link is-light"
              >
                Test Connection
              </button>
            </div>
            <div className="control">
              <button className="button is-link">Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
