import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Settings = (props) => {
  useEffect(() => {
    if (props.sonarrUrl !== undefined) {
      document.getElementById("url").value = props.sonarrUrl;
      document.getElementById("sonarrApiKey").value = props.sonarrApiKey;
      document.getElementById("traktApiKey").value = props.traktApiKey;
      document.getElementById("interval").value = props.interval;
    }
  });

  const connection = async (type) => {
    let button;
    let inputs = document.querySelectorAll("input[type=text]");
    let err = true;
    let values = [];

    inputs.forEach((input) => {
      values.push(input.value);
    });

    if (type) {
      button = document.getElementById("testConnection");
    } else {
      button = document.getElementById("saveConnection");
    }

    if (values.includes("") || values.includes(" ")) {
      button.innerHTML = "One Or More Empty Fields!";
    } else {
      let sonarrUrl = document.getElementById("url").value;
      let sonarrApiKey = document.getElementById("sonarrApiKey").value;
      let traktApiKey = document.getElementById("traktApiKey").value;
      let postUrl;

      let data = {
        sonarrUrl: sonarrUrl,
        sonarrApiKey: sonarrApiKey,
        traktApiKey: traktApiKey,
      };

      //type = true then test, else save
      if (type) {
        postUrl = "/connection/test";
      } else {
        data.interval = document.getElementById("interval").value;
        postUrl = "/connection/save";
      }

      button.classList.toggle("is-loading");

      let response = await axios.post(postUrl, data).then((data) => {
        return data.data;
      });

      if (response === "Success" || response.status === "Success") {
        err = false;
        button.innerHTML = response;
      }

      if (!type && response.status === "Success") {
        response.data = data;
        props.setSettings(response);

        button.innerHTML = response.status;
      }

      button.classList.toggle("is-loading");
    }

    if (err === true) {
      button.classList.remove("is-link");
      button.classList.add("is-danger");
    }

    setTimeout(() => {
      button.innerHTML = type ? "Test Connection" : "Save";
      if (err === true) {
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
            <label className="label">Sonarr API Key</label>
            <div className="control">
              <input
                id="sonarrApiKey"
                type="text"
                className="input"
                placeholder="In 'Settings > General > Security'"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Trakt API Key</label>
            <div className="control">
              <input
                id="traktApiKey"
                type="text"
                className="input"
                placeholder="Create at https://trakt.tv/oauth/applications/new"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Update Interval (In Minutes)</label>
            <div className="control">
              <input
                id="interval"
                type="number"
                min="30"
                max="10080"
                step="5"
                placeholder="60"
                className="input"
              />
            </div>
            <p className="help">
              How often to check for list updates. Default 60. (Min. 30 minutes,
              Max. 10080 minutes - one week)
            </p>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                id="testConnection"
                onClick={() => connection(true)}
                className="button is-link is-light"
              >
                Test Connection
              </button>
            </div>
            <div className="control">
              <button
                id="saveConnection"
                onClick={() => connection(false)}
                className="button is-link"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
