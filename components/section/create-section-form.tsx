"use client";

import { sectionFormSchema } from "@/lib/validations/section";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
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
import { MultiSelect } from "../ui/multi-select";
import { sectionService } from "@/services/section.service";

type FormData = z.infer<typeof sectionFormSchema>;

interface CreateSectionFormProps {
  villages: any[];
}

export default function CreateSectionForm({
  villages
}: CreateSectionFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof sectionFormSchema>>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: {
      location: []
    }
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const apiResponse = await sectionService.createSection(
      data.name,
      data.location
    );
    setIsLoading(false);
    if (!apiResponse.error) {
      router.push(`/admin/locations/${data.location[0]}`);
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
        className="px-2 py-8 flex w-full flex-col space-y-6 sm:w-[350px]"
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
        <FormField
          control={form.control}
          name="location"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Select Village</FormLabel>
              <MultiSelect
                selected={field.value}
                options={villages.map(village => ({
                  label: village.name,
                  value: village.id.toString()
                }))}
                {...field}
                className="sm:w-[510px]"
              />
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
