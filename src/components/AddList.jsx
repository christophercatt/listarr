import React, { useState } from "react";
import Axios from "axios";

const AddList = (props) => {
  const [listType, setListType] = useState("Custom");

  let handleChange = (e) => {
    setListType(e.target.value);
  };

  const addList = () => {
    let type = listType;
    let quality = document.getElementById("qualitySelect").value;
    let folder = document.getElementById("folderSelect").value;

    let data = {
      type: type,
      quality: quality,
      folder: folder,
    };

    if (listType === "Custom") {
      data.username = document.getElementById("userName").value;
      data.listname = document.getElementById("listName").value;
    } else if (listType === "Watchlist") {
      data.username = document.getElementById("userName").value;
    } else {
      data.limit = document.getElementById("limit").value;
    }

    Axios.post("/lists", data)
      .then(() => {
        props.addList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                <option value="Watchlist">Watchlist</option>
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
              <select id="qualitySelect">
                <option value="?" selected>
                  Select a Quality Profile
                </option>
              </select>
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
              <select id="folderSelect">
                <option value="?" selected>
                  Select a Folder
                </option>
              </select>
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
