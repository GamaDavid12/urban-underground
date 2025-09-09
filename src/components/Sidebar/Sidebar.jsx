import { Link } from "react-router-dom";
import { categories } from '../../Mocks/categoriesMock.js';
import CloseButton from "../Button/CloseButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
  <>
      <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-black text-white shadow-lg transition-transform duration-300 ease-in-out z-[1000] flex flex-col transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4 border-b border-gray-800">
        <CloseButton onClick={toggleSidebar} />
        </div>

        <ul className="list-none p-0 m-0 flex-grow">
          {categories.map((category) => (
            <li
              key={category.id}
              className="px-5 py-4 text-lg font-semibold border-b border-gray-900 last:border-b-0 cursor-pointer"
              onClick={toggleSidebar}
            >
              <Link
                to={category.path}
                className="text-white no-underline block transition-colors duration-200 hover:text-yellow-400"
              >
                {category.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
