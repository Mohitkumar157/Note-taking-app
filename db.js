import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false;
export default async function connectDB() {
    if (!MONGODB_URI) {
        console.log("❌ ENV:", MONGODB_URI);
        throw new Error("MONGODB_URI missing");
    }
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