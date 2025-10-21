// src/pages/Admin/ProductManagement/components/ProductModal.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductModal = ({ isOpen, onClose, product, onSave, onDelete }) => {
  const isEditing = !!product;

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      stock: product?.stock || "",
      brand: product?.brand || "",
      category: product?.category || "",
      image: product?.image || null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
      price: Yup.number().required("El precio es obligatorio").positive(),
      stock: Yup.number().required("El stock es obligatorio").min(0),
    }),
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-[#1a1a1a] text-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg border border-[#2a2a2a] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-[#FAC602] border-b border-gray-700 pb-2">
            {isEditing ? "Editar producto" : "Añadir producto"}
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {["name", "brand", "description", "category"].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-300 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] border border-gray-700 focus:ring-2 focus:ring-[#FAC602] text-white"
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] border border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] border border-gray-700"
                />
              </div>
            </div>

            <div>
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  formik.setFieldValue("image", e.target.files[0])
                }
                className="border p-2 rounded"
              />
              {formik.values.image && (
                <img
                  src={
                    formik.values.image instanceof File
                      ? URL.createObjectURL(formik.values.image)
                      : formik.values.image
                  }
                  alt="preview"
                  className="mt-2 rounded-md h-32 object-cover"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FAC602] text-black font-semibold hover:bg-[#F6BD00] rounded-lg"
              >
                {isEditing ? "Guardar cambios" : "Añadir producto"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductModal;


