import React from "react";

const Navbar = () => {
  return (
    /*<div className="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <div className="navbar-item">
            <h3 className="title">Sonarr-Trakt</h3>
          </div>
        </div>

        <div id="navMenu" class="navbar-menu is-active">
          <div className="navbar-start"></div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light is-medium">
                  <i class="fas fa-cogs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>*/
    <div className="container is-fluid py-3 has-background-primary">
      <div className="level is-mobile">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-primary is-medium">
              <i className="fab fa-2x fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
