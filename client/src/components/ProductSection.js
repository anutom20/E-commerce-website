import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import SortFilter from "./filters/SortFilter";
import PageNavigation from "./PageNavigation";
import ProductsError from "./error/ProductsError";
import MessageOnly from "./MessageOnly";
const ProductSection = () => {
  const { loading, products, totalProductCount, fetchError } = useGlobalContext();
  
  if (loading) {
    return (
      <section className="product-section-loader">
        <Loading />
      </section>
    );
  }

  if (fetchError) {
    return <ProductsError message = 'Unable to fetch the products!' />;
  }

  if (totalProductCount === 0) {
    return <MessageOnly message={'No items matched your search!'} />;
  }

  return (
    <section className="product-section">
      <SortFilter />

      <section className="product-list-container">
        {products.map((item, index) => {
          const { _id, name, price, image } = item;

          return (
            <article className="single-product-container" key={index}>
              <img  className="product-img" src={image} alt="sitar" />
              <div className="product-info">
                <div className="product-name">
                  <h2>{name}</h2>
                </div>
                <div className="product-price">
                  <h3>₹{price}</h3>
                </div>
              </div>
              <div className="product-btn">
                <Link to={`/products/${_id}`} className="btn">
                  details
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      <PageNavigation />
    </section>
  );
};

export default ProductSection;
