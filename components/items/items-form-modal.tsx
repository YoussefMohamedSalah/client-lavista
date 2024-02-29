"use client"
import React, { useEffect, useState } from 'react'
import MotorItemForm from './forms/motor-item-form';
import FilterItemForm from './forms/filter-item-form';
import ElcItemForm from './forms/elc-item-form';
import PoolItemForm from './forms/pool-item-form';
import { Button } from '../ui/button';

interface Props {
    itemTypes: any[];
    defaultItemType: any;
    selectedSectionId: string;
    closeModal: () => void;
}

const ItemsFormModal = ({ itemTypes, defaultItemType, selectedSectionId, closeModal }: Props) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [selectedItemType, setSelectedItemType] = useState<any>({});

    useEffect(() => {
        setSelectedItemType(defaultItemType)
    }, [defaultItemType])

    const handleModelClose = () => {
        closeModal();
        setIsModal(false);
    }

    return (
        <>
            <div className="flex w-full align-center justify-center">
                <Button onClick={() => setIsModal(true)}>+ Add Item</Button>
            </div>
            <dialog id="my_modal_1" className="modal" open={isModal} onClose={() => setIsModal(false)}>
                <div className="modal-box flex flex-col justify-between lg:min-w-[800px] min-h-[60vh]">
                    <div className="flex align-center justify-center w-full gap-2 w-[100%] pb-4">
                        {itemTypes.map((type) => {
                            return (
                                <div key={type.id}>
                                    <Button onClick={() => setSelectedItemType(type)}> {type.name}</Button>
                                </div>
                            )
                        })}
                    </div>
                    {selectedItemType ? (<>
                        {selectedItemType?.name! === "Motor" && <MotorItemForm closeModal={handleModelClose} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                        {selectedItemType?.name! === "Filter" && <FilterItemForm closeModal={handleModelClose} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                        {selectedItemType?.name! === "Elec Panel" && <ElcItemForm closeModal={handleModelClose} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                        {selectedItemType?.name! === "Pool" && <PoolItemForm closeModal={handleModelClose} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                    </>) : <p className="self-center text-2xl">Please Select Item Type!</p>}

                    <div className="modal-action">
                        <button className="btn bg-destructive text-white" onClick={handleModelClose}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ItemsFormModal
