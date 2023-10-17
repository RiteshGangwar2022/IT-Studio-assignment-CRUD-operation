const mongoose=require("mongoose");
const DBurl=process.env.DBurl;

const connectdb=async () =>{

    try{
        const connect=await mongoose.connect(DBurl,{
            useNewURLParser: true,
        });
        console.log("server connected to database");
    }
    catch(err){
        console.log(err);
    }

}


module.exports=connectdb;