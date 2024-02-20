import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
    sections: any[];
    villageId: string;
}

export default async function SectionsCards({ sections, villageId }: Props) {
    return (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-3 pt-2">
            {sections && sections?.length > 0 ? (
                <>
                    {sections?.map((section: any) => (
                        <Link href={`/admin/items/${villageId}`} key={section?.id!}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{section.name}</CardTitle>
                                    <CardDescription>
                                        Total Items: {section.items_count || 0}
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
                        No Sections Exists!
                    </h1>
                </div>
            )}
        </div>
    );
}
