
import mongoose from "mongoose";
import configKeys from "../../config";


const connectDB:Function=async ()=>{
    const MONGO_URL:string=configKeys.MONGO_DB_URL
    try{
        await mongoose.connect(MONGO_URL)
        console.log('Database Connected Successfully');  
    }catch(err){
        console.log(err,"error occuredddd");
        
    }
}

export default connectDB