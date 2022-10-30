import React from 'react'
import { useGlobalContext } from '../../context'

const PriceFilter = () => {
     const priceVal = React.useRef("");
    const {price , setPrice} = useGlobalContext()
  return (
    <>
      <p className="price">₹{price}</p>
      <input
        type="range"
        name="price"
        className='price-input'
        min={0}
        max={15}
        ref={priceVal}
        value={price / 1000}
        onChange={() => {
          setPrice(priceVal.current.value * 1000);
        }}
      />
    </>
  );
}

export default PriceFilter
