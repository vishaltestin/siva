import axios, { AxiosError } from "axios";

import { GetCategoryResponse, LoginResponse, ProductsApiResponse } from "@/@types/types";
import { BASE_API_URL } from "@/lib/constant";
import { ProductListFullResponse } from "@/@types/product";

export async function getCategory(): Promise<GetCategoryResponse> {
    try {
        const formData = new FormData();
        formData.append("method", "getCategory");

        const response = await axios.post<GetCategoryResponse>(
            BASE_API_URL,
            formData
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export async function getProducts(category_id: string): Promise<ProductsApiResponse> {
    try {
        const formData = new FormData();
        formData.append("method", "getProduct");
        formData.append("category_id", category_id);
        const response = await axios.post<ProductsApiResponse>(
            BASE_API_URL,
            formData
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching Products:", error);
        throw error;
    }
}

export async function getFullProducts(category_id: string): Promise<ProductListFullResponse> {
    try {
        const formData = new FormData();
        formData.append("method", "getProductFullList");
        formData.append("category_id", category_id);
        const response = await axios.post<ProductListFullResponse>(
            BASE_API_URL,
            formData
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching Products:", error);
        throw error;
    }
}


export async function loginUser({
    method,
    email,
    password,
}: {
    method: string;
    email: string;
    password: string;
}): Promise<LoginResponse> {
    try {
        const formData = new FormData();
        formData.append("method", method);
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.post<LoginResponse>(
            BASE_API_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}


export async function getProductDetail(productId: string) {
    try {
        const formData = new FormData();
        formData.append("method", "getProductDetail");
        formData.append("id", productId);

        const res = await axios.post(BASE_API_URL, formData);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("getProductDetail error:", axiosError.response ?? axiosError.message);
        throw axiosError;
    }
}

export async function getProductImages(productId: string) {
    try {
        const formData = new FormData();
        formData.append("method", "getProductImage");
        formData.append("id", productId);
        const res = await axios.post(BASE_API_URL, formData);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("getProductImages error:", axiosError.response ?? axiosError.message);
        throw axiosError;
    }
}

export async function getProductPrices(productId: string) {
    try {
        const formData = new FormData();
        formData.append("method", "getProductPrice");
        formData.append("id", productId);

        const res = await axios.post(BASE_API_URL, formData);
        return res.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("getProductPrices error:", axiosError.response ?? axiosError.message);
        throw axiosError;
    }
}