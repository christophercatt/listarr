import React from "react";

const Tabs = () => {
  return (
    <div class="tabs is-medium is-centered">
      <ul>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-th-list"></i>
            </span>
            <span>Lists</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-cogs"></i>
            </span>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
