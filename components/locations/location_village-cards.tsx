import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  villages: any;
}

export default async function LocationVillageCards({villages}:Props) {

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
      {villages && villages?.length > 0 ? (
        <>
          {villages?.map((village: any) => (
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
