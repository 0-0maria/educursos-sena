export default function MiProyecto() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-800 mb-6">Mi Proyecto: EduCursos</h1>
      
      {/* Presentación de la Aprendiz */}
      <div className="bg-white p-8 rounded-2xl shadow-sm mb-8 border border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-700 mb-3">Presentación de la Aprendiz</h2>
        <p className="text-slate-600 leading-relaxed">
          Desarrollado en el marco del programa <span className="font-semibold text-sky-600">Tecnología en Análisis y Desarrollo de Software (ADSO)</span> del SENA. Este aplicativo web interactivo permite la consulta de cursos de formación mediante el consumo de una API pública, gestión de favoritos con persistencia local y simulación completa de procesos de inscripción con notificación por correo electrónico.
        </p>
      </div>

      {/* Arquitectura */}
      <div className="bg-white p-8 rounded-2xl shadow-sm mb-8 border border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Arquitectura de la Solución</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">React & Componentes</h3>
            <p className="text-sm text-slate-600">Estructura modular basada en componentes reutilizables y funcionales con manejo de estados locales y globales.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">React Router</h3>
            <p className="text-sm text-slate-600">Gestión de rutas del lado del cliente para convertir la aplicación en una SPA fluida y sin recargas.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">API Externa (Microsoft Learn)</h3>
            <p className="text-sm text-slate-600">Consumo de catálogo público mediante peticiones HTTP asíncronas (`fetch` / `async-await`).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">LocalStorage</h3>
            <p className="text-sm text-slate-600">Persistencia local para mantener almacenados los cursos favoritos y los datos de usuarios registrados.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Servicio de Mensajería</h3>
            <p className="text-sm text-slate-600">Integración con Formspree para el envío automatizado de correos de confirmación de inscripción.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">TailwindCSS</h3>
            <p className="text-sm text-slate-600">Framework de utilidades CSS para garantizar un diseño moderno, responsivo y adaptativo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}