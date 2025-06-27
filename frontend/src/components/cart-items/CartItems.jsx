import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import Payment from '../payment/payment'

const CartItems = () => {
    const {all_product, cartItems, getCart, removeFromCart, getTotalCartAmount, addToCart} = useContext(ShopContext);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    useEffect(() => {
        getCart();
    },[cartItems,getCart]);

  const togglePaymentPopup = () => {
    setShowPaymentPopup(!showPaymentPopup);
  };
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
        </div>
        <hr/>
        {all_product.map((item)=>{
            if(cartItems[item.id]>0){
                return <div key={item.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={item.image} alt="" className='carticon-product-icon'/>
                    <p>{item.name}</p>
                    <p>${item.new_price}</p>
                    <p><span className="cartitems-change-quantity" onClick={()=>addToCart(item.id)} >+</span>
                    <button className='cartitems-quantity'>{cartItems[item.id]}</button>
                    <span className="cartitems-change-quantity" onClick={()=>removeFromCart(item.id)} >-</span></p>
                    <p>${item.new_price*cartItems[item.id]}</p>
                </div>
                <hr/>
            </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button className='cartitems-proceed-button' onClick={togglePaymentPopup}>PROCEED TO CHECKOUT</button>
                <Payment show={showPaymentPopup} handleClose={togglePaymentPopup} />
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems
