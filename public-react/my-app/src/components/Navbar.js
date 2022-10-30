import { Link } from "react-router-dom";
import {BsCart} from 'react-icons/bs'
import {HiUserPlus} from 'react-icons/hi2'
import getCookie from "../cookies/getCookie";
import { useGlobalContext } from "../context";
import UserDropDown from "./UserDropDown";


const Navbar = () => {

  useGlobalContext()
  
  return (
    <nav className="nav-section">
      <div className="nav-center">
        <div className="nav-header">
          <div className="nav-title">
            <a href="/">
              <h1>myMusic</h1>
            </a>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <div className="cart-login-wrapper">
          <Link to = '/viewcart' className="cart-btn" href="/">
            Cart
            <span className="cart-container">
              <BsCart />
              <span className="cart-value">3</span>
            </span>
          </Link>
          { document.cookie.indexOf('username') > -1 ? (
          
            <UserDropDown name={getCookie('username')}/>
          ) : (
            <Link to="/login" className="auth-btn">
              Login
              <span className="user-auth-icon">
                <HiUserPlus />
              </span>
            </Link>
          )}
          
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar
