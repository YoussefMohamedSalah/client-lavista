import * as z from "zod";

export const motorItemFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Item name should be minimum 2 characters" }),
    serial_num: z
        .string(),
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
        .string(),
    front_bearing: z
        .string(),
    back_bearing: z
        .string(),
    q: z
        .string(),
    h: z
        .string(),
    mechanical_seal: z
        .string(),
    o_ring: z
        .string(),
    pump_type: z
        .string(),
    details: z
        .string(),
    state: z
        .string()
        .min(2, { message: "Item state should be minimum 2 characters" }),
    notes: z
        .string()
});
