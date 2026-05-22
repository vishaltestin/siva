export interface ApiPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface ApiImage {
    pimg_pid: string;
    pimg_bimg: string;
}
export interface ApiImageFull extends ApiImage {
    id: string;
    pimg_title: string;
    pimg_position: string;
    pimg_desc: string;
    pimg_simg: string;
    status: string;
    pimg_date: string;
}
export interface ApiPrice {
    prs_pid: string;
    prs_size: string;
    prs_price: string;
}
export interface ApiProduct {
    id: string;
    product_name: string;
    product_code: string;
    product_description: string;
    fabric?: string;
    work?: string;
}
export interface ApiProductFull {
    id: string;
    category_id: string;

    product_name: string;
    product_code: string;
    style_no: string;
    design_no: string;
    alias: string;

    product_description: string;
    short_description: string;
    product_specs: string;

    color: string;
    fabric: string;
    work: string;

    thumb_image: string;
    big_image: string;

    seo_title: string;
    seo_keywords: string;
    seo_description: string;

    p_quantity: string;
    status: string;
    ordering: string;
    cdate: string;

    style_fit_tips: string;
    care_instructions: string;
    brochure: string;
    notes: string;

    image: ApiImageFull | null;   // 👈 FIXED
    prices: ApiPrice[];
}
export interface ProductListFullResponse {
    status: number;
    message: string;
    packages: ApiProductFull[];
    pagination: ApiPagination;   // 👈 ADDED
}
export interface ProductDetailProps {
    id: string;
    name: string;
    code: string;
    description: string;

    media: {
        type: "image" | "video";
        src: string;
    }[];

    sizeOptions: {
        size: string;
        price: number;
    }[];

    wholesalePrice?: number;
    moq?: number;
    deliveryTimeline?: string;
    fabricDetails?: string;
    embroideryDetails?: string;
    brochure?: string;
}

