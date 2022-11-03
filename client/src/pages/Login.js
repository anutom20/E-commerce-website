import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import URL from "../URL";
import { UrlBuilder } from "@innova2/url-builder";
import FormError from "../components/error/FormError";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import FormSuccess from "../components/success/FormSuccess";






const Login = () => {
  const navigate = useNavigate()
  const {name} = useGlobalContext()
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState({})
  const emailVal = useRef("")
  const passwordVal = useRef("")
  const [loggedIn, setLoggedIn] = useState(false);
  
  const url = UrlBuilder.createFromUrl(`${URL}/auth/login`)                                                                    
  const {getUserInfo, setName} = useGlobalContext()
  const handleClick = async (e)=>{
    setName('shuttershuttershuttershutter123')
    e.preventDefault()
   try {
     const response = await axios({
      url:url,
      method:'post',
      data:{
        email,password
      },
      withCredentials:true
     })
     const resData = response.data;
     setData(resData);
     setLoggedIn(true)
     getUserInfo()
     const timeout = setTimeout(() => {
      navigate("/products");
     }, 2000);
     return ()=> clearTimeout(timeout)
     
     
    
   } catch (error) {
     console.log(error);
     setData(error.response.data)
   }
   
  }

  useEffect(()=>{
    if(data.error){
    const timeout = setTimeout(() => {
      setData({})
      setLoggedIn(false)
      
    }, 5000);
    return () => clearTimeout(timeout)
    }
    
  },[data])


  return (
    <section className="login-form">
      <form className="form">
        <div className="form-title">
          <h1>myMusic</h1>
        </div>
        <h3>Login</h3>
        <div className="form-row">
          <label htmlFor="email">email</label>
          <input type="email" className="form-input" 
          ref = {emailVal}
          onChange={()=>{
            setEmail(emailVal.current.value)
          }}/>
        </div>
        <div className="form-row">
          <label htmlFor="password">password</label>
          <input type="password" className="form-input"
          ref={passwordVal} 
          onChange={()=>{
            setPassword(passwordVal.current.value)
          }}/>
        </div>
        <button className="btn form-btn" onClick={handleClick}>Submit</button>
        <p className="form-para">
          Not a member yet?
          <Link className="register-link" to = '/register'>Register</Link>
        </p>
         {data.error && <FormError message={data.error}/>}
         {loggedIn  && <FormSuccess message='Login successful!'/>}

      </form>
    </section>
  );
};

export default Login;
