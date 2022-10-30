import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UrlBuilder } from "@innova2/url-builder";



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

  const clearAllFilters = () => {
    setSearchTerm("");
    setBrand("All");
    setColor("All");
    setPrice(15000);
    setActiveColorIndex(-1);
    setSort("price");
  };

  // getting user info on login or register
  const [name, setName] = useState("");
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${URL}/users/userId`, {
        withCredentials: true,
      });
      const data = response.data;
      // WriteCookie(data.name);
      setName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  let url = UrlBuilder.createFromUrl("http://localhost:3001/api/v1/products");
  let allUrl = UrlBuilder.createFromUrl(
    "http://localhost:3001/api/v1/products"
  );

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

      url.addQuery("numericFilters=price<", price);
      allUrl.addQuery("numericFilters=price<", price);

      url.addQuery("sort", sort);
      allUrl.addQuery("sort", sort);

      allUrl.addQuery("limit", 1000000);

      allUrl.toString();

      // add page query only to url

      url.addQuery("page", pageNo);

    

      const allRes = await axios.get(allUrl, {withCredentials:true});
      const allData = allRes.data;
      setTotalProductCount(allData.count);

      url.toString();

  
      const res = await axios.get(url, {withCredentials:true});
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
