import React, { useContext, useState } from 'react';
import './payment.css'; // Import CSS file for styling
import Popup from '../popup/popup';
import successImg from '../assets/icons/success.jpg'
import { ShopContext } from '../../context/ShopContext';
import OrderItems from '../order-items/order-items';

const Payment = ({ handleClose, show }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cnErr, setCnErr] = useState('');
  const [expErr, setExpErr] = useState('');
  const [cvvErr, setCvvErr] = useState('');
  const {placeOrder,getOrders, getCart} = useContext(ShopContext);

  const toggleSuccessPopup = () => {
    setShowSuccessPopup(!showSuccessPopup);
  };

  const handleClick = async() => {
    handleClose();
    placeOrder();
    getCart();
    toggleSuccessPopup();
  }

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value.toString().replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,'$1 '));
    event.target.value.length !== 19? setCnErr('Please enter the valid card number'): setCnErr('')
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value.toString().replace(/\D/g,'').replace(/(\d{2})(?=\d)/g, '$1/'));
    // validate
    validateExpDate(event.target.value.toString().replace(/\D/g,'').replace(/(\d{2})(?=\d)/g, '$1/'))?setExpErr(''):setExpErr('Invalid date');
    
    
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value.toString().replace(/\D/g,''));
    // validate
    event.target.value.length < 3? setCvvErr('Please enter the valid cvv'): setCvvErr('')
  };

  const validateExpDate = date => {
    const month=Number(date.slice(0,2));
    const year=Number(date.slice(3,5));
    const currMonth=new Date().getMonth()+1;
    const currYear=Number(new Date().getFullYear().toString().slice(2,4));
    if(month<1 || month>12 ){
      return false
    }
    if(year<currYear || year>currYear+10){
      return false
    }
    else if(year === currYear){
      if(month>currMonth){
        return true
      }
      else{
        return false
      }
    }
    return true
  }


  const isFormValid = cardNumber.trim() !== '' && expiry.trim() !== '' && cvv.trim() !== '';

  const showHideClassName = show ? "payment-modal display-block" : "payment-modal display-none";

  return (
    <>
    <div className={showHideClassName}>
      <section className="payment-modal-main">
      <div className='payment-header'>
        <span className='payment-heading'>Payment Details</span>
        <button className="payment-close-button" onClick={handleClose}>&times;</button>
        </div>
        <div className='payment-post-header'>
          <div className="payment-input-container">
            <label htmlFor="payment-cardNumber">Card Number:</label>
            <input type="text" placeholder='XXXX XXXX XXXX XXXX' id="payment-cardNumber" maxLength="19" name="payment-cardNumber" value={cardNumber} onChange={handleCardNumberChange} required />
            {cnErr?<p style={{color:"red",fontSize:"12px"}}>{cnErr}</p>:null}
          </div>
          <div className="payment-input-container">
            <label htmlFor="payment-expiry">Expiry Date:</label>
            <input type="text" id="payment-expiry" name="payment-expiry" placeholder='MM/YY' maxLength="5" value={expiry} onChange={handleExpiryChange} required />
            {expErr?<p style={{color:"red",fontSize:"12px"}}>{expErr}</p>:null}
          </div>
          <div className="payment-input-container">
            <label htmlFor="payment-cvv">CVV:</label>
            <input type="password" id="payment-cvv" name="payment-cvv" placeholder='***' maxLength="3" value={cvv} onChange={handleCvvChange} required />
            {cvvErr?<p style={{color:"red",fontSize:"12px"}}>{cvvErr}</p>:null}
          </div>
          <div className="payment-button-container">
            <button className="payment-pay-button" disabled={!isFormValid} onClick={handleClick}>Pay Now</button>
          </div>
        </div>
      </section>
    </div>
     <Popup show={showSuccessPopup} handleClose={toggleSuccessPopup} message={'Order Placed Successfully!'} image={successImg}></Popup>
     </>
  );
};

export default Payment;
