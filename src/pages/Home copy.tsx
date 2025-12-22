import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowBigDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductDetailLoader } from "@/components/loader-product";
import ProductDetail from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import {
  ApiResponse,
  ProductDetailProps,
  transformApiResponseToProductDetails,
} from "@/helper/getProducts";

const PRODUCTS_PER_PAGE = 3;

export default function Home() {
  const [totalProducts, setTotalProducts] = useState<ProductDetailProps[]>([]);
  const [IsProcessingMoreProducts, setIsProcessingMoreProducts] =
    useState<boolean>(false);
  const [productOffset, setProductOffset] = useState<number>(PRODUCTS_PER_PAGE);
  const [productCount, setProductCount] = useState<number>(0);
  const lastProductRef = useRef<HTMLDivElement>(null);

  const formData = useMemo(() => {
    const bodyFormData = new FormData();
    bodyFormData.append("method", "getProduct");
    bodyFormData.append("start", (productOffset - 3).toString());
    bodyFormData.append("last", productOffset.toString());

    const object = {};
    bodyFormData.forEach((value, key) => {
      // @ts-expect-error any
      object[key] = value;
    });

    return JSON.stringify(object);
  }, [productOffset]);

  const fetchProduct = async (formData: FormData) => {
    try {
      const { data } = await axios.post<ApiResponse>(
        `https://www.sivafashions.com/new/api.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTotalProducts((prevProduct) => [
        ...prevProduct,
        ...transformApiResponseToProductDetails(data),
      ]);
      setProductCount(data.total);
      setIsProcessingMoreProducts(false);
      return {};
    } catch (error) {
      setIsProcessingMoreProducts(false);
      console.error(error);
      throw error;
    }
  };

  const { isLoading: isProductLoading, error: IsProductFetchError } = useQuery({
    queryKey: ["getProducts", formData],
    queryFn: () => fetchProduct(JSON.parse(formData)),
    refetchOnWindowFocus: false,
  });

  const handleLoadMoreProducts = async () => {
    setIsProcessingMoreProducts(true);
    setProductOffset((prevOffset) => prevOffset + 3);
  };

  useEffect(() => {
    if (!IsProcessingMoreProducts && lastProductRef.current) {
      lastProductRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [totalProducts, IsProcessingMoreProducts]);

  if (isProductLoading) return <ProductDetailLoader />;
  if (IsProductFetchError) return <ProductDetailLoader />;

  return (
    <div className="space-y-12 mt-10">
      {totalProducts?.map((product, index) => (
        <div
          key={product.id}
          ref={
            index === totalProducts.length - PRODUCTS_PER_PAGE
              ? lastProductRef
              : null
          }
        >
          <ProductDetail {...product} />
        </div>
      ))}
      {!(productCount === totalProducts.length) && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMoreProducts}
            disabled={IsProcessingMoreProducts}
            className="px-6 py-6 text-lg mb-10 text-black bg-transparent hover:bg-gray-100 transition-colors"
            style={{ border: "1px solid rgb(209, 175, 93)" }}
          >
            {IsProcessingMoreProducts ? "Loading..." : "Load More"}
            <ArrowBigDown className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
