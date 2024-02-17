import { BASE_API_URL } from "@/constants/constants";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const authService = {
  login,
};

async function login(
  email?: string,
  password?: string
): Promise<LoginResponse> {
  return await fetchWrapper.post(`${BASE_API_URL}/auth/login`, {
    email: `${email}`,
    password: `${password}`,
  });
}
