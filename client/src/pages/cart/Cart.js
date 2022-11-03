import React from "react";
import getCookie from "../../cookies/getCookie";
import { useGlobalContext } from "../../context";
import MessageWithButton from "../../components/error/MessageWithButton";
import CartList from "./CartList";
const Cart = () => {
  useGlobalContext();
  if (document.cookie.indexOf("username") > -1) {
    const nameOfUser = getCookie("username");
    return <CartList name={nameOfUser}/>
  }
  return (
    <MessageWithButton
      message={"Please login to see your cart "}
      buttonText={"Login"}
      linkTo={"/login"}
    />
  );
};

export default Cart;
