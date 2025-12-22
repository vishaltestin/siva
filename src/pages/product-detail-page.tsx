
"use client";
import ProductDetail from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailProps } from "@/helper/getProducts";
import { Link } from "react-router-dom";

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Hand Embroidered Kurta Set",
        price: "₹5,999",
        image: "https://www.sivafashions.com/wp-content/uploads/2022/12/anarkali.jpg",
    },
    {
        id: 2,
        title: "Designer Anarkali Suit",
        price: "₹8,499",
        image: "https://www.sivafashions.com/wp-content/uploads/2022/12/drape-saree.jpg",
    },
    {
        id: 3,
        title: "Festive Lehenga Set",
        price: "₹12,999",
        image: "https://www.sivafashions.com/wp-content/uploads/2022/12/Gowns.jpg",
    },
    {
        id: 4,
        title: "Classic Silk Saree",
        price: "₹9,299",
        image: "https://www.sivafashions.com/wp-content/uploads/2022/12/lehenga.jpg",
    },
];
const initialProducts: ProductDetailProps[] = [
    {
        id: "1",
        name: "Elegant Silk Saree",
        code: "SK1234",
        description: `
      <p>
        A beautiful hand-woven silk saree with delicate patterns and a lustrous sheen.
        The intricate zari border adds an elegant touch, making it perfect for special occasions.
      </p>
    `,
        media: [
            { type: "image", src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_8_.jpg?w=800" },
            { type: "image", src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_3_.jpg?w=800" },
            { type: "image", src: "https://staticm247.kalkifashion.com/media/catalog/product/p/i/pink_khaddi_georgette_saree_with_gotta_patti_border-sg262849_6_.jpg?w=800" },
        ],
        sizeOptions: [
            { size: "S", price: 4999 },
            { size: "M", price: 4999 },
            { size: "L", price: 5499 },
            { size: "XL", price: 5499 },
        ],

        // WHOLESALE INFO
        wholesalePrice: 3799,
        moq: 10,
        deliveryTimeline: "15–20 working days",
        fabricDetails: "Pure Khaddi Georgette Silk",
        embroideryDetails: "Hand Gotta Patti with Zari Border",
    },
];


function DetailPage() {
    const products = initialProducts;
    return (
        <>
            <section className="relative h-[180px] sm:h-[200px] md:h-[230px] w-full">
                {/* Background Image */}
                <img
                    src="https://www.sivafashions.com/wp-content/uploads/2024/03/breadcrumbs-woo.jpg"
                    alt="Banner"
                    className="absolute inset-0 h-full w-full object-cover object-[60%] sm:object-center md:object-left"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Boxed container */}
                <div className="relative z-10 h-full">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            Vrindas
                        </h1>

                        <p className="mt-2 md:mt-4 text-sm sm:text-base text-white/90 max-w-[250px] sm:max-w-md md:max-w-2xl">
                            Inspired by devotion, elegance, and handcrafted artistry.
                        </p>
                    </div>
                </div>
            </section>


            <section>
                {/* Light background to separate section */}
                <div className="w-full bg-slate-50 py-12">
                    {/* Centered big container */}
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <div className="space-y-12">
                            {products.map((product) => (
                                <ProductDetail key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                {/* Outer fluid background */}
                <div className="w-full bg-slate-50 py-12">
                    {/* Inner boxed container */}
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <div className="mb-10 text-center">
                            <h2 className="text-2xl font-semibold">Related Products</h2>
                            <p className="text-muted-foreground mt-1">
                                Exclusive access for authorized partners
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {MOCK_PRODUCTS.map((product) => (
                                <Link key={product.id} to={`/shop/vrindas/${product.id}`}>
                                    <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all bg-white">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg line-clamp-1">
                                                {product.title}
                                            </h3>

                                            <p className="text-[#d1af5d] font-bold mt-1">
                                                {product.price}
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
                    </div>
                </div>
            </section>

        </>
    );
}

export default DetailPage;