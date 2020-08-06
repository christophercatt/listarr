import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

const AddList = (props) => {
  const [listType, setListType] = useState("Custom");

  let handleChange = (e) => {
    setListType(e.target.value);
  };

  const addList = () => {
    const type = listType;
    const sel = document.getElementById("qualitySelect");
    const quality = sel.value;
    const qualityName = sel.options[sel.selectedIndex].text;
    const folder = document.getElementById("folderSelect").value;

    let data = {
      type: type,
      quality: quality,
      qualityName: qualityName,
      folder: folder,
    };

    let empty = false;

    if (listType === "Custom") {
      data.username = document.getElementById("userName").value;
      data.listname = document.getElementById("listName").value;
      if (
        data.username === "" ||
        data.username === " " ||
        data.listname === "" ||
        data.listname === " "
      ) {
        empty = true;
      }
    } else if (listType === "Watchlist") {
      data.username = document.getElementById("userName").value;
      if (data.username === "" || data.username === " ") {
        empty = true;
      }
    } else {
      if (listType === "Recommended" || listType === "Watched") {
        const timePeriod = document.getElementById("timePeriod").value;
        data.timePeriod = timePeriod;
      }

      let limit = document.getElementById("limit").value;
      if (limit === "" || limit === " ") {
        limit = "10";
      }
      data.limit = limit;
    }

    if (empty) {
      let button = document.getElementById("addBtn");
      button.innerHTML = "One Or More Empty Fields";
      button.classList.remove("is-link");
      button.classList.add("is-danger");

      setTimeout(() => {
        button.innerHTML = "Add";
        button.classList.remove("is-danger");
        button.classList.add("is-link");
      }, 3000);
    } else {
      Axios.post("/lists", data)
        .then(() => {
          props.addList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let err = false;
  let folders;
  let profiles;

  if (props.folders === "Error Getting Root Folders") {
    err = true;
    folders = (
      <option value="Error">Error. Please Check Connection Settings</option>
    );
  } else {
    folders = props.folders.map((folder, index) => (
      <option value={folder.path}>{folder.path}</option>
    ));
  }

  if (props.profiles === "Error Getting Profiles") {
    err = true;
    profiles = (
      <option value="Error">Error. Please Check Connection Settings</option>
    );
  } else {
    profiles = props.profiles.map((profile, index) => (
      <option value={profile.profileId}>{profile.name}</option>
    ));
  }

  useEffect(() => {
    if (err === true) {
      document.getElementById("addBtn").disabled = true;
    }
  });

  return (
    <div className="columns is-centered">
      <div className="column is-one-third">
        <div class="field">
          <label htmlFor="" className="label">
            Trakt.tv List Type
          </label>
          <p class="control has-icons-left is-expanded">
            <span class="select is-fullwidth">
              <select onChange={handleChange} id="typeSelect">
                <option value="Trending">Trending</option>
                <option value="Popular">Popular</option>
                <option value="Anticipated">Anticipated</option>
                <option value="Watched">Most Watched</option>
                <option value="Recommended">Recommended</option>
                <option value="Watchlist">User Watchlist</option>
                <option selected value="Custom">
                  Custom
                </option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-film"></i>
            </span>
          </p>
        </div>
        {(listType === "Watched" || listType === "Recommended") && (
          <div class="field">
            <label className="label">Time Period</label>
            <p class="control has-icons-left is-expanded">
              <span class="select is-fullwidth">
                <select id="timePeriod">
                  <option selected value="weekly">
                    Weekly
                  </option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="all">All Time</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </p>
          </div>
        )}
        {listType !== "Custom" && listType !== "Watchlist" && (
          <div className="field">
            <label className="label">Limit</label>
            <div className="control">
              <input
                id="limit"
                type="number"
                step="1"
                placeholder="10"
                className="input"
              />
            </div>
            <p className="help">
              Max amount of TV shows to grab (Default = 10)
            </p>
          </div>
        )}
        {(listType === "Custom" || listType === "Watchlist") && (
          <div className="field">
            <label className="label">Trakt.tv Username</label>
            <div className="control">
              <input
                id="userName"
                type="text"
                className="input"
                placeholder="e.g. 'painbringer112'"
              />
            </div>
          </div>
        )}
        {listType === "Custom" && (
          <div className="field">
            <label className="label">List Name</label>
            <div className="control">
              <input
                id="listName"
                type="text"
                className="input"
                placeholder="e.g. 'netflix-top-10-shows'"
              />
            </div>
          </div>
        )}
        <div className="field">
          <label htmlFor="" className="label">
            Quality Profile
          </label>
          <p class="control has-icons-left is-expanded">
            <span class="select is-fullwidth">
              <select id="qualitySelect">{profiles}</select>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-broadcast-tower"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Folder
          </label>
          <p class="control has-icons-left is-expanded">
            <span class="select is-fullwidth">
              <select id="folderSelect">{folders}</select>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-folder"></i>
            </span>
          </p>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={() => props.addList(null)}
              className="button is-link is-light"
            >
              Cancel
            </button>
          </div>
          <div className="control">
            <button
              onClick={() =>
                //props.addList(document.getElementById("userName").value);
                addList()
              }
              id="addBtn"
              className="button is-link"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddList;
