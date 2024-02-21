import { BASE_API_URL } from "@/constants/constants";
import { ITEMS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const itemService = {
    createMotorItem,
    createFilterItem,
    createPoolItem,
    createElecItem,
    deleteItem,
    editItem,
};

export interface MotorCreateType {
    sectionId: string,
    itemTypeId: string,
    name: string,
    brand: string,
    serial_num: string;
    hp: string,
    amp: string,
    phase: string,
    capacitor: string,
    front_bearing: string,
    back_bearing: string,
    q: string,
    h: string,
    mechanical_seal: string,
    o_ring: string,
    pump_type: string,
    state: string,
    details: string,
    notes: string,
}

export interface FilterCreateType {
    sectionId: string,
    itemTypeId: string,
    name: string,
    details: string,
    state: string,
    filter_type: string,
    filter_diameter: string,
    filter_flow: string,
    notes: string,
    area: string,
    sand: string,
    sand_size: string,
    max_pressure: string,
    o_ring: string
}

export interface PoolCreateType {
    sectionId: string,
    itemTypeId: string,
    name: string,
    count: string,
    details: string,
    state: string,
    notes: string,
}

export interface ElecCreateType {
    sectionId: string,
    itemTypeId: string,
    name: string,
    brand: string,
    count: string,
    details: string,
    state: string,
    notes: string,
}

const ITEM_URL = `${BASE_API_URL}${ITEMS_ENDPOINT}`;

async function createMotorItem({
    itemTypeId,
    sectionId,
    name,
    brand,
    hp,
    amp,
    phase,
    capacitor,
    front_bearing,
    back_bearing,
    q,
    h,
    mechanical_seal,
    o_ring,
    pump_type,
    details,
    state,
    notes,
}: MotorCreateType) {
    return await fetchWrapper.post(`${ITEM_URL}${sectionId}`, {
        itemTypeId,
        name,
        brand,
        hp,
        amp,
        phase,
        capacitor,
        front_bearing,
        back_bearing,
        q,
        h,
        mechanical_seal,
        o_ring,
        pump_type,
        details,
        state,
        notes,
    });
}

async function createFilterItem({
    itemTypeId,
    sectionId,
    name,
    area,
    sand,
    sand_size,
    max_pressure,
    details,
    state,
    filter_type,
    filter_diameter,
    filter_flow,
    notes,
    o_ring,
}: FilterCreateType) {
    return await fetchWrapper.post(`${ITEM_URL}${sectionId}`, {
        itemTypeId,
        name,
        area,
        sand,
        sand_size,
        max_pressure,
        details,
        state,
        filter_type,
        filter_diameter,
        filter_flow,
        notes,
        o_ring
    });
}

async function createPoolItem({
    itemTypeId,
    sectionId,
    name,
    count,
    details,
    state,
    notes,
}: PoolCreateType) {
    return await fetchWrapper.post(`${ITEM_URL}${sectionId}`, {
        itemTypeId,
        sectionId,
        name,
        count,
        details,
        state,
        notes,
    });
}

async function createElecItem({
    sectionId,
    itemTypeId,
    name,
    brand,
    count,
    details,
    state,
    notes,
}: ElecCreateType) {
    return await fetchWrapper.post(`${ITEM_URL}${sectionId}`, {
        itemTypeId,
        name,
        brand,
        count,
        details,
        state,
        notes,
    });
}

// -----------------------------------------------------//

async function editItem(
    id: string,
    name: string,
    brand: string,
    count: string,
    hp: string,
    amp: string,
    phase: string,
    capacitor: string,
    front_bearing: string,
    back_bearing: string,
    q: string,
    pump_type: string,
    details: string,
    state: string,
    filter_type: string,
    filter_diameter: string,
    filter_flow: string,
    notes: string,
) {
    return await fetchWrapper.put(`${ITEM_URL}${id}`, {
        name,
        brand,
        count,
        hp,
        amp,
        phase,
        capacitor,
        front_bearing,
        back_bearing,
        q,
        pump_type,
        details,
        state,
        filter_type,
        filter_diameter,
        filter_flow,
        notes,
    });
}

async function deleteItem(id: string) {
    return await fetchWrapper.delete(`${ITEM_URL}${id}`, null);
}
