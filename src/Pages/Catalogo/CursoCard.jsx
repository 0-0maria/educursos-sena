import { Link } from "react-router-dom";
import { Heart, BookOpen } from "lucide-react";

export default function CursoCard({ curso, esFavorito, onToggleFavorito }) {
  const titulo = curso.title || curso.name || "Curso sin título";
  const descripcion = curso.summary || curso.description || "Sin descripción disponible.";
  const uid = curso.uid || curso.id;
  const imagen = curso.iconUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Link to={`/curso/${uid}`}>
            <img src={imagen} alt={titulo} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
          </Link>
          <button 
            onClick={() => onToggleFavorito(curso)}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
              esFavorito ? "bg-rose-500 text-white" : "bg-white/80 text-slate-600 hover:text-rose-500"
            }`}
          >
            <Heart size={18} fill={esFavorito ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2">{titulo}</h3>
          <p className="text-slate-500 text-sm line-clamp-3 mb-4">{descripcion}</p>
        </div>
      </div>
      <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-4">
        <Link 
          to={`/curso/${uid}`} 
          className="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:underline"
        >
          <BookOpen size={16} /> Ver detalle
        </Link>
        <Link 
          to={`/inscribir/${uid}`} 
          className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
        >
          Inscribirme
        </Link>
      </div>
    </div>
  );
}