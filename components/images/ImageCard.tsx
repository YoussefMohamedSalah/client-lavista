import React from 'react';
import Image from 'next/image';

interface Props {
    image: { id: string, url: string };
    onDelete?: (id: string) => void; // onDelete prop to handle delete action
}

const ImageCard = ({ image, onDelete }: Props) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                <a href="#">
                    <Image className="rounded-t-lg" src={`${process.env.NEXT_PUBLIC_FILES_BASE_API_URL}${image.url}`} alt="" width={500} height={500} />
                </a>
                {onDelete && ( // Render delete button only if onDelete is provided
                    <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2" onClick={() => onDelete(image.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default ImageCard;
