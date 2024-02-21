"use client"
import React, { useState } from 'react'
import MotorItemForm from './forms/motor-item-form';
import FilterItemForm from './forms/filter-item-form';
import ElcItemForm from './forms/elc-item-form';
import PoolItemForm from './forms/pool-item-form';
import { Button } from '../ui/button';

interface Props {
    itemTypes: any[];
}

const ItemsFormModal = ({ itemTypes }: Props) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [selectedItemType, setSelectedItemType] = useState<any>("");

    return (
        <>
            <button style={{ textAlign: "center", width: "100%" }} onClick={() => setIsModal(true)}>+ Add Item</button>
            <dialog id="my_modal_1" className="modal" open={isModal} onClose={() => setIsModal(false)}>
                <div className="modal-box lg:min-w-[800px] min-h-[60vh]">
                    <div className="flex align-center justify-center w-full gap-2 w-[100%] pb-4">
                        {itemTypes.map((type) => {
                            return (
                                <div key={type.id}>
                                    <Button onClick={() => setSelectedItemType(type.name)}> {type.name}</Button>
                                </div>
                            )
                        })}
                    </div>
                    {selectedItemType === "Motor" && <MotorItemForm />}
                    {selectedItemType === "Filter" && <FilterItemForm />}
                    {selectedItemType === "Elec Panel" && <ElcItemForm />}
                    {selectedItemType === "Pool" && <PoolItemForm />}
                    <div className="modal-action">
                        <button className="btn" onClick={() => setIsModal(false)}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ItemsFormModal
