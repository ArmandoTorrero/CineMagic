import React, { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../services/fetchData";
import { NavLink } from "react-router-dom";
import "./../styles/landing.css";
import MovieCard from "./../features/pelicula/components/MovieCard";

function Landing() {
  let [peliculas, setPeliculas] = useState([]);

  const api_key = import.meta.env.VITE_API_KEY_TMDB;

  useEffect(() => {
    fetchData(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES`
    )
      .then((result) => {
        setPeliculas(result.results.slice(0, 3));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [api_key]);

  return (
    <>
      <section className="hero column-center py-5 px-3">
        <h1 className="hero-title w-75 text-center fw-bold">
          Bienvenido a <strong>CineMagic</strong>
        </h1>
        <p className="text-center max-w-[600px]">
          Vive la magia del cine con la mejor experiencia. Reserva tus películas
          favoritas, selecciona tus snacks y disfruta del mejor entretenimiento.
        </p>
        <article className="enlaces d-flex justify-center  w-100">
          <NavLink
            to={"/peliculas"}
            target="_self"
            className="border-none bg-[#f59f0a] fs-6"
          >
            <i className="fa-solid fa-film"></i>Ver películas
          </NavLink>
          <NavLink to={"/snacks"} target="_self" className="fs-6">
            <i className="fa-solid fa-cookie"></i>Snacks
          </NavLink>
        </article>
      </section>

      <section className="como-funciona py-5 px-3 bg-[#162034]">
        <h1 className="text-center fw-bold">¿Como funciona?</h1>

        <section className="steps">
          <article className="step">
            <div className="icon">
              <i className="fa-solid fa-film"></i>
            </div>
            <h2>1. Elige tu película</h2>
            <p>Selecciona de nuestra amplia cartelera de películas</p>
          </article>

          <article className="step">
            <div className="icon">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <h2>2. Horario y fecha</h2>
            <p>Escoge el horario que mejor se adapte a ti</p>
          </article>

          <article className="step">
            <div className="icon">
              <i className="fa-solid fa-cookie-bite"></i>
            </div>
            <h2>3. Agrega snacks</h2>
            <p>Completa tu experiencia con deliciosos snacks</p>
          </article>

          <article className="step">
            <div className="icon">
              <i className="fa-solid fa-credit-card"></i>
            </div>
            <h2>4. Paga seguro</h2>
            <p>Finaliza tu compra de forma rápida y segura</p>
          </article>
        </section>
      </section>

      <section className="info py-5">
        <article>
          <h3>+50K</h3>
          <p>Usuarios activos</p>
        </article>

        <article>
          <h3>+200</h3>
          <p>Películas disponibles</p>
        </article>

        <article>
          <h3>15</h3>
          <p>Salas de cine</p>
        </article>

        <article>
          <h3>4.9</h3>
          <p>Puntuacón promedio</p>
        </article>
      </section>

      <section className="peliculas py-4 bg-[#192235]">
        
        <h1 className="title fw-bold text-center">Películas destacadas</h1>

        <section className="destacadas px-4">
          {peliculas.length === 0 ? (
            <h2>No hay peliculas</h2>
          ) : (
            peliculas.map((pelicula) => (
              <MovieCard key={pelicula.id} pelicula={pelicula} />
            ))
          )}
        </section>
      </section>

      <section className="valoraciones">
        <h1 className="title py-5 fw-bold fs-4 text-center">
          Lo que dicen nuestros usuarios
        </h1>

        <article className="valoracion">
          <div className="estrellas"></div>

          <div className="comentario">
            <p></p>
          </div>

          <div className="usuario">
            <div className="pfp"></div>
            <p className="nombre"></p>
          </div>
        </article>

        <article className="valoracion">
          <div className="estrellas"></div>

          <div className="comentario">
            <p></p>
          </div>

          <div className="usuario">
            <div className="pfp"></div>
            <p className="nombre"></p>
          </div>
        </article>

        <article className="valoracion">
          <div className="estrellas"></div>

          <div className="comentario">
            <p></p>
          </div>

          <div className="usuario">
            <div className="pfp"></div>
            <p className="nombre"></p>
          </div>
        </article>
      </section>

      <section className="elegir-cine bg-[#121d2f]">
        <h1 className="title py-5 text-center text-white fw-bold">
          ¿Por que elegir CineMagic?
        </h1>

        <section className="izq-der px-4 py-3">
          <article className="izquierda d-flex flex-row flex-wrap">
            <section className="motivo d-flex">
              <article className="icon">
                <i className="fa-solid fa-calendar"></i>
              </article>

              <article className="texto">
                <h3>Reserva anticipada</h3>
                <p>
                  Asegura tu lugar hasta con 30 días de anticipación. Nunca más
                  te quedarás sin boletos.
                </p>
              </article>
            </section>

            <section className="motivo d-flex">
              <article className="icon">
                <i className="fa-solid fa-calendar"></i>
              </article>

              <article className="texto">
                <h3>Reserva anticipada</h3>
                <p>
                  Asegura tu lugar hasta con 30 días de anticipación. Nunca más
                  te quedarás sin boletos.
                </p>
              </article>
            </section>

            <section className="motivo d-flex">
              <article className="icon">
                <i className="fa-solid fa-calendar"></i>
              </article>

              <article className="texto">
                <h3>Reserva anticipada</h3>
                <p>
                  Asegura tu lugar hasta con 30 días de anticipación. Nunca más
                  te quedarás sin boletos.
                </p>
              </article>
            </section>

            <section className="motivo d-flex">
              <article className="icon">
                <i className="fa-solid fa-calendar"></i>
              </article>

              <article className="texto">
                <h3>Reserva anticipada</h3>
                <p>
                  Asegura tu lugar hasta con 30 días de anticipación. Nunca más
                  te quedarás sin boletos.
                </p>
              </article>
            </section>
          </article>

          <article className="derecha d-flex flex-col p-4 bg-[#433029]">
            <h1 className="fs-4">Únete a CineMagic</h1>
            <p>
              Más de 50,000 usuarios ya disfrutan de la mejor experiencia
              cinematográfica. ¿Qué estás esperando?
            </p>
            <ul className="text-white">
              <li>Acceso a infinidad de películas</li>
              <li>Snacks deliciosos</li>
              <li>Soporte 24/7</li>
            </ul>
          </article>
        </section>
      </section>

      <section className="comenzar column-center p-5">
        <h1 className="text-white">¿Listo para comenzar?</h1>
        <p>Únete a miles de usuarios que ya disfrutan de CineMagic</p>
        <NavLink to={""} className="fw-bold text-black rounded-md bg-[#f59f0a]">
          Comenzar ahora
        </NavLink>
      </section>
    </>
  );
}

export default Landing;
