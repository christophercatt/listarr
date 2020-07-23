import React from "react";

const Settings = () => {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <div className="field">
            <label className="label">Sonarr URL</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="e.g. sonarr.domain.com or domain.com/sonarr"
              />
            </div>
            <p className="help">Where you access your Sonarr installation</p>
          </div>
          <div className="field">
            <label className="label">API Key</label>
            <div className="control">
              <input
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
              <button className="button is-link is-light">
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
