import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './../styles/login.css'
import { initForm } from './../services/initForm.js'
import { validarForm } from './../features/auth/validarAuth.js';

function Registro() {

    const emailInput = useRef(null); 
    const passwdInput = useRef(null); 
    const emailSpan = useRef(null); 
    const passwdSpan = useRef(null); 
    const nombreInput = useRef(null); 
    const tlfInput = useRef(null); 
    const nombreSpan = useRef(null); 
    const tlfSpan = useRef(null); 
    const buttonRef = useRef(null); 

    useEffect(() => {
        const inputs = [nombreInput.current,emailInput.current,passwdInput.current,tlfInput.current]; 
        const spans = [nombreSpan.current, emailSpan.current, passwdSpan.current, tlfSpan.current]; 
        const regexes = [
            /^[a-zA-Z0-9]{3,15}$/, 
            /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 
            /^.{5,}$/, 
            /^\d{9}$/
        ]

        validarForm(inputs,spans,regexes,buttonRef.current)
    },[])


    const handleSubmit = async(ev) => {
        ev.preventDefault(); 
        initForm(ev.target, "usuario/validarRegistro")
        
    }

  return (
    <section className="container-login">

        <article className="titulo-parrafo column-center">
            <h1>Crear una cuenta</h1>
            <p>Registrate para comenzar a disfrutar del cine</p>
        </article>

        <form action="#" method="post" onSubmit={handleSubmit}>

            <article className="label-input">
                <label htmlFor="nombre">Nombre</label>
                <input
                    ref={nombreInput}
                    id='nombre' 
                    type="text"
                    name='nombre'
                    placeholder='Tu nombre' 
                />
                <span className='noVisible' ref={nombreSpan}>El formato no es correcto</span>
            </article>

            <article className="label-input">
                <label htmlFor="email">Email</label>
                <input
                    ref={emailInput}
                    id='email' 
                    type="email"
                    name='email'
                    placeholder='tu@gmail.com' 
                />
                <span className='noVisible' ref={emailSpan}>El formato no es correcto</span>
            </article>

            <article className="label-input">
                <label htmlFor="passwd">Contraseña</label>
                <input
                    ref={passwdInput}
                    id='passwd' 
                    type="password"
                    name='passwd'
                    placeholder='Tu contraseña' 
                />
                <span className='noVisible' ref={passwdSpan}>El formato no es correcto</span>
            </article>

            <article className="label-input">
                <label htmlFor="tlf">Teléfono</label>
                <input
                    ref={tlfInput}
                    id='tlf' 
                    type="text"
                    name='tlf'
                    placeholder='Tu teléfono' 
                />
                <span className='noVisible' ref={tlfSpan}>El formato no es correcto</span>
            </article>

            <button ref={buttonRef} type='submit' className='enviar disabled' disabled>Crear cuenta</button>
            
        </form>

        <article className="buttons">
            <NavLink to={`${import.meta.env.VITE_API_BACKEND_BASE_URL}/usuario/googleLogin`} target="_self"><i className="fa-brands fa-google" ></i> Google</NavLink>
        </article>

        <NavLink to={'/login'} target="_self" className="registrate">¿Ya tienes una cuenta? <strong>Inicia sesión</strong></NavLink>
        <NavLink to={'/'} target="_self" className="volver-inicio"><i className="fa-solid fa-arrow-left"></i>Volver al inicio</NavLink>

    </section>
  )
}

export default Registro