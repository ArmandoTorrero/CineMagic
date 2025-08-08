import React from "react";
import styles from "./ResumenReserva.module.css";

function ResumenReserva({ selected,fecha,horario,count,aumentar,restar,handleContinuar,}) {
  return (
    <>
      {!selected ? (
        <p>No hay horarios seleccionados</p>
      ) : (
        <>
          <p>Horario seleccionado</p>
          <span className="info-reserva text-white fw-bold">
            {" "}
            {fecha} - {horario}{" "}
          </span>

          <p className="num-entradas">Número de entradas</p>

          <article className={styles.contador}>
            <button className="bg-white py-1 px-2" onClick={restar}>
              -
            </button>
            <span className="text-white fw-bold px-4"> {count} </span>
            <button className="bg-white py-1 px-2" onClick={aumentar}>
              +
            </button>
          </article>

          <hr />

          <article className="total-continuar">
            <div className="total w-full d-flex justify-between py-1">
              <span className="text-white">Subtotal: </span>
              <span className="text-white fw-bold"> {`${12.5 * count}€`} </span>
            </div>

            <button className={styles.continuar} onClick={handleContinuar}>
              Continuar a Snacks
            </button>
          </article>
        </>
      )}
    </>
  );
}

export default ResumenReserva;
