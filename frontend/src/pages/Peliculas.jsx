import React, { useState, useEffect } from "react";
import { fetchData } from "../services/fetchData";
import MovieCard from "./../features/pelicula/components/MovieCard"
import "./../styles/peliculas.css";

function Peliculas() {
  let [peliculas, setPeliculas] = useState([]);

  const api_key = import.meta.env.VITE_API_KEY_TMDB;

  useEffect(() => {
    fetchData(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES`
    )
      .then((result) => {
        setPeliculas(result.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [api_key]);

  return (
    <main className="peliculasMain  py-5">
      <section className="titulo-descripcion text-center py-3">
        <h1 className="text-white fw-bold">Películas en cartelera</h1>
        <p>Selecciona la película que quieras ver</p>
      </section>

      <section className="peliculas-container">
        {peliculas.length === 0 ? (
          <h2>No hay peliculas</h2>
        ) : (
          peliculas.map((pelicula) => (
            <MovieCard key={pelicula.id} pelicula={pelicula} />
          ))
        )}
      </section>
    </main>
  );
}

export default Peliculas;
