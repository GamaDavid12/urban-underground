import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const AdminSidebar = () => {
  const { 
    data: adminLinks,
    loading, 
    error 
  } = useFetch('/api/admin/links');

  if (loading) {
    return (
      <div className="w-60 h-full bg-[#010000] text-white shadow-xl flex items-center justify-center flex-shrink-0">
        <p>Cargando opciones de Admin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-60 h-full bg-[#010000] text-red-400 shadow-xl flex items-center justify-center flex-shrink-0">
        <p className="p-3">Error al cargar: {error}. Acceso denegado.</p>
      </div>
    );
  }

  if (!adminLinks || adminLinks.length === 0) {
    return (
        <div className="w-60 h-full bg-[#010000] text-white shadow-xl flex items-center justify-center flex-shrink-0">
            <p className="p-3">No hay links de administración disponibles.</p>
        </div>
    );
  }

  return (
    <div className="w-60 h-full bg-[#010000] text-white shadow-xl flex flex-col flex-shrink-0">
      
      <div className="p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold text-yellow-400">Admin Panel</h2>
      </div>

      <div className="flex-grow overflow-y-auto">
        <ul className="list-none p-0 m-0"> 
          {adminLinks.map((link) => (
            <li
              key={link.id}
              className="px-5 py-3 text-lg font-medium border-b border-gray-900 cursor-pointer transition duration-200 hover:bg-gray-800"
            >
              <Link
                to={link.path}
                className="text-white no-underline flex items-center gap-3"
              >
                {link.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;