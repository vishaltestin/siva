import { ApiImageFull, ApiPrice, ProductDetailProps } from "@/@types/product";
import { BASE_URL } from "@/lib/constant";

export function transformProductDetail(
    productRes: any,
    imageRes: any,
    priceRes: any
): ProductDetailProps {
    const product = productRes?.packages?.[0];

    if (!product) {
        throw new Error("Product not found");
    }

    const mediaSet = new Set<string>();

    // 1️⃣ Images coming directly from product detail
    if (product.big_image) {
        mediaSet.add(`${BASE_URL}image/${product.big_image}`);
    }

    if (product.thumb_image) {
        mediaSet.add(`${BASE_URL}image/${product.thumb_image}`);
    }

    // 2️⃣ Images coming from product image API
    if (imageRes?.Image?.length > 0) {
        imageRes.Image.forEach((img: ApiImageFull) => {
            if (img?.pimg_simg) {
                mediaSet.add(`${BASE_URL}image/${img.pimg_simg}`);
            }
        });
    }

    // 3️⃣ Convert to media array
    const media =
        mediaSet.size > 0
            ? Array.from(mediaSet).map((src) => ({
                type: "image" as const,
                src,
            }))
            : [
                {
                    type: "image" as const,
                    src: "/images/placeholder.jpg",
                },
            ];

    const sizeOptions =
        priceRes?.Price?.length > 0
            ? priceRes.Price.map((p: ApiPrice) => ({
                size: p.prs_size,
                price: Number(p.prs_price),
            }))
            : [{ size: "M", price: 0 }];

    return {
        id: product.id,
        name: product.product_name,
        code: product.product_code,
        description: product.product_description,
        brochure: product.brochure,
        media,
        sizeOptions,

        wholesalePrice: sizeOptions[0]?.price,
        moq: 10,
        deliveryTimeline: "15–20 working days",
        fabricDetails: product.fabric,
        embroideryDetails: product.work,
    };
}
