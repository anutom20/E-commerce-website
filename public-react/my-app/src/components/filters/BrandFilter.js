import React from 'react'
import { useGlobalContext } from '../../context'
import { brands } from '../../data'

const BrandFilter = () => {
    const {brand , setBrand} = useGlobalContext()

     const brandChange = () => {
       setBrand(document.getElementById("selectBrand").value);
     };
  return (
    
          <select
            name="brand"
            className="brand"
            id="selectBrand"
            onChange={brandChange}
            value={brand}
          >
            {brands.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
  )
}

export default BrandFilter
