"use client"; 
import React, { useState } from 'react'

type Props = {}

const UploadImage = (props: Props) => {
    const [image, setImage] = useState("");
    return (
        <div className='w-40 h-40 rounded border text-2xl cursor-pointer'>
            <div className='h-full flex justify-center'>
                <div className='h-full flex justify-center flex-col relative'>
                    +
                    <input
                        className="w-full h-full bg-red-400"
                        type="file"
                        style={{ position: "absolute", opacity: 0, top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%" }}
                        // onChange={onFileSelect}
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadImage