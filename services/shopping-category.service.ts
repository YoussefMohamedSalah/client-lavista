// Importing necessary constants and utility functions
import { BASE_API_URL } from "@/constants/constants";
import { SHOPPING_CATEGORIES_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

// Define a service object that exposes methods for CRUD operations related to shopping categories
export const shoppingCategoryService = {
  deleteShoppingCategory: deleteShoppingCategory,
  createShoppingCategory: createShoppingCategory,
};

// Construct the base URL for shopping category operations using the base API URL and shopping categories endpoint
const SHOPPING_CATEGORY_URL = `${BASE_API_URL}${SHOPPING_CATEGORIES_ENDPOINT}`;

/**
 * Create a new shopping category.
 *
 * @param name - The name of the shopping category to be created.
 * @returns Promise - Resolves with the created shopping category's data or rejects with an error.
 */
async function createShoppingCategory(name: string) {
  return await fetchWrapper.post(`${SHOPPING_CATEGORY_URL}`, {
    name,
  });
}

/**
 * Delete a shopping category by its ID.
 *
 * @param id - The ID of the shopping category to be deleted.
 * @returns Promise - Resolves with the status of the deletion or rejects with an error.
 */
async function deleteShoppingCategory(id: number) {
  return await fetchWrapper.delete(`${SHOPPING_CATEGORY_URL}${id}/`, null);
}
