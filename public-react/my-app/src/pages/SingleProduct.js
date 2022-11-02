import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ProductsError from "../components/error/ProductsError";
import URL from "../URL";
import { UrlBuilder } from "@innova2/url-builder";
import FormSuccess from "../components/success/FormSuccess";
import FormError from "../components/error/FormError";
import { useGlobalContext } from "../context";

const url = `${URL}/products/`;

const SingleProduct = () => {


const { getCartItems } = useGlobalContext();


  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [SingleProductError, setSingleProductError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [resData, setResData] = useState(null);

  const addToCartUrl = UrlBuilder.createFromUrl(`${URL}/products/${id}`);
  addToCartUrl.addQuery("queryParam", "addToCart");

  let badResponse = false;

  const addItemToCart = async () => {
    try {
      const response = await axios({
        url: addToCartUrl,
        method: "post",
        data:{
        quantity:quantity
        },
        withCredentials: true,
      });
      setResData(response.data);
    } catch (error) {
      console.log(error);
      setResData(error);
    }
    getCartItems()
  };

  const fetchSingleProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}${id}`, {
        withCredentials: true,
      });
      const product = response.data;
      console.log(product);
      setProduct(product);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.code === "ERR_BAD_RESPONSE") badResponse = true;
      setSingleProductError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  useEffect(()=>{
    if(resData){
      const timeout = setTimeout(() => {
        setResData(null)
      }, 4000);
      return ()=> clearTimeout(timeout)
    }
  },[resData])

  if (loading)
    return (
      <section className="single-product-section-loader">
        <Loading />
      </section>
    );

  if (SingleProductError && badResponse) {
    return <ProductsError message="Unable to fetch the product!" />;
  }
  if (SingleProductError) {
    return <ProductsError message="Product does not exist!" />;
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
        <div className="single-product-quantity">
          <button
            className="quantity-btn"
            onClick={() => {
              let no = quantity;
              no--;
              if (no < 1) no = 1;
              setQuantity(no);
            }}
          >
            -
          </button>
          <h2>{quantity}</h2>
          <button
            className="quantity-btn"
            onClick={() => {
              let no = quantity;
              no++;
              if (no > 10) no = 10;
              setQuantity(no);
            }}
          >
            +
          </button>
        </div>
        <div className="single-product-button-container">
          <button className="btn single-product-button" onClick={addItemToCart}>
            add to cart
          </button>
          <button className="btn single-product-button">buy now</button>
        </div>
      </div>
      {resData &&
        (resData.error ? (
          <FormError style={{ marginTop: "2rem" }} message={resData.error} />
        ) : resData.message ? (
          <FormError style={{ marginTop: "2rem" }} message={resData.message} />
        ) : (
          <FormSuccess
            style={{ marginTop: "2rem" }}
            message={"Item added to cart"}
          />
        ))}
    </section>
  );
};

export default SingleProduct;
