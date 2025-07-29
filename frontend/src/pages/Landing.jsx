import React, { useState } from 'react'
import { useEffect } from "react";
import { fetchData } from "./../components/fetchData";
function Landing() {

  let [peliculas, setPeliculas] = useState([]); 

  const api_key = import.meta.env.VITE_API_TMDB;

  useEffect( () => {
     fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES`).then((result) => {
        setPeliculas(result.results);         
        
     }).catch((err) => {
      console.error(err);
      
     });

  },[api_key]) 
  
  if (peliculas.length === 0) return <p>No hay peliculas</p>

  return (
    <section className="peliculas">
      {peliculas.map(pelicula => (
        <article className="pelicula" key={pelicula.id}>
          <h1> {pelicula.title} </h1>
          <p> {pelicula.overview} </p>
        </article>
      ))}
    </section>
  )
}

export default Landing