import React from "react";

const AddList = () => {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <h3 className="title">Add a custom user list...</h3>
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
          <div className="field">
            <div className="control">
              <div className="buttons is-centered">
                <button className="button is-link  mt-3">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third is-offset-1">
          <h3 className="title">...Or one of Trakt.tv's own!</h3>
          <div class="field">
            <label htmlFor="" className="label">
              Trakt.tv List Type
            </label>
            <p class="control has-icons-left is-expanded">
              <span class="select is-fullwidth">
                <select>
                  <option selected>Trending</option>
                  <option>Popular</option>
                  <option>Anticipated</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fas fa-film"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddList;
