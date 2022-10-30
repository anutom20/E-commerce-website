import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import ProductsError from "../components/error/ProductsError";


const url = "http://localhost:3001/api/v1/products/";

const SingleProduct = () => {
  
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [SingleProductError, setSingleProductError] = useState(false);

  const fetchSingleProduct = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get(`${url}${id}`, {withCredentials:true});
      const product = response.data;
      console.log(product);
      setProduct(product);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSingleProductError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading)
    return (
      <section className="single-product-section-loader">
        <Loading />
      </section>
    );

  if (SingleProductError) {
    return <ProductsError message='Product does not exist!' />;
  }

 

  const { name, price, description, rating, color, brand, image } = product;
  let ratingArray = ["item1", "item2", "item3", "item4", "item5"];
  let isInteger = Number.isInteger(rating);
  let newRating = Math.floor(rating);
  console.log(newRating);

  return (
    <section className="single-product-section">
      <div className="single-product-image-container">
        <img className="single-product-image" src={image} alt={name} />
      </div>
      <div className="single-product-info">
        <div className="single-product-title">
          <h1>{name}</h1>
        </div>
        <div className="single-product-price">
          <h1>₹{price}</h1>
        </div>
        <div className="single-product-rating">
          {ratingArray.map((item, index) => {
            if (index < newRating) {
              return <span className="fa fa-star rating-star"></span>;
            } else if (index === newRating && !isInteger) {
              
              return <span className="fa fa-star-half-full rating-star"></span>;
            } else {
              return <span className="fa fa-star-o rating-star"></span>;
            }
          })}
        </div>
        <div className="single-product-description">
          <p>{description}</p>
        </div>
        <div className="single-product-details">
          <h2>Details</h2>
          <h4>
            color
            <span className="details-colon-color">:</span>
            <span className="single-product-value">{color}</span>
          </h4>

          <h4>
            brand<span className="details-colon-brand">:</span>
            <span className="single-product-value">{brand}</span>
          </h4>
        </div>
        <div className="single-product-button-container">
          <button className="btn single-product-button">add to cart</button>
          <button className="btn single-product-button">buy now</button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
