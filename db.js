import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL

let isConnected = false;
export default async function connectDB() {
    if (isConnected) {
        console.log("already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connection.readyState === 1;
        console.log("connect to mongodb :", db);

    } catch (error) {
        console.log("falied to connect mongodb", error);
        throw error;
    }
}