
function LogoPelicula({ logo }) {
  if (!logo) return null;
  return <img width="400px" src={`https://image.tmdb.org/t/p/original${logo.file_path}`} alt="logo" />;
}
export default LogoPelicula;
