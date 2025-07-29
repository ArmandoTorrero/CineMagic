import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">
          CineMagic 
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

          <div className="navbar-nav">

            <NavLink to={'/'} className="nav-link active" aria-current="page">Inicio</NavLink>
            <NavLink to={'/peliculas'} className="nav-link">Peliculas</NavLink>
            <NavLink to={'/snacks'} className="nav-link">Snacks</NavLink>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Nav;
