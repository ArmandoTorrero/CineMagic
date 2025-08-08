import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './../styles/login.css'
import { initForm } from '../services/initForm.js'
import { validarForm } from '../features/auth/validarAuth.js'

function Login() {

    const emailInput = useRef(null); 
    const passwdInput = useRef(null); 
    const emailSpan = useRef(null); 
    const passwdSpan = useRef(null); 
    const buttonRef = useRef(null); 

    useEffect(() => {
        if (emailInput.current && passwdInput.current && 
            emailSpan.current && passwdSpan.current && 
            buttonRef.current) {
            
            // Arrays que necesita tu función
            const inputs = [emailInput.current, passwdInput.current];
            const spans = [emailSpan.current, passwdSpan.current];
            const regexes = [
                /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // Regex para email
                /^.{5,}$/ // Regex para contraseña (mínimo 5 caracteres)
            ];
            
            // Llamar a tu función original
            validarForm(inputs, spans, regexes, buttonRef.current);
        }
    },[])

    const handleSubmit = async(ev) => {
        ev.preventDefault(); 
        initForm(ev.target, "usuario/validarLogin")
        
    }

  return (
    
    <main className='py-3'>

        <section className="container-login bg-[#fefefe]">

            <article className="titulo-parrafo column-center">
                <h1>Iniciar sesión</h1>
                <p>Ingresa tus credenciales para acceder a tu cuenta</p>
            </article>

            <form action="#" method="post" onSubmit={handleSubmit}>

                <article className="label-input">
                    <label htmlFor='email'>Correo electrónico</label>
                    <input 
                        ref={emailInput}
                        id='email'
                        type='email' 
                        name='email' 
                        placeholder='tu@email.com' 
                    />
                    <span 
                        className={'noVisible'}
                        ref={emailSpan}
                    >
                        El formato no es correcto
                    </span>
                </article>

                <article className="label-input">
                    <label htmlFor='passwd'>Contraseña</label>
                    <input
                        ref={passwdInput}
                        id='passwd' 
                        type='password' 
                        name='passwd' 
                        placeholder='Tu contraseña'
                    />
                    <span
                        ref={passwdSpan} 
                        className={'noVisible'}
                    >
                        El formato no es correcto
                    </span>
                </article>

                <button ref={buttonRef} type='submit' className='enviar disabled' disabled>Iniciar sesión</button>
                
            </form>

            <article className="buttons">
                <NavLink to={`${import.meta.env.VITE_API_BACKEND_BASE_URL}/usuario/googleLogin`} target="_self"><i className="fa-brands fa-google" ></i> Google</NavLink>
            </article>

            <NavLink to={'/registro'} target="_self" className="registrate">¿No tienes una cuenta? <strong>Crea una aqui</strong></NavLink>
            <NavLink to={'/'} target="_self" className="volver-inicio"><i className="fa-solid fa-arrow-left"></i>Volver al inicio</NavLink>

        </section>

    </main>

  )
}

export default Login