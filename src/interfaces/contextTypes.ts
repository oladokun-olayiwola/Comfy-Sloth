import { ReactNode } from 'react';
import { Product } from './reducerTypes';
import { User } from '@auth0/auth0-react';

// reducerTypes.ts
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

export interface CartProviderProps {
  children: ReactNode;
}

export type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: { id: string; color: string; amount: number; product: any };
    }
  | { type: 'REMOVE_CART_ITEM'; payload: string }
  | {
      type: 'TOGGLE_CART_ITEM_AMOUNT';
      payload: { id: string; value: 'inc' | 'dec' };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'COUNT_CART_TOTALS' };

export interface CartContextValue extends CartState {
  addToCart: (id: string, color: string, amount: number, product: any) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: 'inc' | 'dec') => void;
  clearCart: () => void;
}

// Filter Context
interface Filters {
  text: string;
  company: string;
  category: string;
  color: string;
  min_price: number;
  max_price: number;
  price: number;
  shipping: boolean;
}

export interface FilterState {
  filtered_products: Product[];
  all_products: Product[];
  grid_view: boolean;
  sort: string;
  filters: Filters;
}

export interface FilterProviderProps {
  children: ReactNode;
}

export interface FilterContextValue extends FilterState {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateFilters: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>) => void;
  clearFilters: () => void;
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

export interface ProductProviderProps {
  children: ReactNode;
}

export interface ProductContextValue extends ProductState {
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
}

// User Context 

export interface UserState {
  myUser?: User;
}
export interface UserProviderProps {
  children: ReactNode;
}
export interface UserContextValue extends UserState {
  loginWithRedirect: () => void;
  logout: () => void;
}
