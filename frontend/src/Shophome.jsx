import React,{useEffect,useState} from "react";
import axios from 'axios';


function Shophome(){
    const [category,setcategory]=useState("");
    const [company,setcompany]=useState("all");
    const [pricefilt,setpricefilt]=useState(5000);
    const [search,setsearch]=useState("");
    const [sort,setsort]=useState("");

    const [quantity,setquantity]=useState(1);
    

    const [allproducts,setallproducts]=useState([]);

    const addtocart=async (u,n,p,r,co,ca,q)=>{
        await axios.post("http://localhost:5000/api/v1/products/cart",{url:u,name:n,price:p, rating:r, company:co, category:ca, quantity:q})
    }
    
    

    const gettingprods = async () => {
        try {
            let url = "http://localhost:5000/api/v1/products?";
            let query = [];

            if (category && category !== "all") {
                query.push(`category=${category}`);
            }

            if (company && company !== "all") {
                query.push(`company=${company}`);
            }
            if(pricefilt){
                query.push(`price=${pricefilt}`);
            }
            if(sort){
                query.push(`sort=${sort}`);
            }

            url = url + query.join("&");

            let res = await axios.get(url);
            let filteredProducts = res.data.products;

            if (search.trim() !== "") {
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            setallproducts(filteredProducts);

        }
        catch (err) {
            console.log(err);
        }

    };

    const clearfilt=()=>{
        setcategory("");
        setcompany("all");
        setpricefilt(5000);
        setsearch("");
    }

    useEffect(()=>{
        gettingprods();
    },[category, company, pricefilt, search,sort]);


    return(
    <>
        
            {(category || company !== "all" || pricefilt !== 5000 || search) ? (<p className="foundp">{allproducts.length} items found</p>) : null}

             <div className="sortbox">
                <select className="selectsort" onChange={(e)=>{setsort(e.target.value)}}>
                    <option>Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
             </div>
                
             
        

        <div className="maincontent">
            <div className="leftnavbar">
                <input type="text" placeholder="Search By Name" className="search" onChange={(e)=>{setsearch(e.target.value)}}/>
                

                <div className="categorybox">
                    <h3>Category</h3>
                    <button onClick={()=>{setcategory("all")}}>All</button>
                    <button onClick={()=>{setcategory("Office")}}>Office</button>
                    <button onClick={()=>{setcategory("Living Room")}}>Living Room</button>
                    <button onClick={()=>{setcategory("Kitchen")} }>Kitchen</button>
                    <button onClick={()=>{setcategory("BedRoom")}}>BedRoom</button>
                    <button onClick={()=>{setcategory("dining")}}>dining</button>
                </div>

                
                
                <div className="companyselect">
                    <h3>Company</h3>
                    <select className="selectleft" onChange={(e)=>{setcompany(e.target.value)}}>
                        
                        <option value="all">All</option>
                        <option value="IKEA">IKEA</option>
                        <option value="Godrej">Godrej</option>
                        <option value="Durian">Durian</option>
                        <option value="Pepperfry">Pepperfry</option>
                        <option value="Urban Ladder">Urban Ladder</option>
                    </select>
                </div>

                <div className="pricefilter">
                    <h3>Price Filter</h3>
                    <input type="range" min={1} max={7000} onChange={(e)=>{setpricefilt(e.target.value)}}/>
                    <p className="pricecss">₹ {pricefilt}</p>
                </div>

                <button className="clear" onClick={clearfilt}>Clear</button>

            </div>

            <div className="productscontainer">

                {
                    allproducts.map(p=>(
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
                                Quantity: <input onChange={(e)=>{setquantity(e.target.value)}} type="Number" className="quantity"/>
                                <button className="addtocartbtn" onClick={()=>{addtocart(p.url,p.name,p.price,p.rating,p.company,p.category,quantity)}}>Add to cart</button>
                            </div>
                            
                        </div>
                    ))
                }

            </div>
        </div>
    </>)
}
export default Shophome;