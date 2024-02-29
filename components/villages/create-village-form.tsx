"use client";

import { villageFormSchema } from "@/lib/validations/village";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
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

type FormData = z.infer<typeof villageFormSchema>;

interface Props {
    locationId: string;
}

export default function CreateVillageForm({ locationId }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof villageFormSchema>>({
        resolver: zodResolver(villageFormSchema)
    });

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        const apiResponse = await villageService.createVillage(
            data.name,
            locationId
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
                className="px-2 py-2 items-center flex w-full gap-3 space-y-6 sm:w-[350px]"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) =>
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Village name" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>}
                />
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-1/2"
                >
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                </Button>
            </form>
        </Form>
    );
}
