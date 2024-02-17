import * as z from "zod";

export const villageFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Brand name should be minimum 2 characters" }),
    location: z.array(z.string().nonempty("A string cannot be empty")),
});
