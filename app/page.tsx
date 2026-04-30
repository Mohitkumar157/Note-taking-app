import connectDB from "../db";
import CreateNoteForm from "../app/component/CreateNote";
import Note from "@/model/note";
export const dynamic = "force-dynamic";
async function getNotes() {
  await connectDB();
  const notes = await Note.find(({})).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt?.toISOString(),
    updatedAt: note.updatedAt?.toISOString(),
  }))
}



export default async function Home() {
  const initialData = await getNotes();
  return (
    <>
      <CreateNoteForm initialData={initialData} />
    </>
  );
}
