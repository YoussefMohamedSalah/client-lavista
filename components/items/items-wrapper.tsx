"use client"

import React, { useEffect, useState } from 'react'
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
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button';
import { PageHeader } from '../page-header';

interface Props {
	villageName: string;
	villageId: string;
	sections: any[];
	token: string;
	itemTypes: any[];
}

const ItemsWrapper = ({ villageName, villageId, sections, token, itemTypes }: Props) => {
	const [initialized, setInitialized] = useState<boolean>(false);
	const [itemsToShow, setItemsToShow] = useState<any[]>([]);
	const [selectedSection, setSelectedSection] = useState<string>("");
	const [selectedItemTypeId, setSelectedItemTypeId] = useState<string>("");
	const [selectedItemType, setSelectedItemType] = useState<string>("");

	useEffect(() => {
		if (!initialized) {
			setInitialized(true);
		}
	}, []);

	const handleRefetch = async () => {
		if (typeof window !== "undefined") {
			let sectionId = localStorage.getItem("sectionId");
			let itemTypeId = localStorage.getItem("itemTypeId");
			if (sectionId && itemTypeId && sectionId !== "undefined" && itemTypeId !== "undefined" && itemTypeId !== "0") {
				let idsObj = {
					sectionId: sectionId ? sectionId : "0",
					itemTypeId: itemTypeId
				}
				const itemsResponse = await fetch(`${BASE_API_URL}${SECTIONS_ENDPOINT}items/village/${villageId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(idsObj)
				});
				const itemData: any = await itemsResponse.json();
				setItemsToShow([...itemData]);
				setSelectedSection(sectionId);
				setSelectedItemTypeId(itemTypeId)
			}
		}
	}

	useEffect(() => {
		if (initialized) {
			let selectedItemType = itemTypes.find((itemType) => itemType.id === selectedItemTypeId);
			if (selectedItemType) setSelectedItemType(selectedItemType);
			if (typeof window !== "undefined") {
				localStorage.setItem("sectionId", selectedSection || "0");
				localStorage.setItem("itemTypeId", selectedItemType?.id! || "0");
				if (selectedItemType?.name === "Elec Panel") {
					localStorage.setItem("itemTypeName", "Elec_Panel");
				} else {
					localStorage.setItem("itemTypeName", selectedItemType?.name!);
				}
			}
			handleRefetch()
		}
	}, [selectedItemTypeId, selectedSection]);

	if (!initialized) return <></>
	return (
		<>
			<PageHeader heading={`${villageName} Details`} text={`Add Sections To ${villageName}`}>
				<CreateSectionForm villageId={villageId} />
			</PageHeader>
			<div className="w-full flex px-2 py-2 align-center justify-evenly flex-wrap">
				<div className="flex-col space-y-1 w-[170px]">
					<Label>Sections</Label>
					<Select
						value={`${selectedSection || "All"}`}
						onValueChange={(value) => {
							setSelectedSection(value)
						}}
					>
						<SelectTrigger className="h-8 w-[150px] md:w-[250px]">
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
				<div className="flex-col space-y-1 w-[170px]">
					<Label>Item Type</Label>
					<Select
						value={`${selectedItemTypeId || "All"}`}
						onValueChange={(value) => {
							setSelectedItemTypeId(value)
						}}
					>
						<SelectTrigger className="h-8 w-[150px] md:w-[250px]">
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
				<div className="flex justify-end flex-col gap-1 space-y-1 w-[200px] md:w-[250px] pt-3 md:pt-0">
					<Button>
						Count: {itemsToShow ? itemsToShow.length : 0}
					</Button>
				</div>
			</div>
			{/* TABLES */}
			<ItemsTable refetch={handleRefetch} token={token} items={itemsToShow} selectedItemType={selectedItemType} itemTypes={itemTypes} selectedSectionId={selectedSection} />
		</>
	)
}

export default ItemsWrapper