import { Link } from "react-router-dom";

const adminLinks = [
  { 
    id: 'dashboard', 
    titulo: 'Panel de Control', 
    path: '/admin', 
  },
  { 
    id: 'createCategory', 
    titulo: 'Crear Categoría', 
    path: '/admin/crear-categoria', 
  },
  { 
    id: 'viewCategories', 
    titulo: 'Gestionar Categorías', 
    path: '/admin/categorias',
  },
  { 
    id: 'products', 
    titulo: 'Productos', 
    path: '/admin/productos', 
  },
  { 
    id: 'orders', 
    titulo: 'Órdenes', 
    path: '/admin/ordenes', 
  },
];

const AdminSidebar = () => {
  return (
    <div className="w-60 h-full bg-gray-950 text-white shadow-xl flex flex-col flex-shrink-0">
      
      <div className="p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold text-yellow-400">Admin Panel</h2>
      </div>

      <ul className="list-none p-0 m-0 flex-grow overflow-y-auto">
        {adminLinks.map((link) => (
          <li
            key={link.id}
            className="px-5 py-3 text-lg font-medium border-b border-gray-900 cursor-pointer transition duration-200 hover:bg-gray-800"
          >
            <Link
              to={link.path}
              className="text-white no-underline flex items-center gap-3"
            >
              <span className="text-xl">{link.icon}</span>
              {link.titulo}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="p-5 border-t border-gray-800">
         <Link
            to="/"
            className="text-red-500 no-underline block hover:text-red-400 font-semibold"
          >
            Cerrar Sesión
          </Link>
      </div>
      
    </div>
  );
};

export default AdminSidebar;