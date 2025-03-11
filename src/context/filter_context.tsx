import React, { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import {
  FilterContextValue,
  FilterProviderProps,
  FilterState,
} from "../interfaces/contextTypes";

const initialState: FilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext<FilterContextValue | null>(null);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const { products } = useProductsContext();
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
  const updateSort = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  const updateFilters = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    let name: string = "";
    let value: string | number | boolean = "";
    if (e.type === "change") {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      name = target.name;
      value = target.value;
      if (name === "price") {
        value = value ? Number(value) : 200;
      }

      if (name === "shipping" && target instanceof HTMLInputElement) {
        value = target.checked;
      }
    }

    // Handle button clicks (category, color)
    if (e.type === "click") {
      const target = e.target as HTMLButtonElement;
      name = target.name;

      if (name === "category") {
        value = target.textContent ?? "";
      }

      if (name === "color") {
        value = target.dataset.color ?? "";
      }
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
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
