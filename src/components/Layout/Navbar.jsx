import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Navbar({ favoritosCount }) {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="text-slate-600 hover:text-sky-600 font-medium transition">Inicio</Link>
      <Link to="/mi-proyecto" className="text-slate-600 hover:text-sky-600 font-medium transition">Mi Proyecto</Link>
      <Link to="/cursos" className="text-slate-600 hover:text-sky-600 font-medium transition">Cursos</Link>
      
      <Link to="/favoritos" className="relative text-slate-600 hover:text-rose-500 transition" title="Mis Favoritos">
        <Heart size={24} />
        {favoritosCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {favoritosCount}
          </span>
        )}
      </Link>
    </nav>
  );
}