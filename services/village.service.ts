import { BASE_API_URL } from "@/constants/constants";
import { VILLAGES_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const villageService = {
    createVillage,
    deleteVillage,
    editVillage,
};

const VILLAGE_URL = `${BASE_API_URL}${VILLAGES_ENDPOINT}`;

async function createVillage(name: string, locationId: string) {
    return await fetchWrapper.post(`${VILLAGE_URL}${locationId}`, {
        name
    });
}

async function editVillage(
    id: string,
    name: string,
) {
    return await fetchWrapper.put(`${VILLAGE_URL}${id}`, {
        name,
    });
}

async function deleteVillage(id: string) {
    return await fetchWrapper.delete(`${VILLAGE_URL}${id}`, null);
}
