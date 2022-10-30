import React from 'react'
import deleteCookie from '../cookies/deleteCookie';
import axios from 'axios';
import URL from '../URL';
import { Link  } from 'react-router-dom';
import { useGlobalContext } from '../context';



const UserDropDown = ({name}) => {
  
  const {setName} = useGlobalContext()

  const handleClick = async()=>{
   
    try{
      const response = await axios.delete(`${URL}/auth/logout`, {withCredentials:true})
      console.log(response)
    } catch(error){
      console.log(error)
    }
    deleteCookie('username')
    setName('random')

  }
    
   return (
     <div class="dropdown" style={{float:'right'}}>
       <button class="auth-btn">{`Hello, ${name}`}</button>
       <div class="dropdown-content">
         
          <Link to='/myOrders'>My Orders</Link>
          <Link  onClick={handleClick}>Logout</Link>
         
       </div>
     </div>
   );
}

export default UserDropDown
