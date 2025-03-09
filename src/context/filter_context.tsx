import React, {
  useEffect,
  useContext,
  useReducer,
  createContext,
  useState,
} from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';
import {
  FilterContextValue,
  FilterProviderProps,
  FilterState,
} from '../interfaces/contextTypes';

const initialState: FilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext<FilterContextValue | null>(null);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!products || products.length === 0) {
      return;
    }
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  const updateFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value }: { name: string; value: string | number | boolean } =
      e.target;
    if (name === 'category') {
      value = e.target.textContent ?? '';
    }
    if (name === 'color') {
      value = e.target.dataset.color ?? '';
    }
    if (name === 'price') {
      value = value ? Number(value) : 200;
    }
    if (name === 'shipping' && e.target instanceof HTMLInputElement) {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  const context = useContext(FilterContext);
    if (!context) {
      throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
