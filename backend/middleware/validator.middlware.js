import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (req, res, next)=> {
    console.log("here the request stuck", req)
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next();
    }

    const collectedError = [];

    errors.array().map((err)=> 
    collectedError.push({
        [err.path]: err.msg,
    }),
    )
    throw new ApiError(400, "fields data is not valid", collectedError)
}