import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
});

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  brand?: string;
  category?: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchByCategory(category: string) {
  const { data } = await api.get<ProductsResponse>(`/products/category/${category}`);
  return data.products;
}

export async function fetchById(id: number) {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}