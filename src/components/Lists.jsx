import React, { useState } from "react";
import Card from "./Card.jsx";
import AddList from "./AddList.jsx";

const List = (props) => {
  const [isAddingList, setIsAddingList] = useState(false);

  const lists = props.lists;
  const setList = (childData) => {
    if (childData !== null) {
      let l = lists;
      l.push(childData);
      props.addList(l);
    }

    setIsAddingList(false);
  };

  const deleteList = (childData) => {
    if (childData !== null) {
      let l = lists;
      const index = l.indexOf(childData);

      if (index > -1) {
        l.splice(index, 1);
        props.addList(l);
      }
    }

    setIsAddingList(false);
  };

  const l = lists.map((list, index) => (
    <Card list={list} cardId={index} deleteList={deleteList} />
  ));

  let displayLists;
  if (lists.length === 0) {
    displayLists = <h3 className="subtitle">No Lists to show</h3>;
  } else {
    displayLists = <div className="columns is-multiline">{l}</div>;
  }

  return (
    <section className="section">
      {isAddingList && (
        <AddList
          folders={props.folders}
          profiles={props.profiles}
          addList={setList}
        />
      )}
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
