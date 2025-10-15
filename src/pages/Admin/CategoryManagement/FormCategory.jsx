import React, { useState } from 'react';
import AuthInput from '../../../components/AuthInput/AuthInput.jsx'; 
import Button from '../../../components/Button/Button.jsx'; 

const FormCategory = ({ onCancel, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!title) {
            setError("Debes ingresar un nombre para la categoría.");
            setLoading(false);
            return;
        }
        
        console.log("Creando categoría con los datos:", { title }); 
        
        setTimeout(() => {
            setLoading(false);
            if (Math.random() > 0.1) {
                setTitle("");
                onSuccess();
            } else {
                setError("Error de red o el nombre ya existe.");
            }
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <AuthInput
                id="category-title"
                label="Nombre"
                type="text"
                name="title"
                placeholder="Nombre de la Categoría"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-0"
            />


            {loading && <p className="text-yellow-400 text-center">Guardando...</p>}
            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
            
            <div className="flex justify-end gap-3 mt-4">
                <Button 
                    type="button" 
                    text="Cancel"
                    variant="grey"
                    onClick={onCancel}
                    className="!w-auto px-6 py-2"
                    disabled={loading}
                />
                <Button 
                    type="submit" 
                    text={loading ? "Guardando..." : "Guardar"} 
                    variant="contained"
                    className="!w-auto px-6 py-2"
                    disabled={loading}
                />
            </div>
        </form>
    );
};

export default FormCategory;