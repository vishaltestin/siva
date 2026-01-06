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
import { NoAccessModal } from "@/components/no-access-modal";
import { getCategory } from "@/api/api";
import { CategorySkeleton } from "@/components/skeleton/category-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "@/lib/constant";
import { Category } from "@/@types/types";

const banners = [
  { image: "/images/ban2.png", title: "Vrindas Special Edit" },
  { image: "/images/ban3.png", title: "Festive Essentials" },
];

// const normalize = (value: string) =>
//   value.toLowerCase().replace(/\s+/g, "-");

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNoAccess, setShowNoAccess] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const collections = data?.packages ?? [];

  const handleCollectionClick = (collection: Category) => {
    if (!user) {
      navigate("/login", {
        state: { from: `/shop/${collection.id}` },
      });
      return;
    }

    if (collection.user_id !== user.user_id) {
      setShowNoAccess(true);
      return;
    }

    navigate(`/shop/${collection.id}`);
  };



  return (
    <div>
      {/* ================= Banner ================= */}
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

      {/* ================= Collections ================= */}
      <section className="w-full bg-slate-50 py-16">
        <div className="custom-container">
          <div className="mb-10 text-center">
            <h2 className="text-xl md:text-3xl font-bold">
              Featured Collections
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
              : collections.map((collection) => (
                <div
                  key={collection.id}
                  onClick={() =>
                    handleCollectionClick(collection)
                  }
                  className="group cursor-pointer"
                >
                  <Card className="relative h-[300px] sm:h-[420px] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all bg-white">
                    <img
                      src={
                        collection.category_image
                          ? `${BASE_URL}/image/${collection.category_image}`
                          : "https://via.placeholder.com/400x600?text=Collection"
                      }
                      alt={collection.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/75 transition-colors" />

                    <div className="relative z-10 flex h-full flex-col items-center justify-end pb-6 text-center text-white px-4">
                      <h3 className="text-2xl font-bold tracking-wide">
                        {collection.name}
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
