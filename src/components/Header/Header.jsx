import React from "react";

const Header = ({ selectedItem }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">{selectedItem} Header</h1>
    </header>
  );
};

export default Header;
