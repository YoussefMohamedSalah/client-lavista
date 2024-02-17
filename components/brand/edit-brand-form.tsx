"use client";

import { brandFormSchema } from "@/lib/validations/brand";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandService } from "@/services/brand.service";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Brand } from "@/types/brand";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ShoppingCategory } from "@/types/shopping-category";
import { MultiSelect } from "../ui/multi-select";

type FormData = z.infer<typeof brandFormSchema>;

interface EditBrandFormProps {
  brand: Brand;
  shoppingCategories: ShoppingCategory[];
}

export default function EditBrandForm({ brand, shoppingCategories }: EditBrandFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand.name,
      website: brand.website,
      categories: brand.categories.map(category => category.id.toString())
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const apiResponse = await brandService.editBrand(
      brand.id,
      data.name,
      data.website,
      data.categories
    );
    setIsLoading(false);
    if (!apiResponse.error) {
      router.push("/admin/brands");
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "An unexpected error occured.",
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Brand name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Brand website" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select categories</FormLabel>
              <MultiSelect
                selected={field.value}
                options={shoppingCategories.map((item) => ({
                  label: item.name,
                  value: item.id.toString(),
                }))}
                {...field}
                className="sm:w-[510px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-1/2">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  );
}
