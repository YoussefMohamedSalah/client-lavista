import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import DelEditBtns from "../shared/del-edit-btns";
import { VILLAGES_ENDPOINT } from "@/constants/routes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


interface Props {
	villages: any[];
}

export default async function VillagesCards({ villages }: Props) {
	const session = await getServerSession(authOptions);

	return (
		<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 auto-rows-max">
			{villages && villages?.length > 0 ? (
				<>
					{villages?.map((village: any) => (
						<Card key={village?.id!}>
							<CardHeader className="flex flex-row justify-between">
								<Link href={`/admin/villages/${village?.id}`}>
									<CardTitle>{village.name}</CardTitle>
								</Link>
								<DelEditBtns route={`${VILLAGES_ENDPOINT}`} token={session?.user?.accessToken! || ""} item={village} />
							</CardHeader>
							<Link href={`/admin/villages/${village?.id}`}>
								<CardContent>
									<CardDescription>
										Total Sections: {village.sections_count || 0}
									</CardDescription>
								</CardContent>
							</Link>
						</Card>
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
