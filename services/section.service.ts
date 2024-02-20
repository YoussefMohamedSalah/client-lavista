import { BASE_API_URL } from "@/constants/constants";
import { SECTIONS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const sectionService = {
    createSection,
    deleteSection,
    editSection,
};

const SECTION_URL = `${BASE_API_URL}${SECTIONS_ENDPOINT}`;

async function createSection(name: string, id: string) {
    return await fetchWrapper.post(`${SECTION_URL}${id}`, {
        name
    });
}

async function editSection(
    id: string,
    name: string,
) {
    return await fetchWrapper.put(`${SECTION_URL}${id}`, {
        name,
    });
}

async function deleteSection(id: string) {
    return await fetchWrapper.delete(`${SECTION_URL}${id}`, null);
}
