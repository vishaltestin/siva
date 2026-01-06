import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CollectionPageSkeleton() {
    return (
        <div className="space-y-10 lg:space-y-16 animate-pulse">
            {/* ================= Banner Skeleton ================= */}
            <section className="relative h-[180px] sm:h-[200px] md:h-[230px] w-full">
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

                <div className="relative z-10 h-full">
                    <div className="custom-container h-full flex flex-col justify-center">
                        <Skeleton className="h-8 w-48 sm:w-64 md:w-80" />
                        <Skeleton className="h-4 w-72 sm:w-96 md:w-[500px] mt-4" />
                    </div>
                </div>
            </section>

            {/* ================= Products Skeleton ================= */}
            <section>
                <div className="custom-container">
                    <div className="mb-10">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-72 mt-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden rounded-xl shadow-sm"
                            >
                                <Skeleton className="h-[250px] md:h-[300px] w-full" />

                                <div className="p-4 space-y-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-10 w-full mt-4" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
