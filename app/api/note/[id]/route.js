import Note from "../../../../model/note";
import connectDB from "../../../../db";
import { NextResponse } from "next/server";
import note from "../../../../model/note";
import { error } from "console";


export async function DELETE(_, { params }) {
    const { id } = await params;
    await connectDB();
    try {
        const notes = await Note.findByIdAndDelete(id)
        if (!notes) {
            return NextResponse.json({ success: false, message: "Note not found" }, { status: 404 })
        }
        return NextResponse.json({ success: true, message: "Note deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
};



export async function PATCH(request, { params }) {
    await connectDB();
    const { id } = await params;
    try {
        const body = await request.json();
        const notes = await Note.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        )
        if(!notes){
            return NextResponse.json({success : false , error : "Note not found"}, {status : 404})
        }
        return NextResponse.json({success : true , message : "Note updated successfully" , data : notes}, {status : 200})
    } catch (error) {
        console.log(error);
       return NextResponse.json({success : false,  error : error.message}, {status : 400})
    }
}