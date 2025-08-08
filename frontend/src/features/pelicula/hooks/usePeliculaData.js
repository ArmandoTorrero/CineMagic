import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "./../../../services/fetchData";


export function usePeliculaData(id) {

    const [datos, setDatos] = useState({
        img: "",
        title: "",
        duracion: null,
        descripcion: "",
        trailer: null,
        logo: null,
    });

    useEffect(() => {
        
        const cargar = async () => {

            try {

                const [movieInfo,videos,imagenes] = await Promise.all([
                    fetchData(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${
                        import.meta.env.VITE_API_KEY_TMDB
                        }&language=es-ES`
                    ),
                    fetchData(
                        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
                        import.meta.env.VITE_API_KEY_TMDB
                        }`
                    ),
                    fetchData(
                        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
                        import.meta.env.VITE_API_KEY_TMDB
                        }`
                    ),
                ]);    

                // Filtramos los logos en español y escogemos el primero
                const logos = imagenes.logos.filter(logo => logo.iso_639_1 === "es" || logo.iso_639_1 === "en")
                // Trailer - con validación mejorada
                const trailerEncontrado = videos.results?.find((video) => video.type === "Trailer" && video.site === "YouTube" && video.key);
                setDatos({
                    img: movieInfo.backdrop_path,
                    title: movieInfo.title,
                    duracion: movieInfo.runtime,
                    descripcion: movieInfo.overview,
                    trailer: trailerEncontrado || null,
                    logo: logos[0] || null,
                });

            } catch (error) {
                console.error(error);
                
            }
        }

        cargar(); 

    }, [id])
    
    return datos; 
}