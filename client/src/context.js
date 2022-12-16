import React, { useEffect, useContext, useState, useReducer } from "react";
import axios from "axios";
import { UrlBuilder } from "@innova2/url-builder";
import URL from "./URL";
import reducer from "./reducer";

const cartUrl = `${URL}/users/userId/cart`;
const initialState = {
  cart: [],
  cartError: false,
  cartLoading: false,
  shippingFee: Math.floor((Math.random() * 50) + 1),
  total : 0,
  totalQuantity : 0
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState(15000);
  const [activeColorIndex, setActiveColorIndex] = useState(-1);
  const [sort, setSort] = useState("price");
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [name, setName] = useState("");

  


  const clearAllFilters = () => {
    setSearchTerm("");
    setBrand("All");
    setColor("All");
    setPrice(15000);
    setActiveColorIndex(-1);
    setSort("price");
  };

  // getting user info on login or register

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${URL}/users/userId`, {
        withCredentials: true,
      });
      const data = response.data;
      setName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  let url = UrlBuilder.createFromUrl(`${URL}/products`);
  let allUrl = UrlBuilder.createFromUrl(`${URL}/products`);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (searchTerm) {
        url.addQuery("name", searchTerm);
        allUrl.addQuery("name", searchTerm);
      }
      if (brand !== "All") {
        url.addQuery("brand", brand);
        allUrl.addQuery("brand", brand);
      }
      if (color !== "All") {
        url.addQuery("color", color);
        allUrl.addQuery("color", color);
      }

      url.addQuery("price", price);
      allUrl.addQuery("price", price);

      url.addQuery("sort", sort);
      allUrl.addQuery("sort", sort);

      allUrl.addQuery("limit", 1000000);

      allUrl.toString();

      // add page query only to url

      url.addQuery("page", pageNo);

      const allRes = await axios.get(allUrl, { withCredentials: true });
      const allData = allRes.data;
      setTotalProductCount(allData.count);

      url.toString();

      console.log(url.toString())

      const res = await axios.get(url, { withCredentials: true });
      const data = res.data;
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFetchError(true);
    }
    setLoading(false);
  };

  // reset page number for each different query
  useEffect(() => {
    setPageNo(1);
    fetchProducts();
  }, [searchTerm, brand, color, price, sort]);

  // for page navigation
  useEffect(() => {
    fetchProducts();
  }, [pageNo]);


  // CART
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCartItems = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await axios.get(cartUrl, { withCredentials: true });
      const cart = response.data.cart;
      dispatch({ type: "DISPLAY_ITEMS", payload: cart });
      getTotalsInCart()
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  };
  const emptyCart = async () => {
    try {
      await axios.delete(cartUrl, { withCredentials: true });
      clearShoppingCart()
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  };



  const increaseQuantityInCart = (id)=>{
    dispatch({type:'INCREASE_QUANTITY', payload:id})
    getTotalsInCart()
  }
  const decreaseQuantityInCart = (id)=>{
    dispatch({type:'DECREASE_QUANTITY', payload:id})
    getTotalsInCart()
  }

  const updateSubTotalInCart = (id) =>{
    dispatch({type:'UPDATE_SUBTOTAL', payload:id})
    getTotalsInCart()
  }

  const removeItemFromCart = (id)=>{
    dispatch({type:'REMOVE_ITEM' , payload:id})
    getTotalsInCart()
  }

  const getTotalsInCart = ()=>{
    dispatch({type:'GET_ORDER_TOTALS'})
  }

  const clearShoppingCart = ()=>{
    dispatch({type:'CLEAR_CART'})
    getTotalsInCart()

  }




  

  useEffect(() => {
    getCartItems();
  }, [name]);

  return (
    <AppContext.Provider
      value={{
        loading,
        products,
        searchTerm,
        setSearchTerm,
        brand,
        setBrand,
        color,
        setColor,
        activeColorIndex,
        setActiveColorIndex,
        price,
        setPrice,
        sort,
        setSort,
        clearAllFilters,
        totalProductCount,
        setTotalProductCount,
        pageNo,
        setPageNo,
        fetchError,
        name,
        setName,
        getUserInfo,
        ...state,
        increaseQuantityInCart,
        decreaseQuantityInCart,
        updateSubTotalInCart,
        getCartItems,
        removeItemFromCart,
        emptyCart
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
