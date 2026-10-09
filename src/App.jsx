import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import MiProyecto from "./pages/MiProyecto/MiProyecto";
import Catalogo from "./pages/Catalogo/Catalogo";
import DetalleCurso from "./pages/Detalle/DetalleCurso";
import Favoritos from "./pages/Favoritos/Favoritos";
import InscripcionForm from "./pages/Inscripcion/InscripcionForm";

function App() {
  const usuarioLogueado = sessionStorage.getItem("usuario") || "";
  const favoritosCount = JSON.parse(localStorage.getItem("favoritos"))?.length || 0;

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <Router>
      <Layout 
        favoritosCount={favoritosCount} 
        usuarioLogueado={usuarioLogueado} 
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/mi-proyecto" element={<MiProyecto />} />
          <Route path="/cursos" element={<Catalogo />} />
          <Route path="/curso/:id" element={<DetalleCurso />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/inscripcion" element={<InscripcionForm />} />
          <Route path="/inscribir/:id" element={<InscripcionForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;