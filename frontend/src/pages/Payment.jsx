import React, { useEffect, useRef } from 'react'
import "./../styles/payment.css"
import { validarForm } from './../features/auth/validarAuth.js';
import { initForm } from './../services/initForm.js';

function Payment() {

  const titularRef = useRef(null);
  const numTarjetaRef = useRef(null); 
  const spanTitularRef = useRef(null);
  const spanNumTarjetaRef = useRef(null);
  const spanExpiracionRef = useRef(null); 
  const cvcRef = useRef(null)
  const spanCvcRef = useRef(null)

  const buttonRef = useRef(null); 
  const inputCalendarRef = useRef(null)
  
  // obtener los datos de la reserva 
  const { titulo, fecha, horario, entradas, subtotal, precioSnacks, snacks } = JSON.parse(localStorage.getItem("reserva"));

  useEffect(() => {

    const inputs = [titularRef.current,numTarjetaRef.current,inputCalendarRef.current,cvcRef.current]; 
    const spans = [spanTitularRef.current,spanNumTarjetaRef.current,spanExpiracionRef.current,spanCvcRef.current]; 
    const regexes = [
            /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{2,50}$/i,
            /^\d{4} ?\d{4} ?\d{4} ?\d{1,7}$/,
            /^(0[1-9]|1[0-2])\/(\d{2})$/,
            /^\d{3}$/
    ]

    validarForm(inputs,spans,regexes,buttonRef.current)
    
  },[])

  const handleSubmit = (ev) => {
    ev.preventDefault(); 
      initForm(ev.target, "reserva/validarReserva")
  }

  

  return (
    <main className='paymentMain p-3 d-flex flex-wrap align-items-center gap-3'>

      <section className="resumenCompraContainer">

        <h1 className='py-2 text-white'>Resumen de tu pedido</h1>

        <article className="resumenCompra p-4 bg-[#1c2739]">

          <div className="infoPelicula d-flex flex-col gap-2">

              <p className='text-white fw-bold m-0 fs-5'> {titulo} </p>
              <p className='m-0'> {fecha} - {horario} </p>
              
              <div className="entradas d-flex justify-between">
                <p className='m-0'> {`${entradas} entradas x $12.5`} </p>
                <p className='m-0 text-white fw-bold'> {entradas * 12.5}€ </p>
              </div>

          </div>

          <hr />

          {
            snacks.length > 0 && (
              <>
                <article className="infoSnacks d-flex flex-col gap-2">
                  <p className='m-0 text-white fw-bold fs-5'>Snacks</p>

                  <div className="snacksContent">
                    {
                      snacks.map(snack => (
                        <div className="infoSnack d-flex justify-between" key={snack.id}>
                          <p className='m-0'> {`${snack.nombre} x ${snack.cont}`} </p>
                          <p className='m-0 text-white'> {snack.precio * snack.cont}€ </p>
                        </div>
                      ))
                    }
                  </div>
                </article>
                <hr />

              </>
            )
            
          }


          <div className="infoTotal d-flex flex-col gap-2">

            <div className="entradas d-flex justify-between">
              <p className='m-0'>Entradas: </p>
              <p className='m-0'> {subtotal}€ </p>
            </div>

            <div className="Snacks d-flex justify-between">
              <p className='m-0'>Snacks: </p>
              <p className='m-0'> {precioSnacks}€ </p>
            </div>

          </div>

          <hr />

          <div className="total d-flex justify-between align-middle">
            <p className='m-0 fw-bold text-white'>Total: </p>
            <span className='m-0 fw-bold  text-[#f59f0a]'> {subtotal + (precioSnacks ? precioSnacks : 0)}€ </span>
          </div>
          
        </article>

      </section>

      <section className="paymentContainer py-3">

          <h1 className='py-2 text-white fw-bold'>Información de pago</h1>

          <form action="#" className="paymentForm p-4" onSubmit={handleSubmit}>

            <article className="label-input">
                <label htmlFor='titular'>Titular de la tarjeta</label>
                <input 
                    ref={titularRef}
                    id='titular'
                    type='text' 
                    name='titular' 
                    placeholder='Juan Perez' 
                />
                <span 
                    className={'noVisible'}
                    ref={spanTitularRef}
                >
                    El formato no es correcto
                </span>
            </article>

            <article className="label-input">

                <label htmlFor='numTarjeta'>Numero de la tarjeta</label>
                <input
                    ref={numTarjetaRef}
                    id='numTarjeta' 
                    type='text' 
                    name='numTarjeta' 
                    placeholder='1234 1234 1234 1234'
                />
                <span
                    ref={spanNumTarjetaRef} 
                    className={'noVisible'}
                >
                    El formato no es correcto
                </span>

            </article>

            <article className="cvc-expiracion d-flex flex-wrap justify-between g-2">

              <article className="label-input w-[47.5%]">

                <label htmlFor='expiracion'>Fecha de caducidad</label>
                <input
                    ref={inputCalendarRef}
                    id='expiracion' 
                    type='text' 
                    name='expiracion' 
                    placeholder='MM/YY'
                />
                <span
                    ref={spanExpiracionRef} 
                    className={'noVisible'}
                >
                    El formato no es correcto
                </span>

              </article>

              <article className="label-input w-[47.5%]">

                <label htmlFor='cvc'>CVC</label>
                <input
                    ref={cvcRef}
                    id='cvc' 
                    type='num' 
                    name='cvc' 
                    placeholder='NNN'
                />
                <span
                    ref={spanCvcRef} 
                    className={'noVisible'}
                >
                    El formato no es correcto
                </span>

              </article>
              

            </article>
            <p className='encriptacion'><i className="fa-solid fa-lock"></i> Tu información está protegida con encriptación SSL</p>

            <button type="submit" className='w-full disabled' ref={buttonRef}> 
              <i className="fa-solid fa-credit-card"></i> 
              {`Pagar ${subtotal + precioSnacks}€`} 
              </button>
          </form>

      </section>

    </main>
  )
}

export default Payment