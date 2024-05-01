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
    setCardNumber(event.target.value);
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

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
            <input type="number" id="payment-cardNumber" name="payment-cardNumber" value={cardNumber} onChange={handleCardNumberChange} required />
          </div>
          <div className="payment-input-container">
            <label htmlFor="payment-expiry">Expiry Date:</label>
            <input type="text" id="payment-expiry" name="payment-expiry" value={expiry} onChange={handleExpiryChange} required />
          </div>
          <div className="payment-input-container">
            <label htmlFor="payment-cvv">CVV:</label>
            <input type="number" id="payment-cvv" name="payment-cvv" value={cvv} onChange={handleCvvChange} required />
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
