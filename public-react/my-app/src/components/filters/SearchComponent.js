import React from "react";
import { useGlobalContext } from "../../context";

const SearchComponent = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const searchVal = React.useRef("");

  const searchProduct = () => {
    setSearchTerm(searchVal.current.value);
  };
  return (
    <div className="form-control">
      <input
        type="text"
        className="search-input"
        placeholder="search.."
        name="text"
        ref={searchVal}
        onChange={searchProduct}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchComponent;
