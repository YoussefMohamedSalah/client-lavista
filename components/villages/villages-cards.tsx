import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_LOCATIONS_ENDPOINT } from "@/constants/routes";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

interface Props {
    villages: any[];
}

export default async function VillagesCards({ villages }: Props) {
    return (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-3 pt-2">
            {villages && villages?.length > 0 ? (
                <>
                    {villages?.map((village: any) => (
                        <Link href={`/admin/villages/${village?.id}`} key={village?.id!}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{village.name}</CardTitle>
                                    <CardDescription>
                                        Total Sections: {village.sections_count || 0}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                    )}
                </>
            ) : (
                <div className="container flex w-screen flex-col items-center justify-center mt-10">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        No Villages Exists!
                    </h1>
                </div>
            )}
        </div>
    );
}
