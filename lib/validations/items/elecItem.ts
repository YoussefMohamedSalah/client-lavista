import * as z from "zod";

export const elecItemFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Item name should be minimum 2 characters" }),
    serial_num: z
        .string()
        .min(2, { message: "Item Serial Number should be minimum 2 characters" }),
    hp: z
        .string()
        .min(2, { message: "Item Hp should be minimum 2 characters" }),
    amp: z
        .string()
        .min(2, { message: "Item AMP should be minimum 2 characters" }),
    phase: z
        .string()
        .min(2, { message: "Item Phase should be minimum 2 characters" }),
    capacitor: z
        .string()
        .min(2, { message: "Item Capacitor should be minimum 2 characters" }),
    front_bearing: z
        .string()
        .min(2, { message: "Item Front Bearing should be minimum 2 characters" }),
    back_bearing: z
        .string()
        .min(2, { message: "Item Back Bearing should be minimum 2 characters" }),
    q: z
        .string()
        .min(2, { message: "Item Q should be minimum 2 characters" }),
    pump_type: z
        .string()
        .min(2, { message: "pump_type should be minimum 2 characters" }),
    details: z
        .string()
        .min(2, { message: "details should be minimum 2 characters" }),
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
    notes: z
        .string()
        .min(2, { message: "Notes should be minimum 2 characters" }),

});
