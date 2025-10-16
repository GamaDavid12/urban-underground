import React, { useState } from "react";
import Button from "../Button/Button";

const CreateCategoryModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

return (
    <div 
      // FONDO OSCURO: bg-opacity-90 (ya aplicado)
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 w-full max-w-md p-6 sm:p-8 rounded-xl relative transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()}
      >
        
        {/* BOTÓN CERRAR (Posición fija: top-4 right-4) */}
        <div className="absolute top-4 right-4">
          <Button
            type="button"
            text="Cerrar"
            variant="cancel"
            onClick={onClose} 
            className="!w-auto px-3 py-1 text-sm rounded-full" 
          />
        </div>

        {/* ✅ AJUSTE CLAVE: Usamos mt-8 (margin-top: 2rem) para crear espacio */}
        <h2 className="text-xl font-bold mb-6 text-white text-center uppercase tracking-wider mt-8">
          CREAR CATEGORIA
        </h2>
        
        <div className="text-white">
          {children}
        </div>

      </div>
    </div>
  );
};

export default CreateCategoryModal;