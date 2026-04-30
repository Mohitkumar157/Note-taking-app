"use client"
import toast from "react-hot-toast";
import NoteCard from "../component/NoteCard";
import { useState } from "react";


import { SquarePen } from 'lucide-react';
import { NotebookText } from 'lucide-react';
import ZeroNote from "./ZeroNote"




export default function CreateNoteForm({ initialData }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [noteData, setNoteData] = useState(initialData || [])

    // noteData.forEach((data) =>{
    //     console.log(data);
    //     console.log(data._id);


    // })

    async function handlerSubmit(e) {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/note", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })


            })
            const result = await res.json();
            console.log(result);
            if (result.success) {
                setNoteData((pre) => [result.data, ...pre])
                toast.success("Note created successfully");
            }
            setTitle("")
            setContent("")
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");

        }
        console.log(title);
        console.log(content);


    }




    return (
        <>
            <div className="min-h-screen bg-blue-50 w-full flex flex-col mx-auto! p-4! gap-6 items-center justify-center">
                <div className="container">
                    <form
                        onSubmit={handlerSubmit}
                        className="w-full mx-auto! max-w-200 bg-white rounded-md p-4! shadow-lg space-y-5">
                        
                        <div className="wraper flex items-center gap-4">
                            <SquarePen className="logo text-white p-2! rounded-sm w-12 h-12 bg-[linear-gradient(135deg,#4f8cff,#6d5dfc)]" />
                            <div className="header">
                                <h2 className="title text-2xl flex items-center gap-4 font-semibold text-gray-800 text-center">Create Note </h2>
                                <span className="sub-title text-[#666666] text-[14px]">Capture your thoughts and ideas</span>
                            </div>
                        </div>
                        {/* Title */}
                        <div className="title mt-4!">
                            <label className="block text-sm font-medium text-gray-600 mb-1"> Title </label>
                            <input onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                                type="text"
                                placeholder="Enter title..."
                                className="w-full px-4! py-2! border border-[#ccc] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 " />
                        </div>
                        {/* Content */}
                        <div className="my-4!">
                            <label className="block text-sm font-medium text-gray-600 mb-1"> Content </label>
                            <textarea
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                required
                                rows="4" placeholder="Write your note..." className="w-full px-4! py-2! border border-[#ccc] rounded-sm  focus:outline-none focus:ring-1 focus:ring-blue-500" >

                            </textarea>
                        </div>
                        {/* Button */}
                        <button type="submit" className="w-fit bg-blue-600 text-white py-1.5! px-5! rounded-sm font-medium hover:bg-blue-700 transition duration-200" >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                    {/* maping over the data */}
                    <div className="userData max-w-200 mx-auto!">
                      <div className="total-notes flex gap-3 items-center">
                        <NotebookText className="text-blue-500 w-10 h-10 p-2! bg-blue-100 rounded-sm"/>   <p className="text-[20px] my-4! ">Your Notes <span className="text-blue-500">({noteData.length})</span></p>
                      </div>
                        {noteData.length === 0 ? (<ZeroNote />) : noteData.map((data) => <NoteCard key={data._id} setNoteData={setNoteData} note={data} />)}
                    </div>
                </div>
            </div>

        </>
    );
}


// https://github.com/Mohitkumar157/Note-taking-app.git