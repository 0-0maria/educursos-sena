import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header({ favoritosCount, usuarioLogueado, onLogout }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-sky-600">EduCursos</span>
        </Link>
        <Navbar 
          favoritosCount={favoritosCount} 
          usuarioLogueado={usuarioLogueado} 
          onLogout={onLogout} 
        />
      </div>
    </header>
  );
}