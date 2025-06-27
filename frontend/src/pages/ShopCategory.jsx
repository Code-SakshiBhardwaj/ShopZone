import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/items/item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  const [selectedVal, setSelectedVal] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const handleSelect = (event) => {
    const val = event.target.value;
    setSelectedVal(val);
    if(val==='old_price'){
      setSelectedOrder("desc");
    }
    else{
      setSelectedOrder("asc");
    }
  }

  const sortBy = (array,key,order='asc') => {
    const direction = order === 'desc'? -1 : 1;
    return [...array].sort((a,b) => (a[key] - b[key])*direction);
  }
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt={props.category}/>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <select name="sort" value={selectedVal} className="shopcategory-sort" onChange={handleSelect}>
        <option disabled value="" style={{display:'None'}}>Sort By</option>
          <option value="rel">Relevance</option>
          <option value="pop">Popularity</option>
          <option value="new_price">Price -- Low to High</option>
          <option value="old_price">Price -- High to Low</option>
          <option value="latest">Newest First</option>
        </select>
      </div>
      {selectedVal?
      <div className="shopcategory-products">
      {sortBy(all_product.filter(item => item.category===props.category),selectedVal,selectedOrder).map((item,i) => {
        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
      })}
      </div>:
       <div className="shopcategory-products">
        {all_product.map((item,i)=>{
        if(props.category===item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
        else{
          return null;
        }
      })}
    </div>
    }
      
      <div className="shopcategory-loadmore">
        Explore more
      </div>
    </div>
  )
}

export default ShopCategory
