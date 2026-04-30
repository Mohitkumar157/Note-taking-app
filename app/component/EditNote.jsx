"use client"
import { useState } from "react";
import toast from "react-hot-toast";
function EditNote({ noteId, setNoteData, setUpdatedId }) {
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [loading , setLoading] = useState(false);

    async function updateNote() {
        if (!updatedTitle.trim() || !updatedContent.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/note/${noteId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title : updatedTitle, content : updatedContent })
            })
            const result = await response.json();
            console.log(result);
            
            if (result.success) {
                setNoteData((pre) => {
                    return pre.map((note) => note._id === noteId ? result.data : note)
                })
                toast.success("Note updated successfully");
            }
            setLoading(false);
            setUpdatedId(null);
            setUpdatedTitle("");
            setUpdatedContent("");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    function cancelEditing() {
        setUpdatedId(null);
        setUpdatedTitle("");
        setUpdatedContent("");
    }
    return (
        <div className="updatedNote w-full my-4! p-4! bg-white/70 backdrop-blur-lg border border-gray-200 rounded-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="title">
                <label className="block text-sm font-medium text-gray-600 mb-1"> Title </label>
                <input
                    type="text"
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="w-full px-4! py-2! border border-[#ccc] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 " />
            </div>
            <div className="content my-4!">
                <label className="block text-sm font-medium text-gray-600 mb-1"> Content </label>

                <textarea
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    rows="3" placeholder="Write your note..." className="w-full px-4! py-2! border border-[#ccc] rounded-sm  focus:outline-none focus:ring-1 focus:ring-blue-500" >

                </textarea>
            </div>
            <div className="wraper flex justify-start items-center gap-2">
                {/* Update Button */}
                <button
                    onClick={updateNote}
                    className="px-3! py-1! text-sm font-medium rounded-sm bg-[#47d547] text-white hover:bg-green-500 transition">
                  {loading ? "Loading..." : "Update"}
                </button>

                {/* Cancel Button */}
                <button
                    onClick={cancelEditing}
                    className="px-3! py-1! text-sm font-medium rounded-sm bg-[#ff6969] text-white hover:bg-red-500 transition">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditNote