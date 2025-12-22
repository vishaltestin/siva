import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COLLECTIONS: Record<
    string,
    { title: string; description: string; banner: string }
> = {
    "rasa-luxe": {
        title: "Rasa Luxe",
        description:
            "An exclusive luxury collection crafted with intricate detailing and timeless silhouettes.",
        banner:
            "https://www.sivafashions.com/wp-content/uploads/2024/03/breadcrumbs-woo.jpg",
    },
    vrindas: {
        title: "Vrindas",
        description:
            "Inspired by devotion, elegance, and handcrafted artistry.",
        banner:
            "https://www.sivafashions.com/wp-content/uploads/2024/03/breadcrumbs-woo.jpg",
    },
    "shyama-sundari": {
        title: "Shyama Sundari",
        description:
            "A celebration of traditional beauty blended with modern finesse.",
        banner:
            "https://www.sivafashions.com/wp-content/uploads/2024/03/breadcrumbs-woo.jpg",
    },
    ladli: {
        title: "Ladli",
        description:
            "Festive silhouettes designed to make every moment special.",
        banner:
            "https://www.sivafashions.com/wp-content/uploads/2024/03/breadcrumbs-woo.jpg",
    },
};

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Hand Embroidered Kurta Set",
        price: "₹5,999",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/12/anarkali.jpg",
    },
    {
        id: 2,
        title: "Designer Anarkali Suit",
        price: "₹8,499",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/12/drape-saree.jpg",
    },
    {
        id: 3,
        title: "Festive Lehenga Set",
        price: "₹12,999",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/12/Gowns.jpg",
    },
    {
        id: 4,
        title: "Classic Silk Saree",
        price: "₹9,299",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/12/lehenga.jpg",
    },
    {
        id: 5,
        title: "Designer Anarkali Suit",
        price: "₹8,499",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/11/cat-04.jpg",
    },
    {
        id: 6,
        title: "Festive Lehenga Set",
        price: "₹12,999",
        image:
            "https://www.sivafashions.com/wp-content/uploads/2022/12/Gowns.jpg",
    },
];

export default function CollectionPage() {
    const { slug } = useParams<{ slug: string }>();
    const collection = slug ? COLLECTIONS[slug] : null;

    if (!collection) {
        return (
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 text-center">
                <h1 className="text-3xl font-bold">Collection Not Found</h1>
                <p className="mt-2 text-muted-foreground">
                    This collection does not exist.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-10 lg:space-y-16">
            {/* ================= Banner ================= */}

            <section className="relative h-[180px] sm:h-[200px] md:h-[230px] w-full">
                {/* Background Image */}
                <img
                    src={collection.banner}
                    alt={collection.title}
                    className="absolute inset-0 h-full w-full object-cover object-[60%] md:object-left"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Boxed container */}
                <div className="relative z-10 h-full">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            {collection.title}
                        </h1>

                        <p className="mt-2 md:mt-4 text-sm sm:text-base text-white/90 max-w-[250px] sm:max-w-md md:max-w-2xl">
                            {collection.description}
                        </p>
                    </div>
                </div>
            </section>
            {/* ================= Product Grid ================= */}
            <section>
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="mb-10">
                        <h2 className="text-xl md:text-2xl font-semibold">
                            Available Designs
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Exclusive access for authorized partners
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
                        {MOCK_PRODUCTS.map((product) => (
                            <Link key={product.id} to={`/shop/${slug}/${product.id}`}>
                                <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all">
                                    <div className="relative h-[250px] md:h-[300px] overflow-hidden">
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
            </section>
        </div>
    );
}

