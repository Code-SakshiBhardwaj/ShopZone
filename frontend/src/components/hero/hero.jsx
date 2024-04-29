import React, { useEffect, useState } from 'react'
import './hero.css'
import { ad_images } from '../assets/data';

const Hero = () => {
  const [index,setIndex]=useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % ad_images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="hero-container">
        <img className="image" src={ad_images[index].src} alt="" />
        <div className="dots-container">
        {ad_images.map((image, i) => (
          <span
            key={i}
            className={`dot ${index === i ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
</div>
  )
}

export default Hero
