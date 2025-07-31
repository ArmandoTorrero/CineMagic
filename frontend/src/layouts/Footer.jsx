import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <section className="links">
        <section className="section-1">
          <h1>CineMagic</h1>
          <p>
            Reserva campos deportivos de forma fácil y rapida. Encuentra tu
            deporte favorito en un solo lugar.
          </p>
        </section>
        <section className="section-2">
          <h1>Enlaces útiles</h1>
          <ul>
            <li>
              <NavLink to={"/"} target="_self">Inicio</NavLink>
            </li>
            <li>
              <NavLink to={"/login"} target="_self">Iniciar sesión</NavLink>
            </li>
            <li>
              <NavLink to={"/peliculas"} target="_self">Películas</NavLink>
            </li>
            <li>
              <NavLink to={"Snacks"} target="_self">Snacks</NavLink>
            </li>
          </ul>
        </section>
        <section className="section-3">
          <h1>Contacto</h1>
          <ul>
            <li>Calle principal 123</li>
            <li>51002 Ceuta</li>
            <li>CineMagic@gmail.com</li>
            <li>+34 600 000 000</li>
          </ul>
        </section>
      </section>

      <hr />

      <section className="derechos-RRSS">
        <article className="derechos">
          <p>&copy 2025 CineMagic. Todos los derechos reservados.</p>
        </article>

        <article className="RRSS">
          <NavLink to={''} target="_self">
            <i className="fa-brands fa-facebook"></i>
          </NavLink>
          <NavLink to={''} target="_self">
            <i className="fa-brands fa-instagram"></i>
          </NavLink>
          <NavLink to={''} target="_self">
            <i className="fa-brands fa-twitter"></i>
          </NavLink>
        </article>
      </section>
    </footer>
  );
}

export default Footer;
