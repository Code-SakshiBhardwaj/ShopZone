import React from 'react';
import './popup.css';

const Popup = ({ handleClose, show, message, image }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <button className="popup-close-button" onClick={handleClose}>&times;</button>

        <div>
            <div>
                <img className='popup-icon' src={image} alt="" />
            </div>
          {message}
        </div>
      </section>
    </div>
  );
};

export default Popup;
