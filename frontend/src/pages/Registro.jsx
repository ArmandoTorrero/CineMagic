import React, { useState } from 'react'
import Label from './../components/Label.jsx'
import Input from './../components/Input.jsx'
import Span from './../components/Span.jsx'
import Button from './../components/Button.jsx'
import { NavLink } from 'react-router-dom'
import './../styles/login.css'
import { initForm } from '../services/initForm.js'

function Registro() {

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
                <Label htmlfor={'nombre'}>Nombre de usuario</Label>
                <Input type={'text'} name={'nombre'} placeholder={'Tu nombre'} />
                <Span className={'noVisible'}>El formato no es correcto</Span>
            </article>

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

            <article className="label-input">
                <Label htmlfor={'tlf'}>Teléfono</Label>
                <Input type={'text'} name={'tlf'} placeholder={'Nº de teléfono'}/>
                <Span className={'noVisible'}>El formato no es correcto</Span>
            </article>


            <Button type={'submit'} className={`enviar`} isDisabled={false}>Crear cuenta</Button>
            
        </form>

        <article className="buttons">
            <NavLink to={'/'} target="_self"><i className="fa-brands fa-google" ></i> Google</NavLink>
        </article>

        <NavLink to={'/login'} target="_self" className="registrate">¿Ya tienes una cuenta? <strong>Inicia sesión</strong></NavLink>
        <NavLink to={'/'} target="_self" className="volver-inicio"><i className="fa-solid fa-arrow-left"></i>Volver al inicio</NavLink>

    </section>
  )
}

export default Registro