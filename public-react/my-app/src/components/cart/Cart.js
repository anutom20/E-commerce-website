import React from 'react'
import { Link } from 'react-router-dom'
import getCookie from '../../cookies/getCookie'
import { useGlobalContext } from '../../context'
const Cart = () => {
    
   useGlobalContext()
    if(document.cookie.indexOf('username') > -1){
        const nameOfUser = getCookie('username')
        return <h1>{`Hi ${nameOfUser}, welcome to your cart `}</h1>
    }
  return (
    <div>
      <h1>Please login to see your cart!</h1>  
      <Link className='btn' to = '/login'>Login</Link>
    </div>
  )
}

export default Cart
