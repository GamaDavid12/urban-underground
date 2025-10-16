import React, { useState } from 'react';
import Button from "../../../components/Button/Button.jsx";

const FormCategory = ({ onCancel, onSuccess }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos enviados:", categoryName); 

    onSuccess(); 
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-6">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-400 mb-2">
          Nombre
        </label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-[#FFCA1E] focus:border-[#FFCA1E]"
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          text="Cancel"
          variant="cancel"
          onClick={onCancel}
          className="!w-auto px-6"
        />
        <Button
          type="submit"
          text="Guardar"
          variant="pay"
          className="!w-auto px-6"
        />
      </div>
    </form>
  );
};

export default FormCategory;