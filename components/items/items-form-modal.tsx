"use client"
import React, { useState } from 'react'
import MotorItemForm from './forms/motor-item-form';
import FilterItemForm from './forms/filter-item-form';
import ElcItemForm from './forms/elc-item-form';
import PoolItemForm from './forms/pool-item-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button';

interface Props {
    itemTypes: any[];
}

const ItemsFormModal = ({ itemTypes }: Props) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [selectedItemType, setSelectedItemType] = useState<any>("");

    return (
        <>
            <button className="btn" onClick={() => setIsModal(true)}>open modal</button>
            <dialog id="my_modal_1" className="modal" open={isModal} onClose={() => setIsModal(false)}>
                <div className="modal-box">

                    {/*  */}
                    <div className="flex align-center justify-center w-full gap-2 w-[100%] pb-4">
                        {itemTypes.map((type) => {
                            return (
                                <div key={type.id}>
                                    <Button onClick={() => setSelectedItemType(type.name)}> {type.name}</Button>
                                </div>
                            )
                        })}
                    </div>
                    {/*  */}
                    {selectedItemType === "Motor" && <MotorItemForm />}
                    {selectedItemType === "Filter" && <FilterItemForm />}
                    {selectedItemType === "Elec Panel" && <ElcItemForm />}
                    {selectedItemType === "Pool" && <PoolItemForm />}
                    {/* <form method="dialog" className="mb-6">
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                            <input type="text" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Send message</button>
                    </form> */}
                    <div className="modal-action">
                        <button className="btn" onClick={() => setIsModal(false)}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ItemsFormModal
