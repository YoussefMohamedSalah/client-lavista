import * as z from "zod";

export const villageFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Village name should be minimum 2 characters" }),
});