import React, { useState } from 'react'
import Label from './../components/Label.jsx'
import Input from './../components/Input.jsx'
import Span from './../components/Span.jsx'
import Button from './../components/Button.jsx'
import { NavLink } from 'react-router-dom'
import './../styles/login.css'

function Login() {

    const [disabled, setDisabled] = useState(true)

    const handleDisabled = () => {
        setDisabled(!disabled)
    }


  return (
    <section className="container-login">

        <article className="titulo-parrafo column-center">
            <h1>Iniciar sesión</h1>
            <p>Ingresa tus credenciales para acceder a tu cuenta</p>
        </article>

        <form action="#" method="post">

            <article className="label-input">
                <Label htmlfor={'email'}>Correo electrónico</Label>
                <Input type={'email'} name={'email'} placeholder={'tu@email.com'} />
                <Span className={'noVisible'}>El formato no es correcto</Span>
            </article>

            <article className="label-input">
                <Label htmlfor={'passwd'}>Contraseña</Label>
                <Input type={'password'} name={'passwd'} placeholder={'Tu contraseña'}/>
                <Span className={'noVisible'}>El formato no es correcto</Span>
            </article>


            <Button type={'button'} className={`enviar ${disabled ? "disabled" : ''}`} isDisabled={disabled}>Iniciar sesión</Button>
            
        </form>

        <article className="buttons">
            <NavLink to={'/'} target="_self"><i className="fa-brands fa-google" ></i> Google</NavLink>
        </article>

        <NavLink to={'/registro'} target="_self" className="registrate">¿No tienes una cuenta? <strong>Crea una aqui</strong></NavLink>
        <NavLink to={'/'} target="_self" className="volver-inicio"><i className="fa-solid fa-arrow-left"></i>Volver al inicio</NavLink>

    </section>
  )
}

export default Login