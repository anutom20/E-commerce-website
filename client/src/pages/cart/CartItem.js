import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import URL from "../../URL";
import FormError from "../../components/error/FormError";
import FormSuccess from "../../components/success/FormSuccess";
import { useNavigate } from "react-router-dom";
import { colorsHex } from "../../data";


const CartItem = ({ cartItem, childToParentData }) => {
  const {
    increaseQuantityInCart,
    decreaseQuantityInCart,
    updateSubTotalInCart,
    removeItemFromCart
  } = useGlobalContext();

  const navigate = useNavigate()
  const [response, setResponse] = useState(null);
  const [error , setError] = useState(false)
  const [disabled ,setDisabled] = useState(false)
  const [errorMsg , setErrorMsg] = useState('')
  const [successMsg , setSuccessMsg] = useState('')
 
 

  const { name, image, price, subtotal, quantity, color, _id, productId } =
    cartItem;

    
  const updateUrl = `${URL}/users/userId/cart/${productId}`;

  const handleDecreaseClick = async (id) => {
   
    setDisabled(true)
     
    try{
      const cartResponse = await axios( {
      url: updateUrl,
      method: 'patch',
      data: {
        
        quantity: quantity-1 < 1 ? 1 : quantity-1,
      },
      withCredentials:true
    });
    setResponse(cartResponse.data)
   
     decreaseQuantityInCart(id);
     updateSubTotalInCart(id);
    } catch(error){
      console.log(error)
      setError(true)
      
    }

    
  };

  const handleIncreaseClick = async (id) => {
    
    setDisabled(true)
    try {
      const cartResponse = await axios({
        url: updateUrl,
        method: "patch",
        data: {
          quantity: quantity+1 > 10 ? 10 : quantity+1,
        },
        withCredentials: true,
      });
      setResponse(cartResponse.data);
     
      increaseQuantityInCart(id);
      updateSubTotalInCart(id);
    } catch (error) {
      console.log(error);
      setError(true);
      
    }
  };

  const handleRemoveItem = async(id)=>{
   

    try {
      const cartResponse = await axios({
        url: updateUrl,
        method: "delete",
        withCredentials: true,
      });
      setResponse(cartResponse.data);
      removeItemFromCart(id);
      
      childToParentData('', 'Item removed')
      setSuccessMsg('Item removed')
    } catch (error) {
      console.log(error);
      setError(true);
      
      childToParentData('Trouble removing item','')
      setErrorMsg('trouble removing item')
    }

  }

  useEffect(()=>{
    if(response){
     const timeout = setTimeout(() => {
      setResponse(null)
      setDisabled(false)
     }, 1500);
       
     return () => clearTimeout(timeout); 

    }
    if(error){
       const timeout = setTimeout(() => {
         setError(null);
         setDisabled(false);
       }, 1500);
       return () => clearTimeout(timeout); 
    }

   
  },[error,response])

  const handleItemClick = () =>{
   navigate(`/products/${productId}`)
  }

  return (
    <>
      
        <div className="cart-list-info">
          <div className="cart-list-item-container" onClick={handleItemClick}>
            <img src={image} alt={name} />
            <div className="cart-list-item-title-color-container">
              <p className="cart-list-item-title">{name}</p>
              <p className="cart-list-item-color">
                Color :<span className="cart-list-color-span" style={{ background: `${colorsHex[color]}` }}></span>
              </p>
            </div>
          </div>
          <div className="cart-list-price-container">
            <h5>₹ {price}</h5>
          </div>
          <div className="cart-list-quantity-container">
            <button
              className={
                disabled ? "quantity-btn disabled-btn" : "quantity-btn"
              }
              disabled={disabled}
              onClick={() => {
                handleDecreaseClick(_id);
              }}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              className={
                disabled ? "quantity-btn disabled-btn" : "quantity-btn"
              }
              disabled={disabled}
              onClick={() => {
                handleIncreaseClick(_id);
              }}
            >
              +
            </button>
          </div>
          <div className="cart-list-subtotal-container">
            <h5>₹ {subtotal}</h5>
          </div>
          <div className="cart-list-button-container">
            <FaTrash
              className="cart-trash-icon"
              onClick={() => {
                handleRemoveItem(_id);
              }}
            />
          </div>
        </div>
      
      {(error && !errorMsg) &&  (
        <FormError newClass="message-cart-quantity" message='unable to update quantity!' />
      )}
      {(response && !successMsg) && (
        <FormSuccess
          newClass="message-cart-quantity"
          message='quantity updated'
        />
      )}
  </>
  );
};

export default CartItem;
