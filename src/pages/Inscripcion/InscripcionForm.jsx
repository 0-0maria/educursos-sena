import { useState } from "react";

function InscripcionForm() {
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("Microsoft Learn Course");
  const [mensaje, setMensaje] = useState("");

  const handleBuscarUsuario = (e) => {
    e.preventDefault();
    if (!documento.trim()) return;

    const inscripcionesGuardadas = JSON.parse(localStorage.getItem("inscripciones")) || [];
    const usuarioExistente = inscripcionesGuardadas.find((item) => item.documento === documento);

    if (usuarioExistente) {
      setNombre(usuarioExistente.nombre);
      setMensaje("Usuario encontrado. Datos cargados.");
    } else {
      setNombre("");
      setMensaje("Usuario nuevo. Ingrese su nombre.");
    }
  };

  const handleGuardarInscripcion = (e) => {
    e.preventDefault();
    if (!documento.trim() || !nombre.trim()) {
      setMensaje("Complete todos los campos.");
      return;
    }

    const inscripcionesGuardadas = JSON.parse(localStorage.getItem("inscripciones")) || [];
    const duplicado = inscripcionesGuardadas.some(
      (item) => item.documento === documento && item.curso === curso
    );

    if (duplicado) {
      setMensaje("Ya está inscrito en este curso con este documento.");
      return;
    }

    const nuevaInscripcion = { documento, nombre, curso };
    inscripcionesGuardadas.push(nuevaInscripcion);
    localStorage.setItem("inscripciones", JSON.stringify(inscripcionesGuardadas));

    setMensaje("Inscripción guardada con éxito.");
    setDocumento("");
    setNombre("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Formulario de Inscripción</h2>
      <form onSubmit={handleGuardarInscripcion} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Documento:</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Número de documento"
            />
            <button
              type="button"
              onClick={handleBuscarUsuario}
              className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm"
            >
              Buscar
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Curso:</label>
          <input
            type="text"
            value={curso}
            disabled
            className="w-full mt-1 px-3 py-2 bg-gray-100 border rounded-md text-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-sky-600 text-white rounded-md font-medium"
        >
          Inscribirse
        </button>
      </form>
      {mensaje && <p className="mt-4 text-sm text-center text-sky-700 font-medium">{mensaje}</p>}
    </div>
  );
}

export default InscripcionForm;