import React, { useEffect } from 'react'

const FormError = ({message, newClass}) => {
 
  return (
    <div className={`form-error ${newClass}`}>
      <p>{message}</p>
    </div>
  )
}

export default FormError
