import React from "react";
import { useGlobalContext } from "../../context";

const SortFilter = () => {
  const { sort, setSort, products, totalProductCount } = useGlobalContext();

  const sortChange = () =>{
    setSort(document.getElementById('selectSort').value)
  }
  return (
    <div className="product-sort-container">
      <p>{`${totalProductCount} products found`}</p>
      <hr className="product-sort-line" />
      <h5>Sort By</h5>
      <form className="sort-form">
        <select
          name="sort-filter"
          className="sort-filter-select"
          id="selectSort"
          onChange={sortChange}
          value={sort}
        >
          <option value="price"> Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          <option value="name"> Name (Low to High)</option>
          <option value="-name"> Name (High to Low)</option>
        </select>
      </form>
    </div>
  );
};

export default SortFilter;
