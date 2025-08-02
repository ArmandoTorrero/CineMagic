import React, { useState, useEffect } from "react";
import { fetchData } from "../services/fetchData";
import { BASE_API_URL } from "../config/config";

function Peliculas() {
  const [users, setUsers] = useState([]);

  const url = `${BASE_API_URL}usuario/usuarios`;

  useEffect(() => {
    fetchData(url)
      .then((result) => {
        console.log(result);
        setUsers(result.datos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);

  return (
    <section className="users">
      {users.map((user) => (
        <article className="user" key={user.id}>
          <h1> {user.nombre} </h1>
          <p> {user.email} </p>
        </article>
      ))}
    </section>
  );
}

export default Peliculas;
