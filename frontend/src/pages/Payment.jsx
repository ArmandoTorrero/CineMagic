import React from 'react'

function Payment() {

  const reserva = JSON.parse(localStorage.getItem("reserva")); 
  console.log(reserva);
  

  return (
    <div>Payment</div>
  )
}

export default Payment