import CreateBrandForm from "@/components/brand/create-brand-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_SHOPPING_CATEGORIES_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Create brand",
};

export default async function CreateBrandPage() {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(
    `${BASE_API_URL}${ALL_SHOPPING_CATEGORIES_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const shoppingCategories = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Create brand"></DashboardHeader>
      <CreateBrandForm shoppingCategories={shoppingCategories} />
    </div>
  );
}
