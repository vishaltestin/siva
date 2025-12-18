export interface ApiResponse {
    product: ApiProduct[];
    Image: ApiImage[];
    Price: ApiPrice[];
    status: string;
    message: string;
    total: number;
}
interface ApiProduct {
    id: string;
    product_name: string;
    product_code: string;
    product_description: string;
    // style_no: string;
    // design_no: string;
    // color: string;
    // fabric: string;
    // work: string;
    // notes: string;
    // product_specs: string;
    // style_fit_tips: string;
    // care_instructions: string;
}

interface ApiImage {
    id: string;
    pimg_pid: string;
    pimg_bimg: string;
}

interface ApiPrice {
    id: string;
    prs_pid: string;
    prs_size: string;
    prs_price: string;
}

export interface ProductDetailProps {
    id: string;
    name: string;
    code: string;
    description: string;
    media: { type: string; src: string }[];
    sizeOptions: { size: string; price: number }[];
    // specifications: { title: string; content: string }[];
}



export function transformApiResponseToProductDetails(apiResponse: ApiResponse): ProductDetailProps[] {
    return apiResponse.product.map((product: ApiProduct) => {
        // Get media or default to a placeholder if no images are available
        const media = apiResponse.Image.filter((image: ApiImage) => image.pimg_pid === product.id).map((image: ApiImage) => ({
            type: "image",
            src: `/api/image/${image.pimg_bimg}`,
        }));

        if (media.length === 0) {
            media.push({
                type: "image",
                src: "/api/image/default-image.avif",  // A placeholder image in case no image is available
            });
        }

        // Get size options or default to a single size if no prices are found
        const sizeOptions = apiResponse.Price.filter((price: ApiPrice) => price.prs_pid === product.id).map((price: ApiPrice) => ({
            size: price.prs_size,
            price: Number(price.prs_price),
        }));

        if (sizeOptions.length === 0) {
            sizeOptions.push({
                size: "M",  // Default size
                price: 4999,  // Default price
            });
        }

        // Product specifications
        // const specifications = [
        //     {
        //         title: "Product Detail",
        //         content: `
        //             <div class="product-detail"><strong>Style No:</strong> ${product.style_no || "N/A"}</div>
        //             <div class="product-detail"><strong>Design No:</strong> ${product.design_no || "N/A"}</div>
        //             <div class="product-detail"><strong>Color:</strong> ${product.color || "Unknown"}</div>
        //             <div class="product-detail"><strong>Fabric:</strong> ${product.fabric || "Unknown"}</div>
        //             <div class="product-detail"><strong>Work:</strong> ${product.work || "Unknown"}</div>
        //             ${product.notes || ""}
        //             ${product.product_specs || ""}
        //         `,
        //     },
        //     {
        //         title: "Style & Fit Tips",
        //         content: `
        //             <div class="style-tips">
        //               <h2>Style Tips:</h2>
        //               <p>${(product.style_fit_tips?.split("\r\n\r\n")[0] || "No style tips available.").replace("Style Tips:\r\n", "")}</p>
        //             </div>
        //             <div class="fit-tips">
        //               <h2>Fit Tips:</h2>
        //               <p>${(product.style_fit_tips?.split("\r\n\r\n")[1] || "No fit tips available.").replace("Fit Tips:\r\n", "")}</p>
        //             </div>
        //         `,
        //     },
        //     {
        //         title: "Care Instructions",
        //         content: `
        //             <ul>${(product.care_instructions || "Dry clean only").split("\r\n").map((item: string) => `<li>${item}</li>`).join("")}</ul>
        //         `,
        //     },
        // ];

        return {
            id: product.id,
            name: product.product_name,
            code: product.product_code,
            description: product.product_description,
            media,
            sizeOptions,
            // specifications,
        };
    });
}

