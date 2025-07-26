const mongoose=require("mongoose");

const prodschema=new mongoose.Schema(
    {
        url:{
            type:String,
            required:[true,"must provide url of image"]
        },
        name:{
            type:String,
            required:[true,"must provide name"],
        },
        price:{
            type:Number,
            required:[true,"must provide price"],
        },
        featured:{
            type:Boolean,
            default:false,
        },
        rating:{
            type:Number,
            default:4.5,
        },
        createdAt:{
            type:Date,
            default:Date.now().toLocaleString(),
        },
        company:{
            type:String,
            required:[true,"must provide company"],
        },
        category:{
            type:String,
            required:[true,"must provide category"],
        }

    }
)

module.exports=mongoose.model("products",prodschema);