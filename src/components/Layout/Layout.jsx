import Header from "./Header";

export default function Layout({ children, favoritosCount, usuarioLogueado, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header 
        favoritosCount={favoritosCount} 
        usuarioLogueado={usuarioLogueado} 
        onLogout={onLogout} 
      />
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-auto">
        <p>EduCursos · Plataforma de Formación - SENA (2026)</p>
      </footer>
    </div>
  );
}