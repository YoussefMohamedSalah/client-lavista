"use client";

import { sectionFormSchema } from "@/lib/validations/section";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectionService } from "@/services/section.service";
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

type FormData = z.infer<typeof sectionFormSchema>;

interface Props {
    villageId: string;
}

export default function CreateSectionForm({ villageId }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof sectionFormSchema>>({
        resolver: zodResolver(sectionFormSchema)
    });

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        const apiResponse = await sectionService.createSection(
            data.name,
            villageId
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
                className="px-2 py-8 flex w-full gap-3 space-y-6 sm:w-[350px]"
                style={{ alignItems: "center" }}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) =>
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Section name" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>}
                />
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-1/2"
                    onClick={() => console.log("test")}
                >
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                </Button>
            </form>
        </Form>
    );
}
