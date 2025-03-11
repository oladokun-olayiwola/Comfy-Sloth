import {
  ADD_TO_CART,
  CLEAR_CART,
  CLEAR_FILTERS,
  COUNT_CART_TOTALS,
  FILTER_PRODUCTS,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  LOAD_PRODUCTS,
  REMOVE_CART_ITEM,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  SORT_PRODUCTS,
  TOGGLE_CART_ITEM_AMOUNT,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from '../actions';
import { ProductImage } from './componentTypes';

// Cart Reducer
export interface CartItem {
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  max: number;
}

export interface CartState {
  cart: CartItem[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
}

export type CartAction =
  | {
      type: typeof ADD_TO_CART;
      payload: { id: string; color: string; amount: number; product: any };
    }
  | { type: typeof REMOVE_CART_ITEM; payload: string }
  | { type: typeof CLEAR_CART }
  | {
      type: typeof TOGGLE_CART_ITEM_AMOUNT;
      payload: { id: string; value: 'inc' | 'dec' };
    }
  | { type: typeof COUNT_CART_TOTALS };

// Product Reducer
export interface Product {
  id: string;
  name: string;
  price: number;
  image: ProductImage;
  colors: Array<string>;
  company: string;
  description: string;
  featured: boolean;
  category: string;
  shipping: boolean;
  stock: number;
  stars: number;
  reviews: number;
}

export interface ProductState {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products: Product[];
  featured_products: Product[];
  products_error?: boolean;
  single_product_loading?: boolean;
  single_product?: Product;
  single_product_error?: boolean;
}

export type ProductAction =
  | { type: typeof SIDEBAR_OPEN }
  | { type: typeof SIDEBAR_CLOSE }
  | { type: typeof GET_PRODUCTS_BEGIN }
  | { type: typeof GET_PRODUCTS_SUCCESS; payload: Product[] } // Ensure payload is typed
  | { type: typeof GET_PRODUCTS_ERROR }
  | { type: typeof GET_SINGLE_PRODUCT_BEGIN }
  | { type: typeof GET_SINGLE_PRODUCT_SUCCESS; payload: Product }
  | { type: typeof GET_SINGLE_PRODUCT_ERROR };

// Filter Reducer
export interface Filters {
  text: string;
  company: string;
  category: string;
  color: string;
  price: number;
  min_price: number;
  max_price: number;
  shipping: boolean;
}

export interface FilterState {
  all_products: Product[];
  filtered_products: Product[];
  grid_view: boolean;
  sort: string;
  filters: Filters;
}

export type FilterAction =
  | { type: typeof LOAD_PRODUCTS; payload: Product[] }
  | { type: typeof SET_GRIDVIEW }
  | { type: typeof SET_LISTVIEW }
  | { type: typeof UPDATE_SORT; payload: string }
  | { type: typeof SORT_PRODUCTS }
  | {
      type: typeof UPDATE_FILTERS;
      payload: { name: string; value: string | boolean | number };
    }
  | { type: typeof FILTER_PRODUCTS }
  | { type: typeof CLEAR_FILTERS };
