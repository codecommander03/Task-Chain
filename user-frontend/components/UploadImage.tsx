"use client"; 
import React, { useState } from 'react'

type Props = {}

const UploadImage = (props: Props) => {
    const [image, setImage] = useState("");
    return (
        <div className='w-40 h-40 rounded border text-2xl cursor'>
            <div className='h-full flex justify-center'>
                <div className='h-full flex justify-center flex-col'>
                    +
                </div>
            </div>
        </div>
    )
}

export default UploadImage