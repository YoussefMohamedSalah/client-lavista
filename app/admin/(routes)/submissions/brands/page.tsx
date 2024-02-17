import BrandsTable from "@/components/brand/brands-table";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import BrandSubmissionsTable from "@/components/submissions/brands/brands-submissions-table";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { BRAND_SUBMISSIONS_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Brand submissions",
  description: "Brand submissions",
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function BrandSubmissionsPage({ searchParams }: IndexPageProps) {
  const { page, per_page, name } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  let getAllBrandSubmissionsUrl = `${BASE_API_URL}${BRAND_SUBMISSIONS_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (name !== null && name !== undefined) {
    getAllBrandSubmissionsUrl = getAllBrandSubmissionsUrl + `&name=${name}`;
  }

  return (
    <div>
      <DashboardHeader heading="Brand Submissions" text="Manage brand submissions"/>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <BrandSubmissionsTable url={getAllBrandSubmissionsUrl} />
      </Suspense>
    </div>
  );
}
