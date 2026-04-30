import { NextResponse } from "next/server";
import connectDB from "../../../db";
import Note from "../../../model/note";


export async function POST(request){
    await connectDB();
    try {
        const body = await request.json();
        const note  = await Note.create(body);
        return NextResponse.json({success : true, data : note}, {status:201})
    } catch (error) {
        return NextResponse.json({success : false , error : error.message}, {status:400})
    }
};


export async function GET() {
    await connectDB();
    try {
        const notes = await Note.find({}).sort({createdAt : -1})
        return NextResponse.json({success:true , data : notes.toObject()}, {status : 200})
    } catch (error) {
        return NextResponse.json({success : false , message:error.message} , {status : 400})
    }
}
export async function DELETE(request) {
    
}