import { NavLink } from "react-router-dom";

const Sidebar = ({ onItemClick, selectedItem }) => {
  const items = [
    { name: "Home", path: "/" },
    { name: "Item 1", path: "/item1" },
    { name: "Item 2", path: "/item2" },
    { name: "Item 3", path: "/item3" },
    { name: "Item 4", path: "/item4" },
    { name: "Item 5", path: "/item5" },
  ];

  return (
    <div className="w-[15%] bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        {items.map((item) => (
          <li key={item.name} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive || selectedItem === item.name
                    ? "bg-gray-600"
                    : "hover:bg-gray-700"
                }`
              }
              onClick={() => onItemClick(item.name)}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
