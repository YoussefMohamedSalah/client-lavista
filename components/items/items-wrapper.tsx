"use client"

import React, { useEffect, useState } from 'react'
import { ItemsFilters } from './items-filters';
import CreateSectionForm from '../sections/create-section-form';
import ItemsTable from './tables/items-table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BASE_API_URL } from '@/constants/constants';
import { SECTIONS_ENDPOINT } from '@/constants/routes';

interface Props {
    villageName: string;
    villageId: string;
    items: any[];
    sections: any[];
    token: string;
    itemTypes: any[];
}

const ItemsWrapper = ({ villageName, villageId, items, sections, token, itemTypes }: Props) => {
    const [itemsToShow, setItemsToShow] = useState<any[]>([...items]);
    const [selectedSection, setSelectedSection] = useState<string>("0");
    const [selectedItemTypeId, setSelectedItemTypeId] = useState<string>("");
    const [selectedItemType, setSelectedItemType] = useState<string>("");

    console.log({ selectedSection })

    useEffect(() => {
        if (selectedItemTypeId) {
            let selectedItemType = itemTypes.find((itemType) => itemType.id === selectedItemTypeId)
            if (selectedItemType) setSelectedItemType(selectedItemType)
            handleGetItemsByItemType();
        }
    }, [selectedItemTypeId, selectedSection]);

    const handleGetItemsByItemType = async () => {
        const itemsResponse = await fetch(`${BASE_API_URL}${SECTIONS_ENDPOINT}items/${selectedSection}/type/${selectedItemTypeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const filteredItems: any = await itemsResponse.json();
        setItemsToShow([...filteredItems])
    }

    return (
        <>
            <ItemsFilters heading={`${villageName} Details`} text={`Add Sections To ${villageName}`}>
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap text-sm font-medium">Section</p>
                    <Select
                        value={`${selectedSection || "All"}`}
                        onValueChange={(value) => {
                            setSelectedSection(value)
                        }}
                    >
                        <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue placeholder={`${selectedSection}`} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                            {sections.map((section) => (
                                <SelectItem key={section.id} value={`${section.id}`}>
                                    {section.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap text-sm font-medium">Item Type</p>
                    <Select
                        value={`${selectedItemTypeId || "All"}`}
                        onValueChange={(value) => {
                            setSelectedItemTypeId(value)
                        }}
                    >
                        <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue placeholder={`${selectedItemTypeId}`} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                            {itemTypes.map((type) => (
                                <SelectItem key={type.id} value={`${type.id}`}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <CreateSectionForm villageId={villageId} />
            </ItemsFilters>
            {/* TABLES */}
            {selectedItemType && (<ItemsTable items={itemsToShow} selectedItemType={selectedItemType} itemTypes={itemTypes} selectedSectionId={selectedSection} />)}
        </>
    )
}

export default ItemsWrapper