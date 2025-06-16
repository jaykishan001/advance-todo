import app from "./app.js";
import connectDb from "./db/dbConnection.js";
import dotenv from  'dotenv'

dotenv.config();
const port =  4000;

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
