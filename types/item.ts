export type Item = {
    id?: string;
    code: string;
    name: string;
    count: string;
    details: string;
    state: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    item_type: string;
};



export interface MotorType {
    id?: string;
    name: string,
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

export interface FilterType {
    id?: string;
    name: string,
    state: string,
    filter_type: string,
    filter_diameter: string,
    filter_flow: string,
    area: string,
    sand: string,
    sand_size: string,
    max_pressure: string,
    o_ring: string
    notes: string,
    details: string,
}

export interface PoolType {
    id?: string;
    name: string,
    details: string,
    state: string,
    notes: string,
}

export interface ElecType {
    id?: string;
    name: string,
    state: string,
    notes: string,
    details: string,
}