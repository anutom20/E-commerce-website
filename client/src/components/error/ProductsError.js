import React from 'react'

const ProductsError = ({message}) => {
  return (
    <div>
      <section className="products-error">
        <h1>{message}</h1>
      </section>
    </div>
  );
}

export default ProductsError
