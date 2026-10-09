import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Inicio from "./pages/Inicio/Inicio";
import MiProyecto from "./pages/MiProyecto/MiProyecto";
import Catalogo from "./pages/Catalogo/Catalogo";
import DetalleCurso from "./pages/Detalle/DetalleCurso";
import Favoritos from "./pages/Favoritos/Favoritos";
import InscripcionForm from "./pages/Inscripcion/InscripcionForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/mi-proyecto" element={<MiProyecto />} />
            <Route path="/cursos" element={<Catalogo />} />
            <Route path="/curso/:id" element={<DetalleCurso />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/inscripcion" element={<InscripcionForm />} />
            <Route path="/inscribir/:id" element={<InscripcionForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;