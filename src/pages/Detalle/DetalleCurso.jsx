import { useParams, Link } from "react-router-dom";
import { useCursos } from "../../hooks/useCursos";

function DetalleCurso() {
  const { id } = useParams();
  const { courses, loading, error } = useCursos();

  if (loading) return <div className="text-center py-20">Cargando detalle...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  const curso = courses.find((c) => (c.uid || c.id) === id);

  if (!curso) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Curso no encontrado</h2>
        <Link to="/cursos" className="px-4 py-2 bg-sky-600 text-white rounded">Volver al Catálogo</Link>
      </div>
    );
  }

  const titulo = curso.title || curso.name;
  const descripcion = curso.summary || curso.description || "Sin descripción.";
  const imagen = curso.iconUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/cursos" className="text-sky-600 font-medium mb-6 inline-block">&larr; Volver al catálogo</Link>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border p-6">
        <img src={imagen} alt={titulo} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{titulo}</h1>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{descripcion}</p>
        <div className="flex gap-4">
          <Link
            to={`/inscripcion?curso=${encodeURIComponent(titulo)}`}
            className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700"
          >
            Inscribirme a este curso
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetalleCurso;