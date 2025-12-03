import React from "react";
import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";

const Search = ({ isOpen, onClose }) => {
  return (
    <DropdownPanel isOpen={isOpen} onClose={onClose} title="Search">
      {/* Можно добавить сюда содержимое поиска */}
      <input
        type="text"
        placeholder="Search..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
    </DropdownPanel>
  );
};

export default Search;
