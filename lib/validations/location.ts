import * as z from "zod";

export const locationFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Brand name should be minimum 2 characters" }),
});
