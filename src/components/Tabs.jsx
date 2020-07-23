import React, { useState } from "react";
import Lists from "./Lists.jsx";
import Settings from "./Settings.jsx";

const Tabs = (props) => {
  const [listSelected, setListSelected] = useState(true);

  return (
    <section className="section">
      <div class="tabs is-medium is-centered">
        <ul>
          <li className={`${listSelected ? "is-active" : ""}`}>
            <a href="#" onClick={() => setListSelected(true)}>
              <span class="icon is-small">
                <i class="fas fa-th-list"></i>
              </span>
              <span>Lists</span>
            </a>
          </li>
          <li className={`${listSelected ? "" : "is-active"}`}>
            <a href="#" onClick={() => setListSelected(false)}>
              <span class="icon is-small">
                <i class="fas fa-cogs"></i>
              </span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>
      {listSelected && <Lists lists={props.lists} addList={props.addList} />}
      {!listSelected && <Settings />}
    </section>
  );
};

export default Tabs;
