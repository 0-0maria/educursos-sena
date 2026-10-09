import { useState, useEffect } from "react";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(guardados);
  }, []);

  const eliminarFavorito = (id) => {
    const actualizados = favoritos.filter((curso) => curso.id !== id);
    setFavoritos(actualizados);
    localStorage.setItem("favoritos", JSON.stringify(actualizados));
  };

  const vaciarFavoritos = () => {
    setFavoritos([]);
    localStorage.removeItem("favoritos");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Cursos Favoritos</h2>
        {favoritos.length > 0 && (
          <button
            onClick={vaciarFavoritos}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
          >
            Vaciar Favoritos
          </button>
        )}
      </div>

      {favoritos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tienes cursos guardados en favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoritos.map((curso) => (
            <div key={curso.id} className="p-4 border rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-sky-700">{curso.title || curso.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{curso.summary || curso.description}</p>
              </div>
              <button
                onClick={() => eliminarFavorito(curso.id)}
                className="mt-4 self-end px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;