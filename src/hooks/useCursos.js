import { useState, useEffect } from "react";

export function useCursos() {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCursos() {
      try {
        setCargando(true);
        const response = await fetch("https://learn.microsoft.com/api/catalog/");
        if (!response.ok) throw new Error("Error al conectar con la API de Microsoft Learn");
        const data = await response.json();
        
        const listaCursos = data.modules || data.courses || data.products || [];
        setCursos(listaCursos.slice(0, 30));
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    fetchCursos();
  }, []);

  return { cursos, cargando, error };
}