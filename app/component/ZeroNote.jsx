"use client"
import Image from "next/image"
function ZeroNote() {
    return (
        <div className="no-note w-full p-4! rounded-md bg-transparent flex flex-col justify-center items-center border border-dashed border-blue-200 ">
            <div className="image-wraper relative w-20 h-20 ">
                <Image
                    src="/images/note.png"
                    alt="empty-note"
                    fill
                    sizes="100px"
                    className="object-cover"
                />
            </div>
            <p className="font-semibold mb-1! ">No note yet</p>
            <p className="text-[#aeaeae] font-light">Create your first note and it will appear here</p>
        </div>
    )
}

export default ZeroNote