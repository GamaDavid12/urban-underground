import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "../hooks/useProductForm";

export const ProductForm = ({ onSubmit, initial = initialValues }) => {
  return (
    <Formik
      initialValues={initial}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-3">
          <label>Nombre:</label>
          <Field name="name" className="border p-2 rounded" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

          <label>Marca:</label>
          <Field name="brand" className="border p-2 rounded" />
          <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />

          <label>Precio:</label>
          <Field name="price" type="number" className="border p-2 rounded" />
          <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />

          <label>Stock:</label>
          <Field name="stock" type="number" className="border p-2 rounded" />
          <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />

          <label>Categoría:</label>
          <Field as="select" name="category" className="border p-2 rounded">
            <option value="">Selecciona</option>
            <option value="Ropa">Ropa</option>
            <option value="Calzado">Calzado</option>
          </Field>
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

          <label>Imagen:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setFieldValue("image", e.target.files[0])}
            className="border p-2 rounded"
          />
          {values.image && <img src={URL.createObjectURL(values.image)} alt="preview" className="mt-2" />}
          <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Guardar producto
          </button>
        </Form>
      )}
    </Formik>
  );
};
