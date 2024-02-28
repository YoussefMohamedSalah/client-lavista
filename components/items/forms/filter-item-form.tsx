"use client";

import { filterItemFormSchema } from "@/lib/validations/items/filterItem";
import { Input } from "../../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterType } from "@/types/item";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { FilterCreateType, itemService } from "@/services/item.service";

type FormData = z.infer<typeof filterItemFormSchema>;

interface Props {
	itemTypeId: string;
	sectionId: string;
	selectedItem?: any;
	handleEdit?: (item: FilterType) => void;
	closeModal?: (item: any) => void;
}

export default function FilterItemForm({ sectionId, itemTypeId, selectedItem, handleEdit, closeModal }: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof filterItemFormSchema>>({
		resolver: zodResolver(filterItemFormSchema)
	});

	React.useEffect(() => {
		if (selectedItem) {
			form.reset(selectedItem);
		} else {
			form.reset();
		}
	}, [selectedItem, form.reset]);


	async function onSubmit(data: FormData) {
		setIsLoading(true);
		if (handleEdit && selectedItem) {
			handleEdit({ id: selectedItem.id, ...data });
			setIsLoading(false);
		} else {
			const createFilterObj: FilterCreateType = {
				sectionId: sectionId,
				itemTypeId: itemTypeId,
				name: data.name,
				state: data.state,
				filter_type: data.filter_type,
				filter_diameter: data.filter_diameter,
				filter_flow: data.filter_flow,
				area: data.area,
				sand: data.sand,
				sand_size: data.sand_size,
				max_pressure: data.max_pressure,
				o_ring: data.o_ring,
				details: data.details,
				notes: data.notes,
			}
			const apiResponse = await itemService.createFilterItem(createFilterObj);
			setIsLoading(false);
			if (closeModal && apiResponse) {
				closeModal(apiResponse);
			}
			if (!apiResponse.error) {
				router.refresh();
			} else {
				toast({
					variant: "destructive",
					title: "An unexpected error occured."
				});
			}
		}
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="mt-2 grid grid-cols-2 md:grid-cols-2 gap-1">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="filter_type"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Filter Type</FormLabel>
								<FormControl>
									<Input placeholder="Filter Type" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="filter_diameter"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Filter Diameter</FormLabel>
								<FormControl>
									<Input placeholder="Filter Diameter" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="filter_flow"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Filter Flow</FormLabel>
								<FormControl>
									<Input placeholder="Filter Flow" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) =>
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input placeholder="State" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="area"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Area</FormLabel>
								<FormControl>
									<Input placeholder="Area" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="sand"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Sand Weight</FormLabel>
								<FormControl>
									<Input placeholder="Sand Weight" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="sand_size"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Sand Size</FormLabel>
								<FormControl>
									<Input placeholder="Sand Size" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="max_pressure"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Max Pressure</FormLabel>
								<FormControl>
									<Input placeholder="Max Pressure" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="o_ring"
						render={({ field }) =>
							<FormItem>
								<FormLabel>O Ring</FormLabel>
								<FormControl>
									<Input placeholder="O Ring" {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>}
					/>
				</div>
				<FormField
					control={form.control}
					name="details"
					render={({ field }) =>
						<FormItem>
							<FormLabel>Details</FormLabel>
							<FormControl>
								<Input placeholder="Details" {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>}
				/>
				<FormField
					control={form.control}
					name="notes"
					render={({ field }) =>
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Input placeholder="Notes" {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>}
				/>
				<Button
					disabled={isLoading}
					type="submit"
					className="w-full mt-2"
				>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					{selectedItem ? "Edit" : "Create"}
				</Button>
			</form>
		</Form>
	);
}
