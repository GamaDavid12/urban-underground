import React, { useState } from "react";
import AuthInput from "../../../components/AuthInput/AuthInput.jsx"; 
import Button from "../../../components/Button/Button.jsx"; 

const CreateCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const newCategoryData = {
      title,
      path,
      icon,
    };

    console.log("Creando categoría con los datos:", newCategoryData);
    
    setTimeout(() => {
      setLoading(false);
      if (title && path) { 
        setSuccess(true);
        setTitle("");
        setPath("");
        setIcon("");
      } else {
        setError("Faltan datos obligatorios.");
      }
    }, 1500);
  };

  return (
    <div className="contact-form-container p-4 sm:p-8 bg-gray-900 min-h-screen flex justify-center items-start">
      <form onSubmit={handleSubmit} className="contact-form w-full max-w-lg bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
        
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
          Crear Nueva Categoría
        </h2>

        {/* Campo Título/Nombre de la Categoría */}
        <AuthInput
          id="category-title"
          label="Título de la Categoría"
          type="text"
          name="title"
          placeholder="Ej: REMERAS"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-group mb-4"
        />

        {/* Campo Path/Ruta de la Categoría */}
        <AuthInput
          id="category-path"
          label="Path / Ruta"
          type="text"
          name="path"
          placeholder="Ej: /categorias/remeras"
          required
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="form-group mb-4"
        />

        {/* Campo Icono (Opcional) */}
        <AuthInput
          id="category-icon"
          label="Icono (opcional)"
          type="text"
          name="icon"
          placeholder="Ej: 👕"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="form-group mb-6"
        />

        {loading && <p className="text-yellow-400 text-center mb-4">Guardando categoría...</p>}
        {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4 font-bold">✅ Categoría creada exitosamente.</p>}
        
        <Button 
          type="submit" 
          text={loading ? "Creando..." : "Guardar Categoría"} 
          variant="gradient"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default CreateCategoryForm;