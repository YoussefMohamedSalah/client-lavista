"use client";

// Import necessary components, hooks, utilities, and services
import { Input } from "@/components/ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { shoppingCategoryFormSchema } from "@/lib/validations/shopping-category";
import { shoppingCategoryService } from "@/services/shopping-category.service";

// Define the data structure based on the shopping category form schema
type FormData = z.infer<typeof shoppingCategoryFormSchema>;

/**
 * A form component to create a new shopping category.
 */
export default function CreateShoppingCategoryForm() {
  // State to manage loading status
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Hook to navigate between pages
  const router = useRouter();

  // Toast utility for user notifications
  const { toast } = useToast();

  // React Hook Form utilities for form management
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(shoppingCategoryFormSchema),
  });

  /**
   * Function to handle form submission.
   *
   * @param data - The form data based on the FormData type.
   */
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const apiResponse = await shoppingCategoryService.createShoppingCategory(
      data.name
    );
    setIsLoading(false);
    if (!apiResponse.error) {
      router.push("/admin/ecom/shopping-categories");
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "An unexpected error occured.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-2 py-8 flex w-full flex-col space-y-6 sm:w-[350px]"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          {...register("name")}
          type="text"
          placeholder="Shopping category name"
          onChange={() => {
            clearErrors("name");
          }}
        />
        {errors?.name && (
          <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <Button disabled={isLoading} className="w-1/2">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Create
      </Button>
    </form>
  );
}
