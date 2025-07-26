const express=require("express");
const cors = require('cors');

const app=express();



app.use(express.json());
app.use(cors());

const connectdb=require("./config/db");
connectdb();

const products=require("./models/products");
const cart=require("./models/cart");

//-------------------------------------------------controllers---------------------------------------

//api to get all products based on filter
app.get("/api/v1/products",async (req,res)=>{


    const {featured,name,rating,category,company,price,sort,fields}=req.query;
    const queryobj={};

    if(featured){
        queryobj.featured= featured==="true"?true:false;
    }
    if(name){
        queryobj.name=name;
    }
    if(rating){
        queryobj.rating=rating;
    }
    if(category){
        queryobj.category=category;
    }
    if(price){
        queryobj.price = { $lte: Number(price) };
    }
    if(company){
        queryobj.company=company;
    }

    let result= products.find(queryobj);

    
    if(sort){
        const sortlist=sort.split(",").join(" ");
        result=result.sort(sortlist);
    }
    if(fields){
        const fieldslist=fields.split(",").join(" ");
        result=result.select(fieldslist);
    }

    const data=await result;

    res.json({products:data,nbHits: data.length});


})

//api to add to cart
app.post("/api/v1/products/cart",async (req,res)=>{
    try{
        const evt=await cart.create(req.body);
        res.json({evt});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to get products in cart

app.get("/api/v1/products/cart",async (req,res)=>{
    
    try{
        const prods= await cart.find({})
        res.json({cartprods:prods});
    }
    catch(err){
        res.json({msg:err});
    }
    
})

//api to delete from cart
app.delete("/api/v1/products/cart/:_id",async (req,res)=>{
    const {_id}=req.params;
    const reqprod=await cart.deleteOne({_id:_id});
    res.json({deletedprod:reqprod});
})


//------------------------------------------------------------listener----------------------------------
app.listen(5000,()=>{
    console.log("server is live on port 5000");
})