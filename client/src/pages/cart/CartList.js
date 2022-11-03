import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MessageOnly from '../../components/MessageOnly'
import CartItem from './CartItem'
import MessageWithButton from '../../components/error/MessageWithButton'
import Loading from '../../components/Loading'
import { useGlobalContext } from '../../context'
import FormError from '../../components/error/FormError'
import FormSuccess from '../../components/success/FormSuccess'
import { useState } from 'react'





const CartList = ({name}) => {
  
  const {cartLoading, cartError , cart, total , shippingFee, emptyCart} = useGlobalContext()

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg , setSuccessMsg] = useState('')

  const childToParentData = (error,success)=>{
       setErrorMsg(error)
       setSuccessMsg(success)
  }


  useEffect(()=>{
    if(errorMsg !== ''){
      const timeout = setTimeout(() => {
        setErrorMsg('')
      }, 2000);
      return ()=> clearTimeout(timeout)
    }
    if(successMsg !== ''){
      const timeout = setTimeout(() => {
        setSuccessMsg('')
      }, 2000);
      return ()=> clearTimeout(timeout)
    }

  },[errorMsg,successMsg])
 

  if(cartLoading) {
     return (
       <section className="single-product-section-loader">
         <Loading />
       </section>
     );}

  if(cartError){
    return <MessageOnly message={'Something went wrong!'} />
  }

  if(cart.length === 0){
    return <MessageWithButton message={'Cart is empty!'} linkTo={'/products'} buttonText={'Fill it'}/>
  }

  

  return (
    <section className="cart-list-section">
      <div className="cart-list-name-title">
        <h1>{`Hi ${name} , Welcome to your cart!`}</h1>
      </div>

      <div className="cart-list">
        <div className="cart-list-item-title-names">
          <h5>item</h5>
          <h5>price</h5>
          <h5>quantity</h5>
          <h5>subtotal</h5>
        </div>
        <hr />
        {cart.map((cartItem, index) => {
          return <CartItem cartItem={cartItem} key={index} childToParentData= {childToParentData} />;
        })}
        <hr />
        {errorMsg !== '' && (
          <FormError newClass="message-cart-quantity" message={errorMsg} />
        )}
        {successMsg !== '' && (
          <FormSuccess
            newClass="message-cart-quantity"
            message={successMsg}
          />
        )}

        <div className="cart-list-buttons">
          <Link className="btn cart-list-btn-left" to="/products">
            Continue Shopping
          </Link>
          <button className="btn cart-list-btn-right" onClick={emptyCart}>Clear Shopping Cart</button>
        </div>
      </div>
      
      <div className="cart-total-section">
        <div className="cart-subtotal">
          <h5>
            Subtotal :<span className="cart-subtotal-span">₹ {total}</span>
          </h5>
        </div>
        <div className="cart-shipping-fee">
          <h5>
            Shipping Fee :<span className="cart-shipping-fee-span">₹ {shippingFee}</span>
          </h5>
        </div>
        <hr />
        <div className="cart-order-total">
          <h5>
            Order Total :<span className="cart-order-total-value">₹ {total+shippingFee}</span>
          </h5>
        </div>
      </div>
      <button className="btn checkout-btn">proceed to checkout</button>
    </section>
  );
}

export default CartList
