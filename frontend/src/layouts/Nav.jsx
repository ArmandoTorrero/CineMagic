import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (

    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink to={'/'} target="_self" className="navbar-brand">
          <i className="fa-solid fa-film"></i> CineMagic 
        </NavLink>
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

            <NavLink to={'/login'} className="nav-link active" aria-current="page"><span className="login">Iniciar sesión</span></NavLink>
            <NavLink to={'/peliculas'} className="nav-link">Peliculas</NavLink>
            <NavLink to={'/snacks'} className="nav-link">Snacks</NavLink>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Nav;
