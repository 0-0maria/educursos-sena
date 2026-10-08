import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Navbar({ favoritosCount, usuarioLogueado, onLogout }) {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="text-slate-600 hover:text-sky-600 font-medium transition">Inicio</Link>
      <Link to="/mi-proyecto" className="text-slate-600 hover:text-sky-600 font-medium transition">Mi Proyecto</Link>
      <Link to="/cursos" className="text-slate-600 hover:text-sky-600 font-medium transition">Cursos</Link>
      
      {/* Icono de Favoritos con contador */}
      <Link to="/favoritos" className="relative text-slate-600 hover:text-rose-500 transition" title="Mis Favoritos">
        <Heart size={24} />
        {favoritosCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {favoritosCount}
          </span>
        )}
      </Link>

      {usuarioLogueado ? (
        <div className="flex items-center gap-4">
          <Link to="/perfil" className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg">
            Perfil: {usuarioLogueado.correo}
          </Link>
          <button 
            onClick={onLogout}
            className="text-sm bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-rose-100 transition"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Link to="/login" className="bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition">
          Login
        </Link>
      )}
    </nav>
  );
}