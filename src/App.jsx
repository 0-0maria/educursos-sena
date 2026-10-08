import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Layout from "./components/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import MiProyecto from "./pages/MiProyecto/MiProyecto";
import Productos from "./pages/Catalogo/Productos";
import Favoritos from "./pages/Favoritos/Favoritos";
import InscripcionForm from "./pages/Inscripcion/InscripcionForm";

export default function App() {
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("educursos_favoritos")) || [];
  });

  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    return JSON.parse(sessionStorage.getItem("educursos_sesion")) || null;
  });

  useEffect(() => {
    localStorage.setItem("educursos_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const handleToggleFavorito = (curso) => {
    const id = curso.uid || curso.id;
    const existe = favoritos.some(f => (f.uid || f.id) === id);
    if (existe) {
      setFavoritos(favoritos.filter(f => (f.uid || f.id) !== id));
      toast.error("Curso eliminado de favoritos");
    } else {
      setFavoritos([...favoritos, curso]);
      toast.success("Curso agregado a favoritos");
    }
  };

  const handleVaciarFavoritos = () => {
    if (window.confirm("¿Está seguro de que desea vaciar todos los favoritos?")) {
      setFavoritos([]);
      toast.success("Favoritos vaciados correctamente");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("educursos_sesion");
    setUsuarioLogueado(null);
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Layout 
        favoritosCount={favoritos.length} 
        usuarioLogueado={usuarioLogueado} 
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/mi-proyecto" element={<MiProyecto />} />
          <Route path="/cursos" element={<Productos favoritos={favoritos} onToggleFavorito={handleToggleFavorito} />} />
          <Route path="/favoritos" element={<Favoritos favoritos={favoritos} onToggleFavorito={handleToggleFavorito} onVaciarFavoritos={handleVaciarFavoritos} />} />
          <Route path="/inscribir/:id" element={<InscripcionForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}