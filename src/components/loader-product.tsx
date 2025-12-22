import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProductDetailLoader() {
  return (
    <div className="container mx-auto py-8 product-detail-loader">
      <div className="grid md:grid-cols-5 gap-8">
        
        <div className="lg:col-span-3 flex md:flex-row md:items-start md:justify-start flex-col-reverse items-center justify-center gap-4">
          {/* Thumbnails Loader */}
          <div className="flex md:flex-col flex-wrap gap-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-[8rem] h-[8rem] rounded-lg" />
            ))}
          </div>

          {/* Main Image/Video Loader */}
          <div className="flex-grow">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          </div>
        </div>

        {/* Right Column - Product Details Loader */}
        <Card className="sm:p-6 pt-0 lg:col-span-2 space-y-6 shadow-none border-0 card-detail">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <Skeleton className="h-20 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-8 w-1/3" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-20" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-12 h-12 rounded-md" />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-10 h-10 rounded-md" />
                <Skeleton className="w-12 h-10" />
                <Skeleton className="w-10 h-10 rounded-md" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-[50px] w-1/2 rounded-md" />
            <Skeleton className="h-[50px] w-1/2 rounded-md" />
          </div>

          <div className="pt-5">
            <Skeleton className="h-6 w-1/3 mb-4" />
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
