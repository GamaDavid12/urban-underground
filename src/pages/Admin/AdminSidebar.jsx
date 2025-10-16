import { Link } from "react-router";
import { adminLinks } from "../../Mocks/adminDataMock";

const AdminSidebar = () => {
  return (
    <div className="w-60 h-full bg-[#010000] text-white shadow-xl flex flex-col flex-shrink-0">
      
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
    </div>
  );
};

export default AdminSidebar;