
import React from 'react'; 
import styles from "./snackCard.module.css"; 

function SnackCard({index,nombre, descripcion, precio, categoria ,count, onclick}) {
  return (

    <section className={`${styles.snack} relative`}>

        <article className={styles.snackImage}></article>

        <article className={`${styles.content} border-2 p-3`}>

            <h1 className='text-white fs-5 fw-bold'> {nombre} </h1>
            <p className={styles.descripcion}> {descripcion} </p>

          <article className="cantidad d-flex justify-between">

              <span className='text-white'>Cantidad: </span>

              <div className="buttons">
                  <button className={styles.button} onClick={() => onclick("sumar",index)}>+</button>
                  <span className='text-white mx-2 fw-bold'> {count} </span>
                  <button className={styles.button} onClick={() => onclick("restar",index)}>-</button>
              </div>

          </article>

        </article>

        <article className="categoriaPrecio d-flex justify-between text-white w-full p-2 absolute top-0">
          <span className={styles.categoria}> {categoria} </span>
          <span className={styles.precio}> €{precio} </span>
        </article>

    </section>
  )
}

export default SnackCard