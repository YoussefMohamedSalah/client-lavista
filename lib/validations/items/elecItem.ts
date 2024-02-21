import { count } from "console";
import * as z from "zod";

export const elecItemFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Item name should be minimum 2 characters" }),
    count: z
        .string()
        .min(2, { message: "Item Count should be minimum 2 characters" }),
    details: z
        .string(),
    brand: z
        .string(),
    state: z
        .string(),
    notes: z
        .string()
});
