import { useState } from "react";
import { useCursos } from "../../hooks/useCursos";
import CursoCard from "./CursoCard";
import { Search } from "lucide-react";

export default function Productos({ favoritos, onToggleFavorito }) {
  const { cursos, cargando, error } = useCursos();
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 8;

  const cursosFiltrados = cursos.filter(c => 
    (c.title || c.name || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimo = paginaActual * cursosPorPagina;
  const indicePrimero = indiceUltimo - cursosPorPagina;
  const cursosPaginados = cursosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Catálogo de Cursos</h1>
          <p className="text-slate-500 mt-1">Explora la formación obtenida directamente desde Microsoft Learn.</p>
        </div>
        
        {/* Buscador */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Buscar curso..."
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {cargando && <p className="text-center py-20 text-slate-500 font-medium">Cargando cursos desde la API...</p>}
      {error && <p className="text-center py-20 text-rose-500 font-medium">{error}</p>}

      {!cargando && !error && (
        <>
          {cursosFiltrados.length === 0 ? (
            <p className="text-center py-20 text-slate-400">No se encontraron cursos coincidentes.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cursosPaginados.map((curso) => {
                const id = curso.uid || curso.id;
                const esFav = favoritos.some(f => (f.uid || f.id) === id);
                return (
                  <CursoCard 
                    key={id} 
                    curso={curso} 
                    esFavorito={esFav} 
                    onToggleFavorito={onToggleFavorito} 
                  />
                );
              })}
            </div>
          )}

          {/* Paginador */}
          {totalPaginas > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPaginaActual(num)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    paginaActual === num ? "bg-sky-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}