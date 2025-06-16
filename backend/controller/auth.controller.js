import {ApiError} from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiResponse } from "../utils/api-reponse.js";
import { User } from "../models/user.model.js";
import { generateMailFormate, sendMail } from "../utils/sendmail.js";

export const registerUser = asyncHandler(async(req, res)=> {

    const {username, fullname, email, password} = req.body;
    console.log("username", username, email, password);


    if(!username || !fullname || !email || !password){
        return res.status(401).json(new ApiError(401, "All fields are required"))
    }

   const existingUser = await User.findOne({email});

   if(existingUser) {
    return res.status(401).json( new ApiResponse(401, null, "User Already exist!") )
   }

   const emailContent = generateMailFormate({email, intro:"Welcome to Advance Todo!", instrution:"To get Started, please Click the button below to confim your account",redirectLink: "http://localhost:8000/api/v1/verifyemail/:verificationToken", buttontxt: "verify Your account"})
   sendMail({to: email, subject: "Verification email of account", body: emailContent});
   const user = await User.create({email, username, fullname, password});

   return res.status(200).json(new ApiResponse(200, user, "User createdSuccessfully"));

})