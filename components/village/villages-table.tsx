import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { VillagesTableShell } from "./villages-table-shell";

interface UsersTableProps {
  url: string;
}

async function VillagesTable({ url }: UsersTableProps) {
  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const villages = await apiResponse.json();
  // const pageCount = users.total_pages;

  return (
    <div className="px-2 py-10">
      <VillagesTableShell data={villages} pageCount={1} />
    </div>
  );
}

export default VillagesTable;
