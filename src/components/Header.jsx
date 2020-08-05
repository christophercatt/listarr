import React from "react";

const Header = () => {
  return (
    <section className="section">
      <div className="container pt-3 has-text-centered">
        <h1 className="title">Listarr</h1>
        <p className="subtitle">
          Import shows from your favourite{" "}
          <a href="https://trakt.tv" target="_blank" rel="noopener noreferrer">
            Trakt.tv
          </a>{" "}
          lists directly into <strong>Sonarr!</strong>
        </p>
      </div>
    </section>
  );
};

export default Header;
