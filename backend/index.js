import mongoose from "mongoose";
import app from "./app.js";
import connectDb from "./db/dbConnection.js";
import dotenv from  'dotenv'

dotenv.config();
const port = process.env.PORT || 4000;

connectDb()
.then(()=> {
    app.listen(port, ()=> {
        console.log(`Server is listening at port: ${port}!`)
    } );
})
.catch((error)=> {
    console.error(`server not listening: ${error}`)
    process.exit(1);
})


process.on('SIGINT', async ()=> {
    console.log("Server is shuting down!");
    try {
        await mongoose.disconnect();
        console.log("MongoDb disconnected!");
    } catch (error) {
        console.error(`somthing went wrong ${error}`)
    }

})