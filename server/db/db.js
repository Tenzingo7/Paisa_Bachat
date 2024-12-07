import mongoose from "mongoose";

const connectToDatabase = async ()=> {
    try{
        await mongoose.connect(process.env.MongoDB_URL)
    }
    catch(error){
        console.log(error)
    }
}

export default connectToDatabase