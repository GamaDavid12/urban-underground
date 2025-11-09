import { useState, useEffect } from "react";
import { API_ROUTES, CATEGORIES_ROUTES } from "../../../../api/APIRoutes";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch((`${API_ROUTES.CATEGORIES}${CATEGORIES_ROUTES.LIST}`));
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
