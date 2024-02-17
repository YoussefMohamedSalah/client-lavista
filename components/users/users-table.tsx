import { UsersTableShell } from "@/components/users/users-table-shell";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface UsersTableProps {
  url: string;
}

async function UsersTable({ url }: UsersTableProps) {
  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const users = await apiResponse.json();
  // const pageCount = users.total_pages;

  return (
    <div className="px-2 py-10">
      <UsersTableShell data={users.results} pageCount={1} />
    </div>
  );
}

export default UsersTable;
