import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import './order-items.css'

const OrderItems = () => {
   const {all_product,cancelOrder, orderItems, getOrders} = useContext(ShopContext);

   useEffect(() => {
    getOrders();
    },[orderItems,getOrders]);
   return (
      <div className='orderitems'>
      <div className="orderitems-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
      </div>
      <hr/>
      {all_product.map((item)=>{
          if(orderItems[item.id]>0){
              return <div key={item.id}>
              <div className="orderitems-format orderitems-format-main">
                  <img src={item.image} alt="" className='ordericon-product-icon'/>
                  <p>{item.name}</p>
                  <p>${item.new_price}</p>
                  <button className='orderitems-quantity'>{orderItems[item.id]}</button>
                  <p>${item.new_price*orderItems[item.id]}</p>
                  {/* <img className='orderitems-remove-icon' src={remove_icon} onClick={()=>cancelOrder(item.id)} alt="" /> */}
              </div>
              <hr/>
          </div>
          }
          return null;
      })}
      
  </div>
)
}


export default OrderItems;