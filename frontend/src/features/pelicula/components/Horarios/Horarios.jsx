import styles from "./horarios.module.css"; 

function Horarios({ horarios, handleSelected }) {
  return (
    <article className={styles.horarios}>
      {horarios.map((hora, i) => (
        <button className={styles.horarioButton} onClick={handleSelected} key={i} value={hora}>
          <i className="fa-solid fa-clock"></i> {hora}
        </button>
      ))}
    </article>
  );
}
export default Horarios;
