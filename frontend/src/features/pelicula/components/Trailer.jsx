// components/Trailer.jsx
function Trailer({ trailer }) {
  if (!trailer || !trailer.key) return <p>No hay trailer disponible para esta película</p>;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${trailer.key}`}
      width="100%"
      height="315"
      title="Trailer"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}
export default Trailer;
