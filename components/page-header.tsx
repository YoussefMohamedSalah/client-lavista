import { Button } from "./ui/button";
import Link from "next/link";

interface PageHeaderProps {
    heading: string;
    text?: string;
    btnText?: string;
    btnHref?: string;
    children?: React.ReactNode;
}

export function PageHeader({
    heading,
    text,
    btnText,
    btnHref,
    children
}: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between px-1">
            <div>
                <h1 className="font-heading text-2xl md:text-4xl">
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
