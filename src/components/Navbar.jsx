import React from "react";

const Navbar = () => {
  return (
    <div className="container is-fluid py-3 has-background-info">
      <div className="level is-mobile">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-info is-medium">
              <a href="https://github.com/christophercatt/listarr">
                <i className="fab fa-2x fa-github"></i>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
