import { Link } from "react-router-dom";
import { Heart, Trash2, BookOpen } from "lucide-react";

export default function Favoritos({ favoritos, onToggleFavorito, onVaciarFavoritos }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mis Cursos Favoritos</h1>
          <p className="text-slate-500 mt-1">Cursos guardados en tu almacenamiento local.</p>
        </div>
        {favoritos.length > 0 && (
          <button
            onClick={onVaciarFavoritos}
            className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-100 transition"
          >
            <Trash2 size={18} /> Vaciar favoritos
          </button>
        )}
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Heart size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700">No tienes cursos favoritos aún</h2>
          <p className="text-slate-500 mt-1 mb-6">Explora el catálogo y marca los cursos que te interesen.</p>
          <Link to="/cursos" className="bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700 transition">
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritos.map((curso) => {
            const id = curso.uid || curso.id;
            const titulo = curso.title || curso.name;
            const imagen = curso.iconUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60";
            
            return (
              <div key={id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-48 bg-slate-100">
                    <img src={imagen} alt={titulo} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => onToggleFavorito(curso)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow-md"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2">{titulo}</h3>
                    <p className="text-sm text-slate-500">Fecha de registro local guardada.</p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-4">
                  <Link to={`/curso/${id}`} className="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:underline">
                    <BookOpen size={16} /> Detalle
                  </Link>
                  <Link to={`/inscribir/${id}`} className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition">
                    Inscribirme
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}