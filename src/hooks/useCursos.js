import { useState, useEffect } from "react";

export function useCursos() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://learn.microsoft.com/api/catalog/");
        if (!response.ok) {
          throw new Error("Error al conectar con la API");
        }
        const data = await response.json();
        setCourses(data.modules || data.courses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}