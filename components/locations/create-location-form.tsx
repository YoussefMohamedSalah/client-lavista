"use client";

import { locationFormSchema } from "@/lib/validations/location";
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

type FormData = z.infer<typeof locationFormSchema>;

interface CreateLocationFormProps {
  shoppingCategories: any[];
}

export default function CreateLocationForm({
  shoppingCategories
}: CreateLocationFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema)
  });

  async function onSubmit(data: FormData) {
    console.log("test");
    setIsLoading(true);
    const apiResponse = await locationService.createLocation(data.name);
    setIsLoading(false);
    if (!apiResponse.error) {
      router.push("/admin/locations");
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
                <Input placeholder="Location name" {...field} />
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
