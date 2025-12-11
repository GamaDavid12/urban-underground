import { useCart } from '../../context/CartContext.jsx';
import Button from '../Button/Button.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => { addToCart(product); };

  const imageSrc = product.imagenURL || product.image || "https://via.placeholder.com/300";

  return (
    <div className="bg-neutral-900 text-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="relative w-full aspect-square bg-gray-800">
        <img
          src={imageSrc}
          alt={product.nombre}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1 text-yellow-400">{product.nombre}</h3>
        <p className="text-sm mb-2 text-gray-300 line-clamp-2">{product.descripcion}</p>
        
        <ul className="text-xs text-gray-400 space-y-1 mb-4 flex-grow">
          {product.categoria && (
             <li><span className="font-semibold text-yellow-400">Categoría:</span> {product.categoria.nombre}</li>
          )}
          <li><span className="font-semibold text-yellow-400">Stock:</span> {product.stock}</li>
        </ul>
        
        <div className="text-xl font-bold text-white mb-3">
            ${parseFloat(product.precio).toFixed(2)}
        </div>

        <Button onClick={handleAddToCart} text={"Agregar al Carrito"}/>
      </div>
    </div>
  );
};

export default ProductCard;