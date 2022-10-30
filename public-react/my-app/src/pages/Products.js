import React from "react";
import ProductSection from "../components/ProductSection";
import FilterSection from "../components/filters/FilterSection";


const Products = () => {
 
  return (
    <div className="product-container">
      <FilterSection />
      <ProductSection />
    </div>
  );
};

export default Products;
