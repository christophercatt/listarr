import React from "react";

const Card = (props) => {
  const toggleModal = (e) => {
    e.preventDefault();
    const modal = document.getElementById(props.name);
    modal.classList.toggle("is-active");
  };

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
