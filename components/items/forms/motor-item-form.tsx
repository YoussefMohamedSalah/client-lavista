"use client";

import { motorItemFormSchema } from "@/lib/validations/items/motorItem";
import { Input } from "../../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { villageService } from "@/services/village.service";
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

type FormData = z.infer<typeof motorItemFormSchema>;

interface Props {
}

export default function MotorItemForm({ }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof motorItemFormSchema>>({
        resolver: zodResolver(motorItemFormSchema)
    });

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        const apiResponse = await villageService.createVillage(
            data.name,
            "123"
        );
        setIsLoading(false);
        if (!apiResponse.error) {
            router.refresh();
        } else {
            toast({
                variant: "destructive",
                title: "An unexpected error occured."
            });
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
                                    <Input placeholder="Item name" {...field} />
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
                                <Input placeholder="Item Details" {...field} />
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
                                <Input placeholder="Item Notes" {...field} />
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
                    Create
                </Button>
            </form>
        </Form>
    );
}
