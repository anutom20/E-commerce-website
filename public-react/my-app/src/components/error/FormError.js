import React, { useEffect } from 'react'

const FormError = ({message}) => {
 
  return (
    <div className='form-error'>
      <p>{message}</p>
    </div>
  )
}

export default FormError
