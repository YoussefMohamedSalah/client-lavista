import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const challengeService = {
  createChallenge,
  deleteChallenge,
  editChallenge,
};

const BRANDS_URL = `${BASE_API_URL}${CHALLENGES_ENDPOINT}`;

async function createChallenge(formData: FormData) {
  return await fetchWrapper.post(`${BRANDS_URL}`, null, formData);
}

async function editChallenge(id: number, formData: FormData) {
  return await fetchWrapper.put(`${BRANDS_URL}${id}/`, null, formData);
}

async function deleteChallenge(id: number) {
  return await fetchWrapper.delete(`${BRANDS_URL}${id}/`, null);
}
