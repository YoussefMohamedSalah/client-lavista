import * as z from "zod";

export const filterItemFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Item name should be minimum 2 characters" }),
    details: z
        .string(),
    state: z
        .string()
        .min(2, { message: "Item state should be minimum 2 characters" }),
    filter_type: z
        .string()
        .min(2, { message: "Filter Type should be minimum 2 characters" }),
    filter_diameter: z
        .string()
        .min(2, { message: "Filter Diameter should be minimum 2 characters" }),
    filter_flow: z
        .string()
        .min(2, { message: "Filter Flow should be minimum 2 characters" }),
    area: z
        .string()
        .min(2, { message: "Filter Flow should be minimum 2 characters" }),
    sand: z
        .string()
        .min(2, { message: "Sand should be minimum 2 characters" }),
    sand_size: z
        .string()
        .min(2, { message: "Sand Size should be minimum 2 characters" }),
    max_pressure: z
        .string()
        .min(2, { message: "Max Pressure should be minimum 2 characters" }),
    o_ring: z
        .string()
        .min(2, { message: "O Ring should be minimum 2 characters" }),
    notes: z
        .string()
        .min(2, { message: "Notes should be minimum 2 characters" }),

});
