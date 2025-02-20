import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';
import { ProductState, ProductAction, Product } from '../interfaces/reducerTypes';

const productsReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products: action.payload.filter((product: Product) => product.featured === true), // ✅ No more implicit 'any'
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_loading: true, single_product_error: false };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, single_product_loading: false, single_product: action.payload };
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_loading: false, single_product_error: true };
    default:
      throw new Error(`No Matching "${(action as ProductAction).type}" - action type`);
  }
};
