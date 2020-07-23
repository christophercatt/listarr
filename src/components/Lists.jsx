import React, { useState } from "react";
import Card from "./Card.jsx";
import AddList from "./AddList.jsx";

const List = (props) => {
  const [isAddingList, setIsAddingList] = useState(false);

  const lists = props.lists;
  const callbackFunction = (childData) => {
    let l = lists;
    l.push(childData);
    props.addList(l);
    setIsAddingList(false);
  };

  const l = lists.map((list, index) => <Card name={list} />);

  let displayLists;
  if (lists.length === 0) {
    displayLists = <h3 className="subtitle">No Lists to show</h3>;
  } else {
    displayLists = <div className="columns is-multiline">{l}</div>;
  }

  return (
    <section className="section">
      {isAddingList && <AddList addList={callbackFunction} />}
      {!isAddingList && (
        <div>
          <div className="container has-text-centered">{displayLists}</div>
          <br />
          <div className="buttons is-centered my-5">
            <button
              onClick={() => setIsAddingList(true)}
              className="button is-link is-light"
            >
              Add a list
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default List;
