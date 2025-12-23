"use client";

import { useState } from "react";
import { Plus, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductZoomImage } from "./product-zoom-image";
import { ProductVideo } from "./product-video";
import { EnquiryForm } from "./enquiry-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductDetailProps } from "@/helper/getProducts";

export default function ProductDetail({
  id,
  name,
  code,
  description,
  media,
  sizeOptions,
  moq,
  wholesalePrice,
  deliveryTimeline,
  fabricDetails,
  embroideryDetails,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  // const [quantity, setQuantity] = useState(moq);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${name} (Code: ${code})
Size: ${selectedSize.size}`
    );
    window.open(`https://wa.me/919619521254?text=${message}`, "_blank");
  };

  return (
    <div
      className="container mx-auto px-4 md:px-6 lg:px-8 py-8"
      id={`product-${id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* MEDIA */}
        <div className="lg:col-span-3 flex flex-col lg:flex-row gap-4">
          {/* THUMBNAILS */}
          <div className="flex lg:flex-col gap-2">
            <div className="md:hidden w-full">
              <Carousel>
                <CarouselContent>
                  {media.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                      <button
                        onClick={() => setSelectedMediaIndex(index)}
                        className="aspect-square w-full overflow-hidden rounded-lg"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.src}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video src={item.src} />
                        )}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>

            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedMediaIndex(index)}
                className="hidden md:block w-28 aspect-square overflow-hidden rounded-lg"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video src={item.src} />
                )}
              </button>
            ))}
          </div>

          {/* MAIN MEDIA */}
          <div className="flex-grow">
            <div className="aspect-[3/4] w-full">
              {media[selectedMediaIndex].type === "image" ? (
                <ProductZoomImage
                  src={media[selectedMediaIndex].src}
                  alt={name}
                  width="600"
                  height="800"
                />
              ) : (
                <ProductVideo src={media[selectedMediaIndex].src} />
              )}
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <Card className="lg:col-span-2 border-0 shadow-none space-y-6 bg-transparent">
          <div>
            <h1 className="text-3xl font-semibold">{name}</h1>
            <p className="text-sm text-muted-foreground">
              SKU Code: {code}
            </p>
          </div>

          <div
            className="product-description-div"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* FABRIC */}
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Fabric:</span> {fabricDetails}
            </p>
            <p>
              <span className="font-medium">Embroidery:</span>{" "}
              {embroideryDetails}
            </p>
          </div>

          {/* MOQ & DELIVERY */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <p> <span className="font-medium">Wholesale Price:</span>{" "} ₹{wholesalePrice?.toLocaleString()} / piece </p>
            <p>
              <span className="font-medium">MOQ:</span> {moq} pieces
            </p>
            <p>
              <span className="font-medium">Delivery:</span>{" "}
              {deliveryTimeline}
            </p>
          </div>

          {/* SIZE */}
          <div className="flex gap-4 items-center">
            <span className="w-20 text-sm font-medium">Available Size:</span>
            {sizeOptions.map((opt) => (
              <Button
                key={opt.size}
                variant={
                  selectedSize.size === opt.size ? "black" : "outline"
                }
                className="w-12 h-12"
                onClick={() => setSelectedSize(opt)}
              >
                {opt.size}
              </Button>
            ))}
          </div>

          {/* QUANTITY */}
          {/* <div className="flex gap-4 items-center">
            <span className="w-20 text-sm font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  setQuantity((q) => Math.max(moq, q - 1))
                }
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

          {/* ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={handleWhatsAppEnquiry}
              className="w-full h-[50px] bg-transparent border border-[#3af15d] text-black hover:bg-[#3af15d] hover:text-white"
            >

              <img src="/images/whatsapp.png" alt="" className="max-h-full w-5"/>

              WhatsApp Enquiry
            </Button>

            <Button
              variant="black"
              className="w-full h-[50px]"
              onClick={() => setShowEnquiryForm(true)}
            >
              Enquire Now
            </Button>

            <Button
              variant="outline"
              className="
    w-full h-[50px] md:col-span-2
    border-[#d1af5d]/60 text-slate-800
    hover:bg-[#d1af5d] hover:text-white
    transition-all duration-200
    flex items-center justify-center gap-2
    font-medium
  "
              onClick={() =>
                window.open("/catalogs/vrindas-wholesale.pdf", "_blank")
              }
            >
              <Download className="h-4 w-4" />
              Download Product Catalog (PDF)
            </Button>
          </div>
        </Card>
      </div>

      <EnquiryForm
        open={showEnquiryForm}
        onOpenChange={setShowEnquiryForm}
        productName={name}
        productCode={code}
        // quantity={quantity}
      />
    </div>
  );
}
