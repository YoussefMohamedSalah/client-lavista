import { Button } from "../ui/button";
import Link from "next/link";

interface PageHeaderProps {
    heading: string;
    text?: string;
    btnText?: string;
    btnHref?: string;
    children?: React.ReactNode;
}

export function ItemsFilters({
    heading,
    text,
    btnText,
    btnHref,
    children
}: PageHeaderProps) {
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
            {children}
            {btnHref && (
                <Link href={`${btnHref}`}>
                    <Button className="w-2/2">{btnText}</Button>
                </Link>
            )}
        </div>
    );
}
