import React from 'react'
import Hero from '../components/hero/hero'
import Popular from '../components/popular/popular'
import Offers from '../components/offers/offers'
import NewCollections from '../components/newCollections/NewCollections'
import NewsLetter from '../components/newsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular/>
      <Offers />
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
