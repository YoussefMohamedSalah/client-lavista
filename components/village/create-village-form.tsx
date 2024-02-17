"use client";

import { villageFormSchema } from "@/lib/validations/village";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationService } from "@/services/location.service";
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
import { villageService } from "@/services/village.service";

type FormData = z.infer<typeof villageFormSchema>;

interface CreateVillageFormProps {
  locations: any[];
}

export default function CreateVillageForm({
  locations
}: CreateVillageFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof villageFormSchema>>({
    resolver: zodResolver(villageFormSchema),
    defaultValues: {
      location: []
    }
  });

  async function onSubmit(data: FormData) {
    console.log("test");
    setIsLoading(true);
    const apiResponse = await villageService.createVillage(
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
                <Input placeholder="Village name" {...field} />
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
              <FormLabel>Select categories</FormLabel>
              <MultiSelect
                selected={field.value}
                options={locations.map(location => ({
                  label: location.name,
                  value: location.id.toString()
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
