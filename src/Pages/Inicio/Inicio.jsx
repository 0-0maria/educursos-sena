import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Inicio() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-130px)] justify-between">
      {/* Banner Principal */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <span className="bg-sky-500/10 text-sky-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-sky-500/20">
            Plataforma Web de Formación
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-6">Bienvenido a EduCursos</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Consulta el catálogo oficial de formación, marca tus favoritos y simula tus procesos de inscripción con confirmación automatizada.
          </p>
          <Link to="/cursos" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg">
            <BookOpen size={20} /> Explorar Cursos
          </Link>
        </div>
      </section>
    </div>
  );
}