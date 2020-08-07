import React from "react";

const Card = (props) => {
  function toggleModal() {
    const modal = document.getElementById(props.cardId);
    modal.classList.toggle("is-active");
  }

  const type = props.list.type;
  let label;

  if (type === "UserWatched") {
    label = "User Watched";
  } else if (type === "Collection") {
    label = "User Collected";
  } else {
    label = type;
  }

  return (
    <div className="column is-one-third">
      <div className="box has-text-left">
        {(type === "Anticipated" ||
          type === "Watched" ||
          type === "Recommended" ||
          type === "Trending" ||
          type === "Popular") && (
          <div>
            <div className="level mb-3">
              <div className="level-left">
                <p>Trakt.tv Curated</p>
              </div>
              <div className="level-right">
                <button
                  aria-label="delete"
                  className="delete"
                  onClick={toggleModal}
                ></button>
              </div>
            </div>

            <h5 className="title">
              {type === "Watched" ? "Most " : ""}
              {type}
            </h5>
          </div>
        )}
        {type === "Custom" && (
          <div>
            <div className="level mb-3">
              <div className="level-left">
                <p>{props.list.username}</p>
              </div>
              <div className="level-right">
                <button
                  aria-label="delete"
                  className="delete"
                  onClick={toggleModal}
                ></button>
              </div>
            </div>

            <h5 className="title">{props.list.listname}</h5>
          </div>
        )}
        {(type === "Watchlist" ||
          type === "Collection" ||
          type === "UserWatched") && (
          <div>
            <div className="level mb-3">
              <div className="level-left">
                <p>{props.list.username}</p>
              </div>
              <div className="level-right">
                <button
                  aria-label="delete"
                  className="delete"
                  onClick={toggleModal}
                ></button>
              </div>
            </div>

            <h5 className="title">{label}</h5>
          </div>
        )}

        <br />
        <div className="tags has-addons">
          <span className="tag">Folder: </span>
          <span className="tag is-info">{props.list.folder}</span>
        </div>
        <div className="tags has-addons">
          <span className="tag">Profile: </span>
          <span className="tag is-info">{props.list.qualityName}</span>
        </div>
      </div>

      <div id={props.cardId} className="modal">
        <div onClick={toggleModal} className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">Delete List</p>
            <button
              className="delete"
              aria-label="close"
              onClick={toggleModal}
            ></button>
          </header>
          <section className="modal-card-body has-text-centered">
            <p>
              Are you sure you wish to delete this list? This cannot be undone.
            </p>
            <br />
            <div className="buttons is-centered">
              <button
                onClick={() => {
                  props.deleteList(null);
                  toggleModal();
                }}
                className="button is-link is-light"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  props.deleteList(props.list);
                  toggleModal();
                }}
                className="button is-link"
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
