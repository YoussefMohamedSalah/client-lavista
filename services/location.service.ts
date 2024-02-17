import { BASE_API_URL } from "@/constants/constants";
import { LOCATIONS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const locationService = {
    createLocation,
    deleteLocation,
    editLocation,
};

const LOCATION_URL = `${BASE_API_URL}${LOCATIONS_ENDPOINT}`;

async function createLocation(name: string) {
    return await fetchWrapper.post(`${LOCATION_URL}`, {
        name,
    });
}

async function editLocation(
    id: number,
    name: string,
) {
    return await fetchWrapper.put(`${LOCATION_URL}${id}`, {
        name,
    });
}

async function deleteLocation(id: number) {
    return await fetchWrapper.delete(`${LOCATION_URL}${id}`, null);
}
