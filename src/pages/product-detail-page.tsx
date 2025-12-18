// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// import ProductDetail from "@/components/product-detail";
// import { ProductDetailLoader } from "@/components/loader-product";
// import {
//     ApiResponse,
//     // ProductDetailProps,
//     transformApiResponseToProductDetails,
// } from "@/helper/getProducts";

// export default function ProductDetailPage() {
//     const { collectionSlug, id } = useParams<{
//         collectionSlug: string;
//         id: string;
//     }>();

//     // 🔹 Fetch collection products
//     const fetchCollectionProducts = async () => {
//         const formData = new FormData();
//         formData.append("method", "getProduct");
//         formData.append("collection", collectionSlug!);
//         formData.append("start", "0");
//         formData.append("last", "10");

//         const { data } = await axios.post<ApiResponse>(
//             "https://www.sivafashions.com/new/api.php",
//             formData,
//             { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         return transformApiResponseToProductDetails(data);
//     };

//     const { data: products, isLoading } = useQuery({
//         queryKey: ["collection-products", collectionSlug],
//         queryFn: fetchCollectionProducts,
//     });



//     if (isLoading || !products) return <ProductDetailLoader />;

//     const selectedProduct = products.find((p) => p.id === id);
//     const remainingProducts = products.filter((p) => p.id !== id);

//     if (!selectedProduct) return <ProductDetailLoader />;

//     return (
//         <div className="space-y-16 mt-10">
//             {/* ========== SELECTED PRODUCT ========== */}
//             <ProductDetail {...selectedProduct} />

//             {/* ========== REMAINING PRODUCTS ========== */}
//             <section className="space-y-10">
//                 {remainingProducts.map((product) => (
//                     <ProductDetail key={product.id} {...product} />
//                 ))}
//             </section>
//         </div>
//     );
// }






"use client";

// import { useState } from "react";
import ProductDetail from "@/components/product-detail";
// import { Button } from "@/components/ui/button";
// import { ArrowBigDown } from "lucide-react";
import { ProductDetailProps } from "@/helper/getProducts";

const initialProducts: ProductDetailProps[] = [
    {
        id: "1",
        name: "Elegant Silk Saree",
        code: "SK1234",
        description:
            "A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen. The intricate zari border adds an elegant touch, making it perfect for special occasions.",
        media: [
            {
                type: "image",
                src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_8_.jpg?w=800",
            },
            {
                type: "image",
                src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_3_.jpg?w=800",
            },
            {
                type: "image",
                src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_6_.jpg?w=800",
            },
        ],
        sizeOptions: [
            { size: "S", price: 4999 },
            { size: "M", price: 4999 },
            { size: "L", price: 5499 },
            { size: "XL", price: 5499 },
        ],
        //     specifications: [
        //         {
        //             title: "Product Detail",
        //             content: ` <h1 class="product-title">Dreamy Pink Saree</h1>
        // <div class="product-detail"><strong>Style No:</strong> SG262849</div>
        // <div class="product-detail"><strong>Design No:</strong> J004PF1386Y</div>
        // <div class="product-detail"><strong>Color:</strong> Pink</div>
        // <div class="product-detail"><strong>Fabric:</strong> Georgette</div>
        // <div class="product-detail"><strong>Work:</strong> Gotta</div>
        // <div class="product-detail"><strong>Pack Contains:</strong> 1 saree and 1 unstitched blouse fabric</div>
        // <div class="product-detail"><strong>Dimensions:</strong></div>
        // <ul>
        //     <li>Length: 5.5 metres plus 0.8 metre blouse piece (approx.)</li>
        //     <li>Width: 1.10 metres</li>
        // </ul>
        // <div class="product-detail"><strong>Manufactured / Packed by:</strong> Suarabhakti Goods Pvt Ltd</div>
        // <p class="note">There may be slight color variation depending on the screen one is looking through and once you receive the product.</p>
        // <p class="product-detail"><strong>Inclusive of all taxes</strong></p>`,
        //         },
        //         {
        //             title: "Style & Fit Tips",
        //             content: `<div class="style-tips">
        //     <h2>Style Tips:</h2>
        //     <p>Go for a dainty necklace and earchain along with mathapatti.</p>
        // </div>
        // <div class="fit-tips">
        //     <h2>Fit Tips:</h2>
        //     <p>The shoulder straps should be the right length and not too tight or too loose.</p>
        // </div>`,
        //         },
        //         {
        //             title: "Care Instructions",
        //             content:
        //                 "<ul><li>Dry clean only</li><li>Store in a cool, dry place</li><li>Avoid direct sunlight</li></ul>",
        //         },
        //     ],
    },
    // {
    //     id: "2",
    //     name: "Classic Banarasi Saree",
    //     code: "BN5678",
    //     description:
    //         "A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen. The intricate zari border adds an elegant touch, making it perfect for special occasions.",
    //     media: [
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/c/r/cream_white_full_sleeves_blouse_in_satin_with_roundish_v_neckline-sg147476_2_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/c/r/cream_white_full_sleeves_blouse_in_satin_with_roundish_v_neckline-sg147476_4_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/c/r/cream_white_full_sleeves_blouse_in_satin_with_roundish_v_neckline-sg147476_4_.jpg?w=800",
    //         },
    //     ],
    //     sizeOptions: [
    //         { size: "S", price: 5999 },
    //         { size: "M", price: 5999 },
    //         { size: "L", price: 6499 },
    //         { size: "XL", price: 6499 },
    //     ],
    //     // specifications: [
    //     //     { title: "Material", content: "Banarasi Silk" },
    //     //     { title: "Length", content: "6 meters" },
    //     //     { title: "Care Instructions", content: "Dry clean only" },
    //     // ],
    // },
    // {
    //     id: "3",
    //     name: "Classic Banarasi Saree",
    //     code: "BN5678",
    //     description:
    //         "A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen. The intricate zari border adds an elegant touch, making it perfect for special occasions.",
    //     media: [
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_and_orange_bandhani_printed_jacket_palazzo_suit-sg257481_6_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_and_orange_bandhani_printed_jacket_palazzo_suit-sg257481_5_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_and_orange_bandhani_printed_jacket_palazzo_suit-sg257481_8_.jpg?w=800",
    //         },
    //     ],
    //     sizeOptions: [
    //         { size: "S", price: 2999 },
    //         { size: "M", price: 3999 },
    //         { size: "L", price: 4499 },
    //         { size: "XL", price: 5499 },
    //     ],
    //     // specifications: [
    //     //     { title: "Material", content: "Banarasi Silk" },
    //     //     { title: "Length", content: "6 meters" },
    //     //     { title: "Care Instructions", content: "Dry clean only" },
    //     // ],
    // },

    // {
    //     id: "4",
    //     name: "Classic Banarasi Saree",
    //     code: "BN5678",
    //     description:
    //         "A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen. The intricate zari border adds an elegant touch, making it perfect for special occasions.",
    //     media: [
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/b/l/black_embroidered_georgette_lehenga_choli_with_dupatta-sg257457_6_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/b/l/black_embroidered_georgette_lehenga_choli_with_dupatta-sg257457_4_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/b/l/black_embroidered_georgette_lehenga_choli_with_dupatta-sg257457_5_.jpg?w=800",
    //         },
    //     ],
    //     sizeOptions: [
    //         { size: "S", price: 2999 },
    //         { size: "M", price: 3999 },
    //         { size: "L", price: 4499 },
    //         { size: "XL", price: 5499 },
    //     ],
    //     // specifications: [
    //     //     { title: "Material", content: "Banarasi Silk" },
    //     //     { title: "Length", content: "6 meters" },
    //     //     { title: "Care Instructions", content: "Dry clean only" },
    //     // ],
    // },

    // {
    //     id: "5",
    //     name: "Classic Banarasi Saree",
    //     code: "BN5678",
    //     description:
    //         "A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen. The intricate zari border adds an elegant touch, making it perfect for special occasions.",
    //     media: [
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/g/r/green_hand_embroidered_choli_with_bandhani_print_lehenga_and-sg270802_5_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/g/r/green_hand_embroidered_choli_with_bandhani_print_lehenga_and-sg270802_4_.jpg?w=800",
    //         },
    //         {
    //             type: "image",
    //             src: "https://staticm247.kalkifashion.com/media/catalog/product/g/r/green_hand_embroidered_choli_with_bandhani_print_lehenga_and-sg270802_7_.jpg?w=800",
    //         },
    //     ],
    //     sizeOptions: [
    //         { size: "S", price: 2999 },
    //         { size: "M", price: 3999 },
    //         { size: "L", price: 4499 },
    //         { size: "XL", price: 5499 },
    //     ],
    //     // specifications: [
    //     //     { title: "Material", content: "Banarasi Silk" },
    //     //     { title: "Length", content: "6 meters" },
    //     //     { title: "Care Instructions", content: "Dry clean only" },
    //     // ],
    // },
];

function Home() {
    // const [products, setProducts] =
    //     useState<ProductDetailProps[]>(initialProducts);
    const products = initialProducts;
    // const [isLoading, setIsLoading] = useState(false);

    // const handleLoadMore = async () => {
    //     setIsLoading(true);

    //     // Simulating an API call
    //     await new Promise((resolve) => setTimeout(resolve, 1000));

    //     // In a real scenario, you would fetch new products from an API
    //     // For now, we'll just duplicate the existing products
    //     const newProducts = products.map((product) => ({
    //         ...product,
    //         id: (parseInt(product.id) + products.length).toString(),
    //         name: `${product.name} ${parseInt(product.id) + products.length}`,
    //         code: `${product.code.slice(0, 2)}${parseInt(product.code.slice(2)) + products.length
    //             }`,
    //     }));

    //     setProducts([...products, ...newProducts]);
    //     setIsLoading(false);
    // };

    return (
        <div className="space-y-12 mt-10">
            {products.map((product) => (
                <ProductDetail key={product.id} {...product} />
            ))}
            {/* <div className="flex justify-center mt-8">
                <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    // variant={"black"}
                    className="px-6 py-6 text-lg mb-10 text-black bg-transparent"
                    style={{ border: "1px solid rgb(209 175 93" }}
                >
                    {isLoading ? "Loading..." : "Load More"}

                    <ArrowBigDown />
                </Button>
            </div> */}
        </div>
    );
}

export default Home;