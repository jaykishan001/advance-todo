import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-reponse.js";
import { asyncHandler } from "../utils/async-handler.js";
const healthCheck = asyncHandler((req, res) => {
  res.status(201).json(
    new ApiResponse(200, {
      message: "Server is running",
    })
  );
});

export const registerUser = asyncHandler(async(req, res)=> {

    console.log("username", username, email, password);
    const {username, fullname, email, password} = req.body;


    if(!username || !fullname || !email || !password){
        return res.status(401).json(new ApiError(401, "All fields are required"))
    }

   const existingUser = await User.findOne(email);

   if(!existingUser) {
    return res.status(401).json( new ApiResponse(401, null, "User Already exist!") )
   }

   const emailContent = generateMailFormate({email, intro:"Welcome to Advance Todo!", instrution:"To get Started, please Click the button below to confim your account",redirectLink: "http://localhost:8000/api/v1/verifyemail/:verificationToken", buttontxt: "verify Your account"})
   sendMail({to: email, subject: "Verification email of account", body: emailContent});
   const user = await User.create({email, username, fullname, password});

   return res.status(200).json(new ApiResponse(200, user, "User createdSuccessfully"));

})

export { healthCheck };
