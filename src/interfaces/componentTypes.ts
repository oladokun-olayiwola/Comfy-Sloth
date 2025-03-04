// Auth Wrapper Types
import { ReactNode } from "react";
import { Product } from "./reducerTypes";

export interface ComponentProps {
  children: ReactNode;
}

export interface PageHeroProps {
  title: string;
  product?: Product;
}

export interface CartItemProps {
  id: string;
  image: string;
  name: string;
  color: string;
  price: number;
  amount: number;
}

export interface ListViewProps {
  products: Product[];
}
 export interface ProductImage {
  url: string;
  filename?: string;
}

export interface ProductImagesProp {
  images: Array<ProductImage>
}
export interface ProductProps {
  image: ProductImage;
  name: string;
  price: number;
  id: string;
}

export interface GridViewProps {
  products: Product[]
}

export interface AmountButtonsProps {
  increase: number;
  decrease: number;
  amount: number;
}

export interface StarsProp {
  stars: number;
  reviews: number;
}