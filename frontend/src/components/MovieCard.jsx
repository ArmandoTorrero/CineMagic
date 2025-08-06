import React from "react";
import { NavLink } from "react-router-dom";


function MovieCard({ pelicula }) {
  return (
    <article className="pelicula">
      <div className="poster-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt=""
        />
      </div>

      <div className="content p-3">
        <h3 className="fs-5 fw-bold"> {pelicula.title} </h3>
        <p> {`${pelicula.overview.split(".")[0]}`  || "Sin descripción"} </p>
        <NavLink to={`/pelicula/${pelicula.id}`}>Seleccionar película</NavLink>
        <span className="puntuacion">
          <i className="fa-solid fa-star"></i> {pelicula.vote_average}
        </span>
      </div>
    </article>
  );
}

export default MovieCard;
