import { DashboardHeader } from "@/components/header";
import { BrandSubmission } from "@/types/brand-submission";
import { BASE_API_URL } from "@/constants/constants";
import { BRAND_SUBMISSIONS_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ViewBrandSubmissionLayout from "@/components/submissions/brands/view/view-brand-layout";

export const metadata: Metadata = {
  title: "Brand submission",
  description: "Brand submission",
};


export default async function BrandSubmissionsPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);

  const getBrandSubmissionApiResponse = await fetch(
    `${BASE_API_URL}${BRAND_SUBMISSIONS_ENDPOINT}${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const brandSubmissionApiResponse: BrandSubmission =
    await getBrandSubmissionApiResponse.json();

  return (
    <>
      <DashboardHeader heading="Brand Submission" />
      <ViewBrandSubmissionLayout brandSubmission={brandSubmissionApiResponse} />
    </>
  );
}
