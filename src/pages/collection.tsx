import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategory, getFullProducts } from "@/api/api";
import { BASE_URL } from "@/lib/constant";

import { CollectionPageSkeleton } from "@/components/skeleton/collection-page-skeleton";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CollectionPage() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [page, setPage] = useState(1);

    /* ---------------- Fetch Category ---------------- */
    const { data: categoryData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory,
    });

    const category = categoryData?.packages.find(
        (c) => c.id === categoryId
    );

    /* ---------------- Fetch Products ---------------- */
    const {
        data: productsData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", categoryId, page],
        queryFn: () => getFullProducts(categoryId!, page),
        enabled: !!categoryId,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);
    if (!category) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold">Collection Not Found</h1>
                <p className="mt-2 text-muted-foreground">
                    This collection does not exist.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return <CollectionPageSkeleton />;
    }

    if (isError) {
        return (
            <div className="custom-container py-20 text-center">
                Failed to load products
            </div>
        );
    }

    const products = productsData?.packages ?? [];
    const pagination = productsData?.pagination;

    return (
        <div className="space-y-10 lg:space-y-16">
            {/* ================= Banner ================= */}
            <section className="relative h-[180px] sm:h-[200px] md:h-[230px] w-full">
                <img
                    src={
                        category.category_image
                            ? `${BASE_URL}/image/${category.category_image}`
                            : "https://via.placeholder.com/1200x400"
                    }
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 h-full">
                    <div className="custom-container h-full flex flex-col justify-center text-white">
                        <div className="max-w-2xl">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                                {category.name}
                            </h1>
                            <p className="mt-2 md:mt-4 text-sm sm:text-base text-white/90 leading-relaxed">
                                {category.small_description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= Product Grid ================= */}
            <section className="custom-container">
                <div className="mb-12 lg:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Available Designs
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Exclusive access for authorized partners
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                        <p className="text-gray-500 text-lg">
                            No products available in this collection.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => {
                            const lowestPrice = product.prices?.length
                                ? Math.min(...product.prices.map((p) => Number(p.prs_price)))
                                : null;
                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full flex flex-col group"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={
                                                product.image?.pimg_simg
                                                    ? `${BASE_URL}/image/${product.image.pimg_simg}`
                                                    : `${BASE_URL}/image/${product.thumb_image}`
                                            }
                                            alt={product.product_name}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* ================= PRODUCT INFO ================= */}
                                    <div className="px-3 py-3 flex flex-col flex-grow gap-1">
                                        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                            {product.product_name}
                                        </h3>
                                        <div className="mb-1">
                                            <div className="flex items-center">
                                                {lowestPrice ? (
                                                    <>
                                                        <IndianRupee className="h-4 w-4 text-gray-700" />
                                                        <span className="text-xs font-bold text-[#494949]">
                                                            {lowestPrice.toLocaleString('en-IN')}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-500 font-medium">
                                                        Price on request
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link to={`/shop/${categoryId}/${product.id}`} className="mt-auto flex justify-start">
                                            <Button
                                                variant="outline"
                                                className="border-gray-300 px-3 py-1 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 group-hover:border-primary text-xs"
                                            >
                                                {/* <Eye className="h-4 w-4 mr-2" /> */}
                                                Explore
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {pagination && pagination.totalPages > 1 && (
                    <Pagination className="mt-12">
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: pagination.totalPages }).map((_, i) => {
                                const pageNumber = i + 1;
                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(pagination.totalPages, p + 1)
                                        )
                                    }
                                    className={
                                        page === pagination.totalPages
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </section>
        </div>
    );
}

// Updated ProductCarousel component with color badge and sizes at bottom
// interface ProductCarouselProps {
//     productImages: Array<{ pimg_simg: string }>;
//     productName: string;
//     color?: string;
//     sizes?: Array<{ prs_size: string }>;
// }

// function ProductCarousel({ productImages, productName, color, sizes }: ProductCarouselProps) {
//     const [api, setApi] = useState<CarouselApi>();
//     const [current, setCurrent] = useState(0);

//     useEffect(() => {
//         if (!api) return;
//         api.on("select", () => {
//             setCurrent(api.selectedScrollSnap());
//         });
//     }, [api]);

//     const handleDotClick = (index: number) => {
//         if (api) {
//             api.scrollTo(index);
//         }
//     };

//     return (
//         <>
//             <Carousel
//                 setApi={setApi}
//                 opts={{
//                     align: "start",
//                     loop: false,
//                 }}
//                 className="h-full"
//             >
//                 <CarouselContent>
//                     {productImages.map((img, index) => (
//                         <CarouselItem key={index}>
//                             <div className="relative aspect-square overflow-hidden">
//                                 <img
//                                     src={`${BASE_URL}/image/${img.pimg_simg}`}
//                                     alt={`${productName} - ${index + 1}`}
//                                     className="w-full"
//                                     loading="lazy"
//                                     decoding="async"
//                                 />
//                             </div>
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>

//                 {/* Color badge */}
//                 {color && (
//                     <div className="absolute top-3 right-3">
//                         <Badge
//                             className="px-1 py-[5px] text-[10px] font-medium bg-white/95 text-gray-800 border border-gray-200 hover:text-white"
//                         >
//                             {color}
//                         </Badge>
//                     </div>
//                 )}

//                 {/* Sizes at bottom (like in reference image) */}
//                 {sizes && sizes.length > 0 && (
//                     <div className="absolute bottom-0 py-2 left-0 right-0 bg-[#ffffffa8]">
//                         <div className="flex px-4 gap-2">
//                             {sizes.map((size, index) => (
//                                 <Badge
//                                     key={index}
//                                     variant="secondary"
//                                     className="px-2 py-1 text-xs font-medium bg-transparent text-[#000] border border-[#000]"
//                                 >
//                                     {size.prs_size}
//                                 </Badge>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Carousel dots for multiple images */}
//                 {productImages.length > 1 && (
//                     <div className="absolute bottom-12 left-0 right-0">
//                         <div className="flex justify-center gap-1.5">
//                             {productImages.map((_, index) => (
//                                 <button
//                                     key={index}
//                                     className={`h-2 w-2 rounded-full transition-all duration-200 focus:outline-none ${current === index
//                                         ? "bg-white scale-110"
//                                         : "bg-gray-400 hover:bg-gray-600"
//                                         }`}
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleDotClick(index);
//                                     }}
//                                     aria-label={`Go to image ${index + 1}`}
//                                     aria-current={current === index ? "true" : "false"}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </Carousel>
//         </>
//     );
// }