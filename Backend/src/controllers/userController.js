import { User } from "../models/usermodel.js";
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";


const login = async(req,res)=>{
    const {username , password} =req.body;

    if(!username || !password){
        return res.status(400).json({message:"Please Provide"});
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOTFOUND).json({message:"User Not Found"});
        }
        if(bcrypt.compare(password,user.password)){
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token ;
            await user.save();
            return res.status(httpStatus.OK).json({token : token });
        }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",err})
    }

}

const register = async (req,res)=>{
    const {name,username,password} = req.body;

    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
           res.status(httpStatus.FOUND).json({message:"User already exist"});
        }
        else{
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword

        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message:"User Registered"});
        }
    } 
    catch(err){
        res.json({message:"Something went wrong",err});
    }


}


export {login ,register} ;