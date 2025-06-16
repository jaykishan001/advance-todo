
import mongoose from "mongoose";

const connectDb = async() => {
    const dbUrl = process.env.MONGODB_URL
    console.log("MongoDB URL:", dbUrl);

    if(!dbUrl){
        console.log("Db url not found!");
        process.exit(1);
    }
    
    try {
        const connection = await mongoose.connect(dbUrl);
        console.log(`Db connected successfully with ${connection.connection.host}`)
        
        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
    } catch (error) {
        console.log("Something went wrong while connecting Db!");
        throw error;
    }
}

export default connectDb;