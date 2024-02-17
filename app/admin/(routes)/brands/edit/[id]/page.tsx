import EditBrandForm from "@/components/brand/edit-brand-form";
import { DashboardHeader } from "@/components/header";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_SHOPPING_CATEGORIES_ENDPOINT, BRANDS_ENDPOINT } from "@/constants/routes";
import { Brand } from "@/types/brand";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Edit brand",
};

export default async function EditBrand({
  params,
}: {
  params: { id: number };
}) {

  const session = await getServerSession(authOptions);

  const getAllShoppingCategoriesApiResponse = await fetch(
    `${BASE_API_URL}${ALL_SHOPPING_CATEGORIES_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const shoppingCategories = await getAllShoppingCategoriesApiResponse.json();

  const getBrandApiResponse = await fetch(
    `${BASE_API_URL}${BRANDS_ENDPOINT}${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );
  const brandApiResponse: Brand = await getBrandApiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Edit brand"></DashboardHeader>
      <EditBrandForm brand={brandApiResponse} shoppingCategories={shoppingCategories} />
    </div>
  );
}
