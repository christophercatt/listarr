import React from "react";

const Card = (props) => {
  function toggleModal() {
    //e.preventDefault();
    const modal = document.getElementById(props.name);
    modal.classList.toggle("is-active");
  }

  function modalControl(id) {
    if (id === null) {
      props.deleteList(null);
    } else {
      props.deleteList(id);
    }
  }

  return (
    <div className="column is-one-third">
      <a onClick={toggleModal} href="#">
        <div className="box">
          <h5 className="subtitle">{props.name}</h5>
        </div>
      </a>
      <div id={props.name} class="modal">
        <div onClick={toggleModal} class="modal-background"></div>
        <div class="modal-content">
          <div className="box">
            <h5 className="subtitle">{props.name}</h5>

            <div className="buttons is-right">
              <button
                onClick={() => {
                  props.deleteList(props.name);
                  toggleModal();
                }}
                className="button is-link is-light"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  props.deleteList(null);
                  toggleModal();
                }}
                className="button is-link"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={toggleModal}
          class="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </div>
  );
};

export default Card;
