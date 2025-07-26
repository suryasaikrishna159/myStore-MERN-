const mongoose=require("mongoose");

const cartitems=new mongoose.Schema(
    {
        url:String,
        name:String,
        price:Number,
        rating:Number,
        company:String,
        category:String,
        quantity:Number
    }
)

module.exports=mongoose.model("cartitms",cartitems);