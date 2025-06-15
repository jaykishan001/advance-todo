
import mongoose from "mongoose";

const connectDb = async() => {
    const dbUrl = process.env.MONGODB_URL

    if(!dbUrl){
        console.log("Db url not found!");
        process.exit(1);
    }
    try {
    const connection =  await mongoose.connect(dbUrl);
    console.log(`Db connected successfully with ${connection.connection.host}`)
    } catch (error) {
        console.log("Something went wrong while connecting Db!");
        throw error;
    }
}

export default connectDb;