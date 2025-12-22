import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { NoAccessModal } from "@/components/no-access-modal";

const banners = [
  { image: "/images/ban2.png", title: "Vrindas Special Edit" },
  { image: "/images/ban3.png", title: "Festive Essentials" },
];

const collections = [
  {
    id: 1,
    title: "Rasa Luxe",
    image:
      "https://www.sivafashions.com/wp-content/uploads/2022/12/anarkali.jpg",
    slug: "rasa-luxe",
  },
  {
    id: 2,
    title: "Vrindas",
    image:
      "https://www.sivafashions.com/wp-content/uploads/2022/12/drape-saree.jpg",
    slug: "vrindas",
  },
  {
    id: 3,
    title: "Shyama Sundari",
    image:
      "https://www.sivafashions.com/wp-content/uploads/2022/12/Gowns.jpg",
    slug: "shyama-sundari",
  },
  {
    id: 4,
    title: "Ladli",
    image:
      "https://www.sivafashions.com/wp-content/uploads/2022/12/lehenga.jpg",
    slug: "ladli",
  },
];

const normalize = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNoAccess, setShowNoAccess] = useState(false);

  const handleCollectionClick = (slug: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const allowedCollections = user.collections.map(normalize);

    if (!allowedCollections.includes(slug)) {
      setShowNoAccess(true);
      return;
    }

    navigate(`/shop/${slug}`);
  };

  return (
    <div>
      {/* ================= Banner (UNCHANGED) ================= */}
      <section>
        <Carousel className="w-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden md:flex" />
          <CarouselNext className="right-4 hidden md:flex" />
        </Carousel>
      </section>

      {/* ================= Collections (BOXED) ================= */}
      <section className="w-full bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-xl md:text-3xl font-bold">
              Featured Collections
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleCollectionClick(collection.slug)}
                className="group cursor-pointer"
              >
                <Card className="relative h-[300px] sm:h-[420px] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all bg-white">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/75 transition-colors" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-end pb-6 text-center text-white px-4">
                    <h3 className="text-2xl font-bold tracking-wide">
                      {collection.title}
                    </h3>

                    <Button
                      variant="black"
                      className="mt-4 border-white text-white hover:bg-[#d1af5d] hover:text-black hover:border-[#d1af5d]"
                    >
                      Explore Collection
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= No Access Modal ================= */}
      <NoAccessModal
        open={showNoAccess}
        onClose={() => setShowNoAccess(false)}
      />
    </div>
  );
}

