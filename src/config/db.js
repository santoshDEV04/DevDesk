import dns from "dns"
dns.setServers(['8.8.8.8', '8.8.4.4'])

import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected !! DB HOST: ${connection.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection failed: ",error.message);
        process.exit(1)
    }
};

export default connectDB;