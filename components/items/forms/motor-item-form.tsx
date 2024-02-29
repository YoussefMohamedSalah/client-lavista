"use client";

import { motorItemFormSchema } from "@/lib/validations/items/motorItem";
import { Input } from "../../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotorCreateType, itemService } from "@/services/item.service";
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
import { MotorType } from "@/types/item";

type FormData = z.infer<typeof motorItemFormSchema>;

interface Props {
    itemTypeId: string;
    sectionId: string;
    selectedItem?: any;
    handleEdit?: (item: MotorType) => void;
    closeModal?: () => void;
}

export default function MotorItemForm({ sectionId, itemTypeId, selectedItem, handleEdit, closeModal }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof motorItemFormSchema>>({
        resolver: zodResolver(motorItemFormSchema)
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
            const createMotorObj: MotorCreateType = {
                sectionId: sectionId,
                itemTypeId: itemTypeId,
                name: data.name,
                serial_num: data.serial_num,
                hp: data.hp,
                amp: data.amp,
                phase: data.phase,
                capacitor: data.capacitor,
                front_bearing: data.front_bearing,
                back_bearing: data.back_bearing,
                q: data.q,
                h: data.h,
                mechanical_seal: data.mechanical_seal,
                o_ring: data.o_ring,
                pump_type: data.pump_type,
                details: data.details,
                state: data.state,
                notes: data.notes,
            }
            const apiResponse = await itemService.createMotorItem(createMotorObj);
            setIsLoading(false);
            if (closeModal && apiResponse) {
                closeModal();
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
                        name="serial_num"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Serial Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Serial Number" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="pump_type"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Pump Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pump Type" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="hp"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>HP</FormLabel>
                                <FormControl>
                                    <Input placeholder="Hp" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="amp"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>AMP</FormLabel>
                                <FormControl>
                                    <Input placeholder="AMP" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="phase"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Phase</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phase" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />

                    <FormField
                        control={form.control}
                        name="capacitor"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Capacitor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Capacitor" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="front_bearing"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Front Bearing</FormLabel>
                                <FormControl>
                                    <Input placeholder="Front Bearing" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="back_bearing"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Back Bearing</FormLabel>
                                <FormControl>
                                    <Input placeholder="Back Bearing" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="q"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Q</FormLabel>
                                <FormControl>
                                    <Input placeholder="Q" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="h"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>H</FormLabel>
                                <FormControl>
                                    <Input placeholder="H" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField
                        control={form.control}
                        name="mechanical_seal"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Mechanical Seal</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mechanical Seal" {...field} />
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
