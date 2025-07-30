import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Landing from "./../pages/Landing.jsx";
import Peliculas from "./../pages/Peliculas.jsx";
import Snacks from "./../pages/Snacks.jsx";
import Nav from "./../layouts/Nav.jsx";
import Footer from "./../layouts/Footer.jsx";
import Login from "./../pages/Login.jsx";

function Rutas() {
  return (
    <BrowserRouter>
    
      <Nav />

      <section id="content" className="content">

        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/peliculas" element={<Peliculas />}></Route>
          <Route path="/snacks" element={<Snacks />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>

      </section>

      <Footer />
      
    </BrowserRouter>
  );
}

export default Rutas;
