import express from "express";
import { validate } from "../middleware/validator.middlware.js";
import { registerUser } from "../controller/auth.controller.js";
import { registerUserValidator } from "../validator/index.js";

const router = express.Router();

router.post("/register", registerUserValidator(), validate, registerUser);

export default router;
