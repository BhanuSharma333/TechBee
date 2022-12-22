import express from "express";
import cors from "cors";
import {readdirSync} from "fs";
import mongoose from "mongoose";
const morgan =require("morgan");
require("dotenv").config();




//create an express app
const app =express();

//database
mongoose.connect(process.env.DATABASE
).then(()=>console.log("Database Connected"))
  .catch((err)=> console.log("DataBase Connection Error is",err));

  
//apply middlewares
app.use(cors());
app.use(express.json());//data f- b so able to pass that json data
app.use(morgan('dev'));
app.use((req,res,next)=>
{console.log("Middlewares checking in our app")
next();
});


//Route

//read the direstory of routeds synchronously and we provide in funtion ./foldername(routes)/filename(auth.js and so on) so we dont have to manually import each file for using we use them with the use of middlweware like /api/register
readdirSync("./routes").map((r)=>
app.use("/api",require(`./routes/${r}`))
);

app.get("/",(req,res) => {

    res.send("Server endpoint hitted")

});


// Port
const port = process.env.PORT || 8000;
app.listen(port,()=>{

  console.log(`Server is running on the  port number ${port}`);
});