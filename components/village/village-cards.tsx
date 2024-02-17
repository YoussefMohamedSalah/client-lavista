import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

interface Props {
  url: string;
}

export default async function VillageCards({url}:Props) {

  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const data: any = await apiResponse.json();

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
      {data && data?.villages?.length > 0 ? (
        <>
          {data?.villages?.map((village: any) => (
            <Link href={`/admin/villages/${village?.id}`} key={village?.id!}>
              <Card>
                <CardHeader>
                  <CardTitle>{village.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          )
          )}
        </>
      ) : (
        <div className="container flex w-screen flex-col items-center justify-center mt-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            No Villages For This Location!
          </h1>
        </div>
      )}
    </div>
  );
}
