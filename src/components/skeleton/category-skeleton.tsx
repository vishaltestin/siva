import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
    return (
        <Card className="relative h-[300px] sm:h-[420px] rounded-2xl overflow-hidden">
            <Skeleton className="absolute inset-0 h-full w-full" />
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-40 rounded-full" />
            </div>
        </Card>
    );
}
