"use client"
import toast from "react-hot-toast";
import { useState } from "react";
import EditNote from "./EditNote";

import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Trash2 } from 'lucide-react';


function NoteCard({ note, setNoteData }) {
    const [updatedId, setUpdatedId] = useState(null);
    console.log(note);

    async function deleteNote(noteId) {
        try {
            const response = await fetch(`/api/note/${noteId}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error("Failed to delete note");
            }

            const result = await response.json();
            if (result.success) {
                setNoteData((pre) => pre.filter((note) => note._id !== noteId))
                toast.success("Note deleted successfully");
            }
        } catch (error) {
            console.log("Error in deleting note", error);
            toast.error("Something went wrong");
        }
    }



    return (
        <>
            {updatedId === note._id ? <EditNote note={note} setNoteData={setNoteData} noteId={note._id} setUpdatedId={setUpdatedId} /> : <div className="w-full  p-4! bg-white/70 backdrop-blur-lg border border-gray-200 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

                {/* Title */}
                <div className="flex items-center gap-4">
                     <NotebookPen  className="w-9 h-9 rounded-full p-2! text-white bg-[linear-gradient(45deg,#3093cd,#155dfc)]"/>
                    <div className="note-text">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                            {note.title}
                        </h2>
                        {/* Content */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {note.content}
                        </p>
                    </div>


                </div>


                <div className="flex items-center justify-between border-t pt-2! mt-4! border-[#ccc]">


                    <span className="text-xs text-gray-400 my-3! flex flex-col gap-2 md:flex-row items-center">
                        <Calendar className="text-black w-5 h-full" />  Created At : {new Date(note.createdAt).toLocaleDateString('en-GB')}
                    </span>

                    <span className="text-xs text-gray-400 my-3! flex flex-col items-start gap-2 md:flex-row">
                        <Clock className="text-black w-5 h-full" /> Updated At : {new Date(note.updatedAt).toLocaleTimeString('en-GB')}
                    </span>


                    <div className="flex flex-col md:flex-row gap-2">

                        {/* Edit Button */}
                        <button
                            onClick={() => setUpdatedId(note._id)}
                            className="px-3! py-1! flex items-center gap-2.5 text-sm font-medium rounded-sm bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                          <Pen  className="w-3 h-3"/> 
                           Edit
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => deleteNote(note._id)}
                            className="px-3! py-1! flex items-center gap-2.5  text-sm font-medium rounded-sm bg-red-50 text-red-600 hover:bg-red-100 transition">
                            <Trash2  className="w-3 h-3"/>
                            Delete
                        </button>

                    </div>
                </div>
            </div>
            }
        </>
    )
}




export default NoteCard;