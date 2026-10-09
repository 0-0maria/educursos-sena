import { useState, useEffect } from "react";
import { useCursos } from "../../hooks/useCursos";
import CursoCard from "../Catalogo/CursoCard";

function Catalogo() {
  const { courses, loading, error } = useCursos();
  const [busqueda, setBusqueda] = useState("");
  
  // Recuperamos la página guardada en sessionStorage o empezamos en 1
  const [paginaActual, setPaginaActual] = useState(() => {
    return Number(sessionStorage.getItem("catalogo_pagina")) || 1;
  });

  const cursosPorPagina = 9;

  const favoritosIds = JSON.parse(localStorage.getItem("favoritos")) || [];

  const cursosFiltrados = courses.filter((curso) => {
    const titulo = curso.title || curso.name || "";
    return titulo.toLowerCase().includes(busqueda.toLowerCase());
  });

  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina) || 1;

  // Sincronizamos con sessionStorage cada vez que cambie la página
  useEffect(() => {
    sessionStorage.setItem("catalogo_pagina", paginaActual);
  }, [paginaActual]);

  const paginaSegura = Math.min(paginaActual, totalPaginas);

  const indiceUltimoCurso = paginaSegura * cursosPorPagina;
  const indicePrimerCurso = indiceUltimoCurso - cursosPorPagina;
  const cursosActuales = cursosFiltrados.slice(indicePrimerCurso, indiceUltimoCurso);

  const handleToggleFavorito = (curso) => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const cursoId = curso.id || curso.uid;
    const existeIndex = favoritos.findIndex((fav) => (fav.id || fav.uid) === cursoId);

    let actualizados;
    if (existeIndex >= 0) {
      actualizados = favoritos.filter((fav) => (fav.id || fav.uid) !== cursoId);
      alert("Curso eliminado de favoritos");
    } else {
      actualizados = [...favoritos, curso];
      alert("Curso agregado a favoritos");
    }
    localStorage.setItem("favoritos", JSON.stringify(actualizados));
    window.dispatchEvent(new Event("storage"));
  };

  const irSiguiente = () => {
    if (paginaSegura < totalPaginas) {
      setPaginaActual(paginaSegura + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const irAnterior = () => {
    if (paginaSegura > 1) {
      setPaginaActual(paginaSegura - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-600">Cargando cursos desde Microsoft Learn...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-lg text-red-500">Error al cargar la API: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Catálogo de Cursos</h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar curso por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
            sessionStorage.setItem("catalogo_pagina", 1);
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {cursosActuales.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No se encontraron cursos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cursosActuales.map((curso) => {
            const cursoId = curso.id || curso.uid;
            const esFavorito = favoritosIds.some((fav) => (fav.id || fav.uid) === cursoId);
            return (
              <CursoCard
                key={cursoId}
                curso={curso}
                esFavorito={esFavorito}
                onToggleFavorito={handleToggleFavorito}
              />
            );
          })}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pb-10">
          <button
            onClick={irAnterior}
            disabled={paginaSegura === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 text-sm font-medium cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-sm font-medium text-gray-700">
            Página {paginaSegura} de {totalPaginas}
          </span>
          <button
            onClick={irSiguiente}
            disabled={paginaSegura === totalPaginas}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50 text-sm font-medium cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Catalogo;