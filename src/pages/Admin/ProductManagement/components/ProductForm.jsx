import useCategories from "../hooks/useCategories";

export const ProductForm = ({ onSubmit, initial = initialValues }) => {
  const { categories, loading, error } = useCategories();

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

          <label>Categoría:</label>
          {loading ? (
            <p>Cargando categorías...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Field as="select" name="category" className="border p-2 rounded">
              <option value="">Selecciona</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.titulo}
                </option>
              ))}
            </Field>
          )}
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
        </Form>
      )}
    </Formik>
  );
};
