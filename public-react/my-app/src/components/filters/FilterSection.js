import React from "react";
import SearchComponent from "./SearchComponent";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import { useGlobalContext } from "../../context";

const FilterSection = () => {
  const {clearAllFilters} = useGlobalContext()
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="filter-section">
      <form className="content" onSubmit={handleSubmit}>
        <SearchComponent />
        <div className="form-control">
          <h5>Brand</h5>
          <BrandFilter />
        </div>
        <div className="form-control">
          <h5>colors</h5>
          <ColorFilter />
        </div>
        <div className="form-control">
          <h5>Price</h5>
          <PriceFilter />
        </div>
        <button className="btn clear-filter-btn" onClick={clearAllFilters}>clear filters</button>
      </form>
    </section>
  );
};

export default FilterSection;
