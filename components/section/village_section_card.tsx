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

export default async function VillageSectionsCards({ url }: Props) {

  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const village: any = await apiResponse.json();
  const { mechanics_section, electronics_section, landScape_section, technicalValidity_section } = village;
  console.log(village)

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-3 pt-2">
      {mechanics_section && (
        <Link href={`/admin/mechanics/${mechanics_section?.id}`} key={mechanics_section?.id!}>
          <Card>
            <CardHeader>
              <CardTitle>Mechanics Section</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      )}
      {electronics_section && (
        <Link href={`/admin/electronics/${electronics_section?.id}`} key={electronics_section?.id!}>
          <Card>
            <CardHeader>
              <CardTitle>Electronics Section</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      )}
      {landScape_section && (
        <Link href={`/admin/land-scape/${landScape_section?.id}`} key={landScape_section?.id!}>
          <Card>
            <CardHeader>
              <CardTitle>LandScape Section</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      )}
      {technicalValidity_section && (
        <Link href={`/admin/tech-validity/${technicalValidity_section?.id}`} key={technicalValidity_section?.id!}>
          <Card>
            <CardHeader>
              <CardTitle>Tech Validity Section</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      )}
    </div>
  );
}
