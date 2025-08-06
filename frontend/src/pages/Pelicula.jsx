import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../services/fetchData";
import { useParams } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./../styles/pelicula.css";

function Pelicula() {

  const [Img, setImg] = useState("");
  const [Title, setTitle] = useState("");
  const [Duracion, setDuracion] = useState();
  const [Descripcion, setDescripcion] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [logo, setLogo] = useState(null); 
  const [selected, setSelected] = useState(false); 
  const [horario, setHorario] = useState(null); 
  const [fecha, setFecha] = useState(null); 
  const [count, setCount] = useState(1); 
  
  const { id } = useParams();
    const inputCalendarRef = useRef(null);

  const handleSelected = (ev) => {
    setSelected(true); 
    setHorario(ev.target.value)
    setFecha(inputCalendarRef.current.value)

    const buttons = document.querySelectorAll('.horario-button'); 
    
    buttons.forEach(btn => btn.classList.remove("selected"))

    ev.target.classList.add("selected"); 
    
  }

  const aumentar = () => {
    setCount(prev => prev + 1)
  }

  const restar = () => {

    if(count == 1) return; 

    setCount(prev => prev - 1)
  }

  useEffect(() => {
    const cargarDatosPelicula = async () => {
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

        // Datos basicos
        setImg(movieInfo.backdrop_path);
        setTitle(movieInfo.title);
        setDuracion(movieInfo.runtime);
        setDescripcion(movieInfo.overview);
        
        // Filtramos los logos en español y escogemos el primero
        const logos = imagenes.logos.filter(logo => logo.iso_639_1 === "es" || logo.iso_639_1 === "en")
        setLogo(logos[0])

        // Trailer - con validación mejorada
        const trailerEncontrado = videos.results?.find(
          (video) =>
            video.type === "Trailer" && video.site === "YouTube" && video.key // Asegurarse de que tenga key
        );

        setTrailer(trailerEncontrado || null);
        
      } catch (error) {
        console.error("Error cargando datos de la película:", error);
      }
    };

    cargarDatosPelicula();
  }, [id]);


  useEffect(() => {

    const fp = flatpickr(inputCalendarRef.current, {
      dateFormat: "d/m/Y", // Formato que prefieras
      minDate: "today", // No fechas pasadas
      defaultDate: "today", // Fecha por defecto
      onChange: function (selectedDates, dateStr) {
        console.log("Fecha seleccionada:", dateStr);
        setFecha(dateStr)
        // Aquí puedes hacer lo que necesites con la fecha
      },
      onReady: function (selectedDates,dateStr) {
        setFecha(dateStr)
      }
    });

    // Cleanup cuando se desmonte el componente
    return () => fp.destroy();
  }, []);

  const backgroundImageUrl = Img
    ? `https://image.tmdb.org/t/p/w1280${Img}`
    : "";

  const horarios = [
    "17:00",
    "19:00",
    "21:00",
    "22:00"
  ]

  return (
    <>
      <section className="main">

        <section
          className="movie-banner bg-cover bg-center bg-no-repeat p-3"
          style={{
            backgroundImage: backgroundImageUrl
              ? `url(${backgroundImageUrl})`
              : "none",
          }}
        >
          <h1 className=""> {Title} </h1>
          <p className="fs-3"> {`${Duracion}min`} </p>
        </section>

        <section className="movie-info">

            <article className="logo">
                {logo && (
                    <img
                        width="400px" 
                        src={`https://image.tmdb.org/t/p/original${logo.file_path}`} 
                        alt="logo" 
                    />
                )}
            </article>

          <article className="title-description">
            <h1 className="fw-bold"> {Title} </h1>
            <p> {Descripcion} </p>
          </article>

          <article className="trailer">
            {trailer && trailer.key ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                width="100%"
                height="315"
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="no-trailer">
                <p>No hay trailer disponible para esta película</p>
              </div>
            )}
          </article>

        </section>


        <section className="horario-infoCompra">

            <section className="fecha-horario">

                <h1 className="fw-bold">Selecciona fecha y horario</h1>

                <article className="fecha">

                    <h1 className="fs-5">
                    <i className="fa-solid fa-calendar text-[#f59f0a]"></i> Selecciona una fecha
                    </h1>
                    <input
                        ref={inputCalendarRef} 
                        type="calendar" 
                        placeholder="Selecciona una fecha" 
                    />

                </article>

                <article className="horario">

                    <h1 className="fs-5"><i className="fa-solid fa-clock text-[#f59f0a]"></i> Horarios</h1>

                    <article className="horarios">
                        {horarios.map((horario, index) => (
                            <button className="horario-button" onClick={handleSelected} key={index} value={horario}> {horario} </button>
                        ))}
                    </article>

                </article>

            </section>

            <section className="infoCompra">
                <h1>Resumen de Reserva</h1>

                {!selected ? (
                    <p>No hay horarios seleccionados</p>
                ) : (
                    <>
                        <p>Horario seleccionado</p>
                        <span className="info-reserva text-white fw-bold"> {fecha} - {horario} </span>
                        
                        <p className="num-entradas">Número de entradas</p>

                        <article className="contador">
                            <button className="bg-white py-1 px-2" onClick={restar}>-</button>
                            <span className="text-white fw-bold px-4"> {count} </span>
                            <button className="bg-white py-1 px-2" onClick={aumentar}>+</button>
                        </article>

                        <hr />

                        <article className="total-continuar">

                            <div className="total w-full d-flex justify-between py-1">
                                <span className="text-white">Subtotal: </span> 
                                <span className="text-white fw-bold"> {`${12.5 * count}€`} </span>
                            </div>

                            <button className="continuar">Continuar a Snacks</button>
                        </article>

                    </>
                )}
            </section>
            
        </section> 
        
      </section>
    </>
  );
}

export default Pelicula;
