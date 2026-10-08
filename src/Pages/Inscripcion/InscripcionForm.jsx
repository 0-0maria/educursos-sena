import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function InscripcionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [cargandoCurso, setCargandoCurso] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: { tipoDocumento: "CC", documento: "", nombres: "", apellidos: "", correo: "", telefono: "" }
  });

  useEffect(() => {
    async function getCursoDetalle() {
      try {
        const res = await fetch("https://learn.microsoft.com/api/catalog/");
        const data = await res.json();
        const lista = data.modules || data.courses || data.products || [];
        const encontrado = lista.find(c => (c.uid || c.id) === id);
        setCurso(encontrado);
      } catch (err) {
        toast.error("No se pudo cargar la información del curso.");
      } finally {
        setCargandoCurso(false);
      }
    }
    getCursoDetalle();
  }, [id]);

  const handleDocumentoBlur = (e) => {
    const doc = e.target.value;
    if (!doc) return;

    const usuariosRegistrados = JSON.parse(localStorage.getItem("educursos_usuarios")) || [];
    const usuarioExistente = usuariosRegistrados.find(u => u.documento === doc);

    if (usuarioExistente) {
      setValue("nombres", usuarioExistente.nombres);
      setValue("apellidos", usuarioExistente.apellidos);
      setValue("correo", usuarioExistente.correo);
      setValue("telefono", usuarioExistente.telefono);
      setValue("tipoDocumento", usuarioExistente.tipoDocumento);
      toast.success("¡Usuario existente encontrado! Datos autocompletados.");
    } else {
      toast("Usuario nuevo. Por favor ingresa tus datos.");
    }
  };

  const onSubmit = async (data) => {
    if (!window.confirm(`¿Está seguro de que desea inscribirse en el curso "${curso?.title || curso?.name}"?`)) {
      toast("Inscripción cancelada.");
      return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem("educursos_usuarios")) || [];
    const index = usuariosRegistrados.findIndex(u => u.documento === data.documento);
    if (index >= 0) {
      usuariosRegistrados[index] = data;
    } else {
      usuariosRegistrados.push(data);
    }
    localStorage.setItem("educursos_usuarios", JSON.stringify(usuariosRegistrados));

    try {
      const formData = new FormData();
      formData.append("email", data.correo);
      formData.append("subject", "Confirmación de inscripción al curso - EduCursos");
      formData.append("message", `Hola ${data.nombres}:\n\nTe damos la bienvenida a EduCursos.\nHemos registrado correctamente tu inscripción al curso: ${curso?.title || curso?.name}.\n\nEsperamos que esta experiencia contribuya al fortalecimiento de tus conocimientos.\n¡Bienvenido(a)!`);

      const response = await fetch("https://formspree.io/f/tu_endpoint_formspree", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        toast.success("Inscripción exitosa. Correo de confirmación enviado.");
        navigate("/cursos");
      } else {
        toast.error("Inscripción guardada localmente, pero hubo un error al enviar el correo.");
      }
    } catch (error) {
      toast.error("Error de red al intentar enviar el correo de confirmación.");
    }
  };

  if (cargandoCurso) return <p className="text-center py-20 text-slate-500">Cargando datos...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Formulario de Inscripción</h1>

      {/* Info automática del curso */}
      {curso && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 flex gap-6 items-center">
          <img src={curso.iconUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"} alt="Curso" className="w-32 h-24 object-cover rounded-xl" />
          <div>
            <span className="text-xs bg-sky-50 text-sky-600 px-2 py-1 rounded-md font-semibold">Curso Seleccionado</span>
            <h2 className="text-xl font-bold text-slate-800 mt-1">{curso.title || curso.name}</h2>
            <p className="text-sm text-slate-500 line-clamp-2 mt-1">{curso.summary || curso.description}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Tipo de Documento *</label>
            <select {...register("tipoDocumento")} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-sky-500">
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Número de Documento *</label>
            <input 
              type="text" 
              {...register("documento", { required: "El documento es obligatorio" })}
              onBlur={handleDocumentoBlur}
              placeholder="Ej. 10203040"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-sky-500"
            />
            {errors.documento && <span className="text-xs text-rose-500">{errors.documento.message}</span>}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Nombres *</label>
            <input type="text" {...register("nombres", { required: "Nombres obligatorios" })} className="w-full border border-slate-300 rounded-xl px-4 py-2.5" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Apellidos *</label>
            <input type="text" {...register("apellidos", { required: "Apellidos obligatorios" })} className="w-full border border-slate-300 rounded-xl px-4 py-2.5" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Correo Electrónico *</label>
            <input type="email" {...register("correo", { required: "Correo obligatorio" })} className="w-full border border-slate-300 rounded-xl px-4 py-2.5" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Teléfono *</label>
            <input type="tel" {...register("telefono", { required: "Teléfono obligatorio" })} className="w-full border border-slate-300 rounded-xl px-4 py-2.5" />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button type="submit" className="bg-sky-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-sky-700 transition">
            Confirmar Inscripción
          </button>
        </div>
      </form>
    </div>
  );
}