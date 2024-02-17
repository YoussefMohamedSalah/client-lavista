import { ChallengesTableShell } from "./challenges-table-shell";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface ChallengesTableProps {
  url: string;
}

async function ChallengesTable({ url }: ChallengesTableProps) {
  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const challenges = await apiResponse.json();
  const pageCount = challenges.total_pages;
  return (
    <div className="px-2 py-10">
      <ChallengesTableShell data={challenges.results} pageCount={pageCount} />
    </div>
  );
}

export default ChallengesTable;
