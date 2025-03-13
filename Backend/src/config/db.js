import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl=process.env.MONGO_URL;

export const connectDB = async ()=>{
  try{
    let connected = await mongoose.connect(dbUrl);
    console.log(`MONGO Connected to DB Host:${connected.connection.host}`);
  }catch(err){
    console.log(err);
  }

};