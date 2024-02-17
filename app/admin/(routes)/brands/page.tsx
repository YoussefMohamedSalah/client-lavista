import BrandsTable from "@/components/brand/brands-table";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { BRANDS_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Brands",
  description: "Brands",
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function BrandsPage({ searchParams }: IndexPageProps) {
  const { page, per_page, name } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  let getAllBrandsUrl = `${BASE_API_URL}${BRANDS_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (name !== null && name !== undefined) {
    getAllBrandsUrl = getAllBrandsUrl + `&name=${name}`;
  }

  return (
    <div>
      <DashboardHeader heading="Brands" text="Create and manage brands">
        <CreateButton text="Add brand" route="brands/create" />
      </DashboardHeader>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <BrandsTable url={getAllBrandsUrl} />
      </Suspense>
    </div>
  );
}
