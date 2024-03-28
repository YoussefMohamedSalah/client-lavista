"use client"
import Image from 'next/image'
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
import ImageCard from '../images/ImageCard';

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
	const [showImages, setShowImages] = useState<boolean>(false);
	const [imagesData, setImagesData] = useState<{ id: string, url: string }[]>([]);
	const [toUploadFile, setToUploadFile] = useState<File>({} as File);

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
				console.log(itemData)
				setItemsToShow([...itemData]);
				setSelectedSection(sectionId);
				setSelectedItemTypeId(itemTypeId)
			}

			if (showImages) {
				console.log("inside")
				let idsObj = {
					sectionId: sectionId ? sectionId : "0",
					itemTypeId: "images"
				}
				const itemsResponse = await fetch(`${BASE_API_URL}${SECTIONS_ENDPOINT}items/village/${villageId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(idsObj)
				});
				const images: any = await itemsResponse.json();
				console.log(images)
				setImagesData([...images]);
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


	const handleImageUpload = (e: any) => {
		let thumbnail: File = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(thumbnail);
		reader.onload = (url) => {
			setToUploadFile(thumbnail);
		}
	};

	const formatImageUrl = () => {
		if (toUploadFile) {
			const reader = new FileReader();
			reader.readAsDataURL(toUploadFile);
			reader.onloadend = () => {
				return reader.result;
			};
		} else return "";
	};

	const handleUpload = async () => {
		try {
			if (!toUploadFile || !selectedSection) return;

			// Create form data
			const formData = new FormData();
			formData.append('file', toUploadFile);

			// Make API call to upload image
			const response = await fetch(`/api/image/${selectedSection}`, {
				method: 'POST',
				body: formData,
			});

			// If upload is successful, update state with image URL
			if (response.ok) {
				const data = await response.json();
				setImagesData([...imagesData, { id: String(Math.random()), url: data.imageUrl }]);
			} else {
				throw new Error('Failed to upload image');
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			// Handle error here
		} finally {
			// Clear the file to upload
			setToUploadFile({} as File);
		}
	}


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
							setSelectedItemTypeId(value !== "Images" ? value : "Images")
							setShowImages(value === "Images" ? true : false)
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
							<SelectItem value={`Images`}>
								Images
							</SelectItem>
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
			{showImages ? (
				<>
					<input type="file" accept="image/*" onChange={handleImageUpload} />
					{toUploadFile && toUploadFile.name && (
						<div className="flex md:flex justify-center align-center">
							<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
								<a href="#">
									<Image className="rounded-t-lg" src={`${formatImageUrl()}`} alt="" width={500} height={500} />
								</a>
								<Button className="w-2/2" onClick={handleUpload}>Upload</Button>
							</div>
						</div>
					)}
					<div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
						{imagesData.map((image: any, index: number) => (
							<div key={index} className="w-full sm:w-auto">
								<div className="bg-white shadow-md rounded-md p-4">
									<ImageCard src={image.url} />
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<ItemsTable refetch={handleRefetch} token={token} items={itemsToShow} selectedItemType={selectedItemType} itemTypes={itemTypes} selectedSectionId={selectedSection} />
			)}
		</>
	)
}

export default ItemsWrapper