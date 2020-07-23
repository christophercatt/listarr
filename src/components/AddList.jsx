import React, { useState } from "react";

const AddList = (props) => {
  const [listType, setListType] = useState("Custom");

  let handleChange = (e) => {
    setListType(e.target.value);
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
              <select onChange={handleChange} id="select">
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
        {(listType === "Custom" || listType === "Watchlist") && (
          <div className="field">
            <label className="label">Trakt.tv Username</label>
            <div className="control">
              <input
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
              <select>
                <option selected>Select a Quality Profile</option>
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
              <select>
                <option selected>Select a Folder</option>
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
              onClick={() => props.addList("1")}
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
