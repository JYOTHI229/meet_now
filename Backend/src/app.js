// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// }



import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

//import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

import cors from "cors";

import {User} from "./models/usermodel.js";
import {Meeting} from "./models/meetingmodel.js";

import userroutes from "./routes/userroutes.js";

import { connectDB } from "./config/db.js";
import { connectToSocket } from "./controllers/socketManager.js";



const app = express();
const server = createServer(app);
connectToSocket(server);




const port = process.env.PORT || 3000;




connectDB();


app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userroutes);

app.get("/home",(req,res)=>{
    res.send(`home page`);
});




server.listen(port,()=>{
    console.log(`app listening at port  ${port}`)
});



