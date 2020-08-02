import React from "react";

const Navbar = () => {
  return (
    <div className="container is-fluid py-3 has-background-info">
      <div className="level is-mobile">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button
              className="button is-info is-medium"
              onClick={() => {
                window.open(
                  "https://github.com/christophercatt/listarr",
                  "_blank"
                );
              }}
            >
              <i className="fab fa-2x fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
