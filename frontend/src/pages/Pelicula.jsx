import React, { useEffect, useRef, useState } from "react";
import { usePeliculaData } from "./../features/pelicula/hooks/usePeliculaData.js";
import Horarios from "../features/pelicula/components/Horarios/Horarios.jsx";
import LogoPelicula from "./../features/pelicula/components/LogoPelicula.jsx";
import Trailer from "./../features/pelicula/components/Trailer.jsx";
import ResumenReserva from "../features/pelicula/components/ResumenReserva";
import { useParams, useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./../styles/pelicula.css";

function Pelicula() {

  const { id } = useParams();
  const navigate = useNavigate();
  const inputCalendarRef = useRef(null);

  const { img, title, duracion, descripcion, trailer, logo } = usePeliculaData(id);

  const [selected, setSelected] = useState(false);
  const [horario, setHorario] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [count, setCount] = useState(1);

  const horarios = ["17:00", "19:00", "21:00", "22:00"];
  // Funcion para aumentar el contador de las entradas
  const aumentar = () => {
    setCount((prev) => prev + 1);
  };

  // Funcion para restar las entradas
  const restar = () => {
    if (count == 1) return;

    setCount((prev) => prev - 1);
  };

  // Funcion para almacenar los datos de una reserva cuando el usuario pulsa continuar
  const handleContinuar = () => {
    const reserva = {
      titulo: title,
      fecha: fecha,
      horario: horario,
      entradas: count,
      subtotal: 12.5 * count,
    };

    localStorage.setItem("reserva", JSON.stringify(reserva));

    // Redirigir a la ruta de snacks
    navigate("/snacks");
  };

  // Funcion para setear variables de useState y marcar el boton marcado
  const handleSelected = (ev) => {
    setSelected(true);
    setHorario(ev.target.value);
    setFecha(inputCalendarRef.current.value);

    const buttons = document.querySelectorAll(".horario-button");

    buttons.forEach((btn) => btn.classList.remove("selected"));

    ev.target.classList.add("selected");
  };

  // useEffect para cargar el calendario con la libreria de flatpick
  useEffect(() => {
    const fp = flatpickr(inputCalendarRef.current, {
      dateFormat: "d/m/Y", // Formato que prefieras
      minDate: "today", // No fechas pasadas
      defaultDate: "today", // Fecha por defecto
      onChange: function (selectedDates, dateStr) {
        console.log("Fecha seleccionada:", dateStr);
        setFecha(dateStr);
        // Aquí puedes hacer lo que necesites con la fecha
      },
      onReady: function (selectedDates, dateStr) {
        setFecha(dateStr);
      },
    });

    // Cleanup cuando se desmonte el componente
    return () => fp.destroy();
  }, []);

  const backgroundImageUrl = img
    ? `https://image.tmdb.org/t/p/w1280${img}`
    : "";

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
          <h1 className=""> {title} </h1>
          <p className="fs-3"> {`${duracion}min`} </p>
        </section>

        <section className="movie-info">
          <article className="logo">
            {logo && <LogoPelicula logo={logo} />}
          </article>

          <article className="title-description">
            <h1 className="fw-bold"> {title} </h1>
            <p> {descripcion} </p>
          </article>

          <article className="trailer">
            <Trailer trailer={trailer} />
          </article>
        </section>

        <section className="horario-infoCompra">

          <section className="fecha-horario">

            <h1 className="fw-bold">Selecciona fecha y horario</h1>

            <article className="fecha">
              <h1 className="fs-5">
                <i className="fa-solid fa-calendar text-[#f59f0a]"></i>{" "}
                Selecciona una fecha
              </h1>
              <input
                ref={inputCalendarRef}
                type="calendar"
                placeholder="Selecciona una fecha"
              />
            </article>

            <article className="horario-options">

              <h1 className="fs-5">
                <i className="fa-solid fa-clock text-[#f59f0a]"></i> Horarios
              </h1>

              <article className="horarios">
                <Horarios horarios={horarios} handleSelected={handleSelected} />
              </article>
            </article>

          </section>

          <section className="infoCompra">
            <h1>Resumen de Reserva</h1>

            <ResumenReserva
              selected={selected}
              fecha={fecha}
              horario={horario}
              count={count}
              aumentar={aumentar}
              restar={restar}
              handleContinuar={handleContinuar}
            />
          </section>
        </section>
      </section>
    </>
  );
}

export default Pelicula;
