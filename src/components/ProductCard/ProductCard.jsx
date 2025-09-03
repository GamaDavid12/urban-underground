import { useCart } from '../../context/CartContext';
import CategoryPage from "../../pages/Category/CategoryPage.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="relative w-full aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1 text-yellow-400">"{product.name}"</h3>
        <p className="text-sm mb-4 text-gray-300">{product.description}</p>
        <ul className="text-xs text-gray-400 space-y-1 mb-4">
          <li><span className="font-semibold text-yellow-400">Estilo:</span> {product.style}</li>
          <li><span className="font-semibold text-yellow-400">Color base:</span> {product.colorBase}</li>
          <li><span className="font-semibold text-yellow-400">Género:</span> {product.gender}</li>
          {product.size && <li><span className="font-semibold text-yellow-400">Talle:</span> {product.size}</li>}
        </ul>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full py-2 bg-yellow-500 text-black font-semibold rounded-full transition-colors duration-200 hover:bg-yellow-400"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;