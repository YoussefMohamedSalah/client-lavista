"use client";

import { elecItemFormSchema } from "@/lib/validations/items/elecItem";
import { Input } from "../../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ElecCreateType, itemService } from "@/services/item.service";
import { ElecType } from "@/types/item";

type FormData = z.infer<typeof elecItemFormSchema>;

interface Props {
    itemTypeId: string;
    sectionId: string;
    selectedItem?: any;
    handleEdit?: (item: ElecType) => void;
    closeModal?: (item: any) => void;
}

export default function ElcItemForm({ sectionId, itemTypeId, selectedItem, handleEdit, closeModal }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof elecItemFormSchema>>({
        resolver: zodResolver(elecItemFormSchema)
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
            const createElecObj: ElecCreateType = {
                sectionId: sectionId,
                itemTypeId: itemTypeId,
                name: data.name,
                details: data.details,
                state: data.state,
                notes: data.notes,
            }
            const apiResponse = await itemService.createElecItem(createElecObj);
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
