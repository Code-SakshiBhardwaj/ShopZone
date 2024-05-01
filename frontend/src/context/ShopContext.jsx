import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index]=0;
    }
    return cart;
}

const getDefaultOrders = () =>{
    let orders = {}
    for (let index = 0; index < 300+1; index++) {
        orders[index]=0;
    }
    return orders;
}

const ShopContextProvider = (props) =>{

    const [all_product,setAll_product] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [orderItems,setOrderItems] = useState(getDefaultOrders());

    useEffect(() => {
        fetch("http://localhost:4000/allproducts").then((res) => res.json()).then((data) => setAll_product(data));
        if(localStorage.getItem('auth-token')){
            getCart();
            getOrders();
        }
    },[])

    const getCart = async() =>{
        await  fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",
        }).then(res => res.json()).then(data => setCartItems(data));
    }

    const getOrders = async() =>{
        await fetch('http://localhost:4000/getorders',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",
        }).then(res => res.json()).then(data => setOrderItems(data));
    }

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/addtocart",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then(res => res.json()).then(data => console.log(data))
        }
    }

    const placeOrder = () =>{
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/placeorder",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({}),
            }).then(res => res.json()).then(data => console.log(data));
        }
    }

    const cancelOrder = (itemId) =>{
        setOrderItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/cancelorder",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then(res => res.json()).then(data => console.log(data));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/removefromcart",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then(res => res.json()).then(data => console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((e)=>e.id===Number(item));
                totalAmount+= itemInfo?.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems+= cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue={all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount,
         getTotalCartItems, placeOrder, cancelOrder, orderItems, getOrders, getCart}

    return <ShopContext.Provider value={contextValue}>
       {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;