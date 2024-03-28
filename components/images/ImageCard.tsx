import Image from 'next/image'
import React from 'react'

interface Props {
    src: any;
}

const ImageCard = ({ src }: Props) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <Image className="rounded-t-lg" src={`${process.env.NEXT_PUBLIC_FILES_BASE_API_URL}${src}`} alt="" width={500} height={500} />
            </a>
        </div>
    )
}

export default ImageCard
