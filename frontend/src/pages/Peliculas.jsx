import React, { useState, useEffect } from 'react'
import { fetchData } from '../components/fetchData';

function Peliculas() {

  const [users, setUsers] = useState([]); 

  const url = `${import.meta.env.VITE_API_BACKEND_BASE_URL}usuarios`; 

  useEffect(() => {
    
    fetchData(url).then((result) => {
      console.log(result);
      setUsers(result.datos)
      
    }).catch((err) => {
      console.error(err);
      
    });
  
    
  }, [url])
  

  return (
    <section className="users">
      {users.map(user => (
        <article className="user" key={user.id}>
          <h1> {user.nombre} </h1>
          <p> {user.email} </p>
        </article>
      ))}
    </section>
  )
}

export default Peliculas