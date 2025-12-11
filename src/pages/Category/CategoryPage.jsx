import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useAPI } from '../../hooks/useAPI.js';
import { API_ROUTES, PRODUCTS_ROUTES } from '../../api/APIRoutes/index.js';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const { request, loading, error } = useAPI();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/${API_ROUTES.PRODUCTS}${PRODUCTS_ROUTES.LIST}`;
        if (categoryId && categoryId !== 'verTodo') {
            url += `?categoria=${categoryId}`;
        }
        
        const response = await request('GET', url);
        setProducts(response.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [categoryId, request]);

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
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-black text-white min-h-screen">
      <div className="mb-8 pb-4 border-b border-gray-800">
         <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-yellow-400 uppercase">
           {categoryId === 'verTodo' ? 'TODOS LOS PRODUCTOS' : categoryId}
         </h1>
      </div>
      
      {products.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;