import { Button } from "../ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

interface ItemsHeaderProps {
    heading: string;
    text?: string;
    children?: React.ReactNode;
}

export function ItemsHeader({
    heading,
    text,
    children
}: ItemsHeaderProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div>
                <h1 className="font-heading text-3xl md:text-4xl">
                    {heading}
                </h1>
                {text &&
                    <p className="text-lg text-muted-foreground">
                        {text}
                    </p>}
            </div>
            <Link href={`/admin/items/create`}>
                <Button className="w-2/2">Create Item</Button>
            </Link>
            {children}
        </div>
    );
}
