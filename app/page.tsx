import connectDB from "../db";
import CreateNoteForm from "../app/component/CreateNote";
import Note from "@/model/note";

async function getNotes() {
  await connectDB();
  const notes = await Note.find(({})).sort({createdAt : -1}).lean();
   return notes.map((note) => ({
    ...note,
    _id : note._id.toString()
  }))
}



export default async function Home() {
  await connectDB();
  const initialData = await getNotes();
  return (
   <>
   <CreateNoteForm  initialData = {initialData}/>
   </>
  );
}
