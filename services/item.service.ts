import { BASE_API_URL } from "@/constants/constants";
import { ITEMS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const itemService = {
    createItem,
    deleteItem,
    editItem,
};

const ITEM_URL = `${BASE_API_URL}${ITEMS_ENDPOINT}`;

async function createItem(name: string, id: string[]) {
    return await fetchWrapper.post(`${ITEM_URL}${id[0]}`, {
        name
    });
}

async function editItem(
    id: string,
    name: string,
) {
    return await fetchWrapper.put(`${ITEM_URL}${id}`, {
        name,
    });
}

async function deleteItem(id: string) {
    return await fetchWrapper.delete(`${ITEM_URL}${id}`, null);
}
