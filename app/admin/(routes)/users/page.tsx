import { DashboardHeader } from "@/components/header";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import UsersTable from "@/components/users/users-table";
import { BASE_API_URL } from "@/constants/constants";
import { USERS_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
  description: "Users"
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function UsersPage({ searchParams }: IndexPageProps) {
  const { page, per_page, first_name, permission_role } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  let getAllUsersUrl = `${BASE_API_URL}${USERS_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (first_name !== null && first_name !== undefined) {
    getAllUsersUrl = getAllUsersUrl + `&name=${first_name}`;
  }

  if (permission_role !== null && permission_role !== undefined) {
    if (typeof permission_role === "string") {
      const result = permission_role.split(".");

      if (result.includes("staff")) {
        getAllUsersUrl += `&is_staff=true`;
      }
      if (result.includes("superuser")) {
        getAllUsersUrl += `&is_superuser=true`;
      }
    }
  }

  return (
    <div>
      <DashboardHeader heading="Users" text="Create and manage users" />
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        {/* <UsersTable url={getAllUsersUrl} /> */}
      </Suspense>
    </div>
  );
}
