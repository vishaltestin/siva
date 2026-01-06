import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    getProductDetail,
    getProductImages,
    getProductPrices,
} from "@/api/api";
import { transformProductDetail } from "@/helper/transformProductDetail";
import ProductDetail from "@/components/product-detail";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product-detail", id],
        enabled: !!id,
        queryFn: async () => {
            const [detail, images, prices] = await Promise.all([
                getProductDetail(id!),
                getProductImages(id!),
                getProductPrices(id!),
            ]);

            return transformProductDetail(detail, images, prices);
        },
    });

    if (isLoading) {
        return (
            <div className="py-24 text-center text-muted-foreground">
                Loading product…
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="py-24 text-center text-red-500">
                Failed to load product
            </div>
        );
    }

    return <ProductDetail {...product} />;
}
