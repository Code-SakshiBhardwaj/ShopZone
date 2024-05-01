import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(0);
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                    <img src={product?.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product?.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product?.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product?.old_price}</div>
                    <div className="productdisplay-right-price-new">${product?.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                Indulge in celestial elegance with our Midnight Symphony Gown. Hand-sewn sequins and beads
                twinkle like stars on the bodice, while layers of midnight-blue chiffon cascade gracefully,
                creating a mesmerizing silhouette.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        <div className={selectedSize===0?'selectedSize':''} onClick={()=>setSelectedSize(0)}>S</div>
                        <div className={selectedSize===1?'selectedSize':''} onClick={()=>setSelectedSize(1)}>M</div>
                        <div className={selectedSize===2?'selectedSize':''} onClick={()=>setSelectedSize(2)}>L</div>
                        <div className={selectedSize===3?'selectedSize':''} onClick={()=>setSelectedSize(3)}>XL</div>
                        <div className={selectedSize===4?'selectedSize':''} onClick={()=>setSelectedSize(4)}>XXL</div>
                    </div>
                </div>
                <button onClick={()=>addToCart(product.id)}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay
