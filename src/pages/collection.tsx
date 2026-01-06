import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategory } from "@/api/api";
import { BASE_URL } from "@/lib/constant";
import { CollectionPageSkeleton } from "@/components/skeleton/collection-page-skeleton";


export default function CollectionPage() {
    const { categoryId } = useParams<{ categoryId: string }>();

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
        queryKey: ["products", categoryId],
        queryFn: () => getProducts(categoryId!),
        enabled: !!categoryId,
    });

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

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 h-full">
                    <div className="custom-container h-full flex flex-col justify-center text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            {category.name}
                        </h1>

                        <p className="mt-2 md:mt-4 text-sm sm:text-base text-white/90 max-w-2xl">
                            {category.small_description}
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= Product Grid ================= */}
            <section>
                <div className="custom-container">
                    <div className="mb-10">
                        <h2 className="text-xl md:text-2xl font-semibold">
                            Available Designs
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Exclusive access for authorized partners
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <p className="text-muted-foreground">
                            No products available in this collection.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/shop/${categoryId}/${product.id}`}
                                >
                                    <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all">
                                        <div className="relative h-[250px] md:h-[300px] overflow-hidden">
                                            <img
                                                src={
                                                    product.thumb_image
                                                        ? `${BASE_URL}/image/${product.thumb_image}`
                                                        : "https://via.placeholder.com/400x600"
                                                }
                                                alt={product.product_name}
                                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg line-clamp-1">
                                                {product.product_name}
                                            </h3>

                                            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                                                {product.short_description}
                                            </p>

                                            <Button
                                                variant="outline"
                                                className="mt-4 w-full group-hover:bg-[#d1af5d] group-hover:text-black transition-all"
                                            >
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
