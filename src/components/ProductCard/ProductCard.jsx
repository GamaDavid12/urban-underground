import { useCart } from '../../context/CartContext';
import Button from '../Button/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-neutral-900 text-white rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="relative w-full aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1 text-yellow-400">"{product.name}"</h3>
        <p className="text-sm mb-4 text-gray-300 line-clamp-3">{product.description}</p>
        <ul className="text-xs text-gray-400 space-y-1 mb-4">
          <li><span className="font-semibold text-yellow-400">Estilo:</span> {product.style}</li>
          <li><span className="font-semibold text-yellow-400">Color base:</span> {product.colorBase}</li>
          <li><span className="font-semibold text-yellow-400">Género:</span> {product.gender}</li>
          {product.size && <li><span className="font-semibold text-yellow-400">Talle:</span> {product.size}</li>}
        </ul>

        <div className="mt-auto"></div>
        <Button onClick={handleAddToCart} text={"Agregar al Carrito"}/>
      </div>
    </div>
  );
};

export default ProductCard;