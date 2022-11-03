import React from 'react'

const FormSuccess = ({message , newClass}) => {
   return (
     <div className={`form-success ${newClass}`}>
       <p>{message}</p>
     </div>
   );
}

export default FormSuccess
