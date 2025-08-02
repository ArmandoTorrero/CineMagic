import React, { useEffect, useState } from 'react'
import Label from './../components/Label.jsx'
import Input from './../components/Input.jsx'
import Span from './../components/Span.jsx'
import Button from './../components/Button.jsx'
import { NavLink } from 'react-router-dom'
import './../styles/login.css'
import { initForm } from '../services/initForm.js'

function Login() {

    const handleSubmit = async(ev) => {
        ev.preventDefault(); 
        initForm(ev.target, "usuario/validarLogin")
        
    }

  return (
    
    <main className='py-3'>

        <section className="container-login">

            <article className="titulo-parrafo column-center">
                <h1>Iniciar sesión</h1>
                <p>Ingresa tus credenciales para acceder a tu cuenta</p>
            </article>

            <form action="#" method="post" onSubmit={handleSubmit}>

                <article className="label-input">
                    <label htmlFor={'email'}>Correo electrónico</label>
                    <input type='email' name='email' placeholder='tu@email.com' />
                    <span className={'noVisible'}>El formato no es correcto</span>
                </article>

                <article className="label-input">
                    <label htmlFor={'passwd'}>Contraseña</label>
                    <input type='password' name='passwd' placeholder='Tu contraseña'/>
                    <span className={'noVisible'}>El formato no es correcto</span>
                </article>

                <button type='submit' className='enviar' disabled>Iniciar sesión</button>
                
            </form>

            <article className="buttons">
                <NavLink to={'/'} target="_self"><i className="fa-brands fa-google" ></i> Google</NavLink>
            </article>

            <NavLink to={'/registro'} target="_self" className="registrate">¿No tienes una cuenta? <strong>Crea una aqui</strong></NavLink>
            <NavLink to={'/'} target="_self" className="volver-inicio"><i className="fa-solid fa-arrow-left"></i>Volver al inicio</NavLink>

        </section>

    </main>

  )
}

export default Login