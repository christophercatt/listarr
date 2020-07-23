import React from "react";

const Card = (props) => {
  return (
    <div className="column is-one-third">
      <div className="box">
        <h5 className="subtitle">{props.name}</h5>
      </div>
    </div>
  );
};

export default Card;
