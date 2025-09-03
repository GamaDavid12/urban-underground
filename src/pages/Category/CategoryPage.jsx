import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from "../../components/ProductCard/ProductCard";
import { allProductsData } from '../../Mocks/productsMock.js';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCategoryData(null);

    setTimeout(() => {
      const data = allProductsData[categoryId];;
      if (data) {
        setCategoryData(data);
      } else {
        setError("Categoría no encontrada.");
      }
      setLoading(false);
    },10);
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-yellow-400 text-xl font-bold">
        Cargando productos...
      </div>
    );
  }

if (error) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-red-500 text-xl font-bold">
      {error}
    </div>
  );
}

if (!categoryData) {
  return null;
}

return (
  <div className="p-4 md:p-8 bg-black text-white min-h-screen">
    <div className="mb-8 pb-4 border-b border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-yellow-400">
          {categoryData.title} {categoryData.icon}
        </h1>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-end mt-4 md:mt-0">
          <span className="text-sm uppercase text-gray-400">FILTROS</span>
          <span className="text-base md:text-lg font-bold text-white">
            {categoryData.subtitle}
          </span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categoryData.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
};

export default CategoryPage;