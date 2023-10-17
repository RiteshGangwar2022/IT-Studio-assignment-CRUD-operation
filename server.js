const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const router=require("./routes")

dotenv.config();
app.use(express.json()); 
//to connect backend to database
const connectdb=require("./Database/DBconnection");
connectdb();

app.use(cors());
app.use(bodyParser.json());

app.use(router);

const port=process.env.PORT;

const server=app.listen(port,(()=>{
    console.log(`server is running on port ${port}`);
}));


