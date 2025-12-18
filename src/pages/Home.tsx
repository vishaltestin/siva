import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    image: "/images/ban1.png",
    title: "New Rasa Luxe Collection",
    subtitle: "Timeless elegance for every occasion",
  },
  {
    image: "/images/ban2.png",
    title: "Vrindas Special Edit",
    subtitle: "Crafted with devotion & detail",
  },
  {
    image: "/images/ban3.png",
    title: "Festive Essentials",
    subtitle: "Grace that speaks tradition",
  },
];


const collections = [
  {
    id: 1,
    title: "Rasa Luxe",
    subtitle: "Luxury handcrafted ensembles",
    image: "https://www.sivafashions.com/wp-content/uploads/2022/12/anarkali.jpg",
    slug: "rasa-luxe",
  },
  {
    id: 2,
    title: "Vrindas",
    subtitle: "Inspired by devotion & grace",
    image: "https://www.sivafashions.com/wp-content/uploads/2022/12/drape-saree.jpg",
    slug: "vrindas",
  },
  {
    id: 3,
    title: "Shyama Sundari",
    subtitle: "Traditional elegance redefined",
    image: "https://www.sivafashions.com/wp-content/uploads/2022/12/Gowns.jpg",
    slug: "shyama-sundari",
  },
  {
    id: 4,
    title: "Ladli",
    subtitle: "Festive silhouettes",
    image: "https://www.sivafashions.com/wp-content/uploads/2022/12/lehenga.jpg",
    slug: "ladli",
  },
  {
    id: 5,
    title: "Ladli",
    subtitle: "Festive silhouettes",
    image: "https://www.sivafashions.com/wp-content/uploads/2022/12/lehenga.jpg",
    slug: "ladli",
  },
];

export default function Home() {
  return (
    <div className="space-y-20 mb-10">
      <section className="relative mt-1">
        <Carousel className="w-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                  height={200}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* ================= Products ================= */}
      <section className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Featured Collections</h2>
          <p className="text-muted-foreground mt-2">
            Handpicked designs crafted with love
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {collections.map((collection) => (
              <CarouselItem
                key={collection.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="group relative h-[420px] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all">
                  {/* Image */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold tracking-wide">
                      {collection.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {collection.subtitle}
                    </p>

                    <Link to={`/shop/${collection.slug}`}>
                      <Button
                        variant="outline"
                        className=" mt-4 w-fit border-white text-black hover:bg-[#d1af5d] hover:text-black hover:border-[#d1af5d]"
                      >
                        Explore Collection
                      </Button>
                    </Link>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>

      </section>

    </div>
  );
}
