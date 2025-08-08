import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Landing from "./../pages/Landing.jsx";
import Peliculas from "./../pages/Peliculas.jsx";
import Snacks from "./../pages/Snacks.jsx";
import Nav from "./../layouts/Nav.jsx";
import Footer from "./../layouts/Footer.jsx";
import Login from "./../pages/Login.jsx";
import Registro from "./../pages/Registro.jsx"; 
import Pelicula from "./../pages/Pelicula.jsx";
import Payment from "./../pages/Payment.jsx";

function Rutas() {
  return (
    <BrowserRouter>
    
      <Nav />

        <Routes>

          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/peliculas" element={<Peliculas />}></Route>
          <Route path="/pelicula/:id" element={<Pelicula />}></Route>
          <Route path="/snacks" element={<Snacks />}></Route>
          <Route path="/payment" element={<Payment />}></Route>          

        </Routes>

      <Footer />
      
    </BrowserRouter>
  );
}

export default Rutas;
