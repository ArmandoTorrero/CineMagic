import React, { useEffect, useState } from 'react'
import SnackCard from '../features/snack/components/SnackCard/SnackCard';
import { useNavigate } from "react-router-dom";
import "./../styles/snacks.css"

function Snacks() {

  // constante para usar la redireccion
  const navigate = useNavigate(); 

  // estado para variar el precio TOTAL de los snacks
  const [precioSnacks,setPrecioSnacks] = useState(0);

  // estado para almacenar los snacks y poder cambiar su contador
  const [snacks, setSnacks] = useState([
    {id: 1, nombre: "palomitas", descripcion: "palomitas XXL", precio: 5.00, categoria: "Palomitas", cont: 0},
    {id: 2, nombre: "palomitas", descripcion: "palomitas XXL", precio: 5.00, categoria: "Palomitas", cont: 0},
    {id: 3, nombre: "palomitas", descripcion: "palomitas XXL", precio: 5.00, categoria: "Palomitas", cont: 0},
    {id: 4, nombre: "palomitas", descripcion: "palomitas XXL", precio: 5.00, categoria: "Palomitas", cont: 0}
  ])

  // calcular el precio total de los snacks
  useEffect(() => {
    const total = snacks.reduce((sum, snack) => sum + (snack.precio * snack.cont), 0);
    setPrecioSnacks(total);
    
  }, [snacks]);
  
  // obtener los datos de la reserva 
  const { titulo, fecha, horario, entradas, subtotal } = JSON.parse(localStorage.getItem("reserva")); 

  // funcion para redirigir al usuario hacia el pago final y guardar los nuevos datos en localStorage
  const continuar = () => {

    const reservaActual = JSON.parse(localStorage.getItem("reserva")) || {};

    const nuevaReserva = {
      ...reservaActual,
      snacks: snacks.filter(s => s.cont > 0),
      precioSnacks: precioSnacks
    };

    localStorage.setItem("reserva", JSON.stringify(nuevaReserva));

    navigate("/payment")
  }
  
  // funcion para aumentar o disminuar la cantidad de un snack en la reserva
  const handleSnack = (operacion, index) => {
    setSnacks(prevSnacks => {
      return prevSnacks.map(snack => {
        if (snack.id === index) {
          if (operacion === "sumar") {
            return { ...snack, cont: snack.cont + 1 };
          } else if (operacion === "restar" && snack.cont > 0) {
            return { ...snack, cont: snack.cont - 1 };
          }
        }
        return snack;
      });
    });
  };

  return (

    <main className='snacksMain py-4 px-3 flex flex-wrap justify-evenly gap-3'>

      <section className="snacksContainer w-full max-w-[900px] py-2">

        <section className="title-description">
          <h1 className='text-white fs-2 fw-bold'>Agrega Snacks a tu Experiencia</h1>
          <p>!Opcional¡ Puedes continuar sin snacks si prefieres</p>
        </section>

        <section className="snacks d-flex flex-wrap gap-3 py-2">

          {snacks.map(snack => (
            <SnackCard 
              key={snack.id} 
              index={snack.id}
              nombre={snack.nombre} 
              descripcion={snack.descripcion}
              categoria={snack.categoria} 
              precio={snack.precio} 
              count={snack.cont} 
              onclick={handleSnack}
            />
          ))}

        </section>

      </section>

      <section className="resumenReservaContainer h-min p-4 bg-[#1c2739]">

          <h1 className='text-white fs-3'>Resumen de compra</h1>

          <article className="resumenReserva py-2">

            <div className="infoPelicula">
              <p>Película</p>
              <span className='text-white fw-bold'> {titulo} </span>
              <p> {`${entradas} entradas x $12.5`} </p>
            </div>

            <div className="infoHorario">
              <p className='m-0'>Horario</p>
              <span className='text-white'> {fecha} - {horario} </span>
            </div>

              {snacks.filter(snack => snack.cont > 0).length > 0 && (
                <>
                <div className="infoSnacks py-2">
                  <p className='m-0'>Snacks</p>
                  {snacks.filter(snack => snack.cont > 0).map(snack => (
                    <div key={snack.id} className="text-[#cad4dc] d-flex justify-between">
                      <span>{snack.nombre} x{snack.cont}</span>
                      <span>{(snack.precio * snack.cont).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
                </>
              )}
            
            <hr />

            <div className="infoTotal">

              <div className="entradas py-1 text-[#cad4dc] d-flex justify-between">
                <span>Entradas: </span>
                <span> {subtotal}€ </span>
              </div>

              <div className="snacks-total py-1 text-[#cad4dc] d-flex justify-between">
                {
                  precioSnacks > 0 && (
                    <>
                      <span>Snacks: </span>
                      <span> {precioSnacks}€ </span>
                    </>
                  )
                }
              </div>

              <div className="total py-1 d-flex justify-between">
                <span className='text-white fw-bold'>Total: </span>
                <span className='text-[#f59f0a] fw-bold'> {subtotal + precioSnacks}€ </span>
              </div>

            </div>

            <button className="continuar" onClick={continuar}>Continuar al pago</button>

          </article>

      </section>

    </main>
  )
}

export default Snacks