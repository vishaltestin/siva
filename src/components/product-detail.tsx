import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductZoomImage } from "./product-zoom-image";
import { ProductVideo } from "./product-video";
import { EnquiryForm } from "./enquiry-form";
import { ProductDetailProps } from "@/helper/getProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetail({
  id,
  name,
  code,
  description,
  media,
  sizeOptions,
}: // specifications,
ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${name} (Code: ${code}) in size ${selectedSize.size}`
    );
    window.open(`https://wa.me/919619521254?text=${message}`, "_blank");
  };

  return (
    <div className="container mx-auto py-8 product-detail" id={`product${id}`}>
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left Column - Media Gallery */}
        <div className="lg:col-span-3 flex md:flex-row md:items-start md:justify-start flex-col-reverse items-center justify-center gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col flex-wrap gap-2">
            {/* Mobile Carousel */}
            <div className="md:hidden w-full mb-4">
              <Carousel>
                <CarouselContent>
                  {media.map((item, index) => (
                    <CarouselItem key={index} className=" basis-1/4">
                      <button
                        onClick={() => setSelectedMediaIndex(index)}
                        className="relative aspect-square w-full overflow-hidden rounded-lg"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover md:object-contain"
                            style={{
                              filter:
                                selectedMediaIndex === index
                                  ? "brightness(40%)"
                                  : "none",
                            }}
                          />
                        ) : (
                          <video
                            src={item.src}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>

            {/* Desktop Thumbnails */}
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedMediaIndex(index)}
                className={`relative aspect-square w-[8rem] flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                  selectedMediaIndex === index
                    ? "border-transparent"
                    : "border-transparent"
                } hidden md:block`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                    style={{
                      filter:
                        selectedMediaIndex === index
                          ? "brightness(40%)"
                          : "none",
                    }}
                  />
                ) : (
                  <video
                    src={item.src}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Main Image/Video */}
          <div className="flex-grow">
            <div className="aspect-[3/4] w-full">
              {media[selectedMediaIndex].type === "image" ? (
                <ProductZoomImage
                  src={media[selectedMediaIndex].src}
                  alt={name}
                  width={"600"}
                  height={"800"}
                  // className="w-full h-full"
                />
              ) : (
                <ProductVideo
                  src={media[selectedMediaIndex].src}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <Card className="sm:p-6 pt-0 lg:col-span-2 space-y-6 shadow-none border-0 card-detail">
          <div>
            <h1 className="text-3xl">{name}</h1>
            <p className="text-muted-foreground text-sm">
              Product Code: {code}
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: description as string,
            }}
            className="product-description-div"
          ></div>
          {/* <p className="text-[.975rem]">{description}</p> */}

          <div className="space-y-2">
            <p className="text-[26px] font-normal">
              Total: ₹{(selectedSize.price * quantity).toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-[0.975rem] font-medium w-20">Size:</label>
              <div className="flex gap-2">
                {sizeOptions.map((option) => (
                  <Button
                    key={option.size}
                    variant={
                      selectedSize.size === option.size ? "black" : "outline"
                    }
                    className="w-12 h-12"
                    onClick={() => setSelectedSize(option)}
                  >
                    {option.size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[0.975rem] font-medium w-20">
                Quantity:
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleWhatsAppEnquiry}
              className="bg-transparent hover:bg-[#3af15d] w-1/2 h-[50px] text-[#000] text-[16px] hover:text-white wp-btn"
              style={{ border: "1px solid #3af15d" }}
            >
              <img src="/images/ws.svg" alt="" className="w-[10%]" />
              WhatsApp
            </Button>
            <Button
              onClick={() => setShowEnquiryForm(true)}
              variant="black"
              className="w-1/2 h-[50px] text-white text-[16px] enquire-btn"
            >
              Enquire Now
            </Button>
          </div>
          {/* <div className="pt-5">
            <h3 className="text-lg font-semibold">Product Specification</h3>

            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {specifications.map((spec, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-[1rem] font-light py-3">
                    {spec.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: spec.content as string,
                      }}
                      className="text-[0.975rem] font-light"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div> */}
        </Card>
      </div>

      <EnquiryForm
        open={showEnquiryForm}
        onOpenChange={setShowEnquiryForm}
        productName={name}
        productCode={code}
        quantity={quantity}
      />
    </div>
  );
}
