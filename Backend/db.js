const mongoose=require("mongoose");
require("dotenv").config();
const url=process.env.MONGO_URL;
const connect=
mongoose.connect(url)
.then(()=>console.log("database connected"))
.catch((error)=>{
  console.log("erro ",error)
});
module.exports=connect;