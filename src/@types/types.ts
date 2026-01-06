export interface Category {
    id: string;
    name: string;
    small_description: string;
    user_id: string;
    alias: string;
    category_image: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
    category_thumb: string;
}

export interface GetCategoryResponse {
    status: number;
    message: string;
    packages: Category[];
}
export type User = {
    user_id: string
    email: string
    name: string
}
export interface LoginResponse {
    status: number;
    message: string;
    packages: User[]
}


export type ProductsApiResponse = {
    status: number;
    message: string;
    packages: ProductPackage[];
};

export type ProductPackage = {
    id: string;
    category_id: string;
    product_name: string;
    product_description: string;
    short_description: string;
    product_specs: string; // contains HTML content
    thumb_image: string;
    big_image: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
};
