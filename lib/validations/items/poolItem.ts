import * as z from "zod";

export const poolItemFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Item name should be minimum 2 characters" }),
    count: z
        .string()
        .min(2, { message: "Item Count should be minimum 2 characters" }),
    details: z
        .string()
        .min(2, { message: "details should be minimum 2 characters" }),
    state: z
        .string()
        .min(2, { message: "Item state should be minimum 2 characters" }),
    notes: z
        .string()
        .min(2, { message: "Notes should be minimum 2 characters" }),
});
