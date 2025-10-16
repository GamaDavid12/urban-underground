import Button from '../../../components/Button/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const mockCategories = [
  { id: 1, name: "ROPA", productCount: 150 },
  { id: 2, name: "ACCESORIOS", productCount: 80 },
];

const CategoryTable = ({ categories = mockCategories }) => {

  return (
    <div className="overflow-x-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              CATEGORIAS
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              PRODUCTOS
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-800 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {category.productCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div className="flex justify-center gap-3">
                  <Button
                    icon={<FaPencilAlt />}
                    variant="icon"
                    onClick={() => console.log('Editar', category.name)}
                    className="text-yellow-400 hover:text-white"
                  />
                  <Button
                    icon={<FaTrash />}
                    variant="icon"
                    onClick={() => console.log('Borrar', category.name)}
                    className="text-red-500 hover:text-red-400"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end p-4 text-gray-400 text-sm border-t border-gray-700">
        &lt;1 / 10&gt;
      </div>
    </div>
  );
};

export default CategoryTable;