import * as z from "zod";

export const sectionFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Section name should be minimum 2 characters" }),
});
