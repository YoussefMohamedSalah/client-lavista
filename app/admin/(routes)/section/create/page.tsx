import CreateSectionForm from "@/components/section/create-section-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_VILLAGES_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Create Village"
};

export default async function CreateSectionPage() {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(
    `${BASE_API_URL}${ALL_VILLAGES_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const villages = await apiResponse.json();

  console.log(villages)
  return (
    <div>
      <DashboardHeader heading="Create Section" />
      <CreateSectionForm villages={villages} />
    </div>
  );
}
