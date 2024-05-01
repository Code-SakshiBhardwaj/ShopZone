import React, { useContext, useRef, useState } from 'react'
import './navbar.css'
import logo from '../assets/logo.jpg'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../assets/nav_dropdown.jpg'
import order from '../assets/icons/order.png'

const Navbar = () => {
    const [menu,setMenu] = useState('shop');
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt=''/>
            <p>ZONE</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: "none",color:"#171717"}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: "none",color:"#171717"}} to='/men'>Men</Link> {menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: "none",color:"#171717"}} to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: "none",color:"#171717"}} to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>} </li>
        </ul>
        <div className="nav-login-cart">
            
            {localStorage.getItem('auth-token')?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
            <Link to='/login'><button>Login</button></Link> }
            
            <Link to='/cart'><img src={cart_icon} alt=''/></Link> 
            <div className="nav-cart-count">{getTotalCartItems()}</div>

            {localStorage.getItem('auth-token')?<Link to='/orders'><img src={order} alt="" style={{height:"38px",width:"44px"}}/></Link>:null}
        </div>
    </div>
  )
}

export default Navbar
