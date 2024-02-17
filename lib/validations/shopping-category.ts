import * as z from "zod";

/**
 * Schema validation for the shopping category form.
 *
 * @property name - A string that represents the name of the shopping category.
 *                  It should have a minimum length of 4 characters.
 */
export const shoppingCategoryFormSchema = z.object({
  name: z.string().min(4, { message: "Name should be minimum 4 characters" }),
});
