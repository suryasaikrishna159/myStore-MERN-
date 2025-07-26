import React, { useState,useEffect } from "react";
import axios from "axios";

function Cart(){

    const [cartprods,setcartprods]=useState([]);
    const [sum,setsum]=useState(0);
    

    const getallcartprods=async()=>{
        try{
            let res=await axios.get("https://mystore-mern-backend.onrender.com/api/v1/products/cart");
            setcartprods(res.data.cartprods);
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteprod=async (i)=>{
        await axios.delete(`https://mystore-mern-backend.onrender.com/api/v1/products/cart/${i}`);
        getallcartprods();
    }

    useEffect(()=>{
        getallcartprods();
    },[])

    useEffect(()=>{
        let total=0;
        cartprods.forEach(x=>{
            total=total+(x.price*x.quantity);
        });

        setsum(total);
    },[cartprods])



    return(
        <>
            <h2 className="subheading">My Cart</h2>

            {(cartprods.length===0)?(<p className="empty">your cart is empty</p>):
                <div className="outer">
                    <div className="cartprodcontainer">
                    
                        {

                            
                            cartprods.map(
                                p=>(
                                    <div className="productcard" id={p._id}>
                                        <div className="image">
                                            <img src={p.url} alt="product image"/>
                                        </div>
                                        <p className="brand"><b>{p.company}</b></p>
                                        
                                        <h3 className="name">
                                            {p.name}
                                        </h3>
                                        <h4>₹ {p.price}</h4>
                                        <div className="rating"> {(p.rating<3)?<p style={{color:"red"}} ><b>{p.rating}</b></p>:<p style={{color:"green"}} ><b>{p.rating}</b></p>}</div>

                                        <div className="deliveryinputs">
                                            Quantity: {p.quantity}
                                            <button className="delfrmcartbtn" onClick={()=>{deleteprod(p._id)}}>delete from cart</button>
                                        </div>
                                    
                                    </div>
                                )
                            )
                        }
                    </div>

                    <div className="ordersummary">
                        <h2 className="subheadingtwo">Your Order Summary</h2>
                        <p className="stat">Total Price: <span>₹ {sum}</span></p>

                        <button className="placeo">Place Order</button>
                    </div>
                </div>

            }
            
        </>
    )
}
export default Cart;
