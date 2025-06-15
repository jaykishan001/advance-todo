import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
}))


//import Routess

import healthCheckRouter from './routes/healthcheck.routes.js'
import userRouter from "./routes/user.routes.js"

app.use('/api/v1', healthCheckRouter);
app.use('/api/v1/users', userRouter );




export default app;