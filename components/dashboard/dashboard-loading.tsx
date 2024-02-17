import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardLoadingSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-5">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-auto" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default DashboardLoadingSkeleton;
