import { BASE_API_URL } from "@/constants/constants";
import { BRANDS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const brandService = {
  createBrand,
  deleteBrand,
  editBrand,
};

const BRANDS_URL = `${BASE_API_URL}${BRANDS_ENDPOINT}`;

async function createBrand(name: string, website: string, categories: string[]) {
  return await fetchWrapper.post(`${BRANDS_URL}`, {
    name,
    website,
    categories
  });
}

async function editBrand(
  id: number,
  name: string,
  website: string,
  categories: string[]
) {
  return await fetchWrapper.put(`${BRANDS_URL}${id}/`, {
    name,
    website,
    categories
  });
}

async function deleteBrand(id: number) {
  return await fetchWrapper.delete(`${BRANDS_URL}${id}/`, null);
}
