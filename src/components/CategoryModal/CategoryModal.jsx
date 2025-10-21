import React, { useState } from "react";
import Button from "../Button/Button";

const CategoryModal = ({ isOpen, onClose, children, title = "OPERACIÓN CATEGORIA" }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 backdrop-blur-md bg-opacity-90 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
      className="bg-gray-900 border border-gray-700 w-full max-w-xs p-6 sm:p-8 rounded-xl relative transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()}
      >
        
        <div className="absolute top-4 right-4">
          <Button
            type="button"
            text="Cerrar"
            variant="cancel"
            onClick={onClose} 
            className="!w-auto px-3 py-1 text-sm rounded-full" 
          />
        </div>


        <h2 className="text-xl font-bold mb-6 text-white text-center uppercase tracking-wider mt-8">
          {title}
        </h2>
        
        <div className="text-white">
          {children}
        </div>

      </div>
    </div>
  );
};

export default CategoryModal;