import React, { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters: React.FC = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category") as string[];
  const companies = getUniqueValues(all_products, "company") as string[];
  const colors = getUniqueValues(all_products, "colors") as string[];

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* Categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => (
                <button
                  key={index}
                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                    updateFilters(e)
                  }
                  type="button"
                  name="category"
                  className={`${category === c.toLowerCase() ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFilters(e)}
              className="company"
            >
              {companies.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.map((c, index) => (
                <button
                  key={index}
                  name="color"
                  style={{ background: c }}
                  className={`${color === c ? "color-btn active" : "color-btn"}`}
                  data-color={c}
                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                    updateFilters(e)
                  }
                >
                  {color === c ? <FaCheck /> : null}
                </button>
              ))}
            </div>
          </div>
          {/* Price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={min_price}
              max={max_price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateFilters(e)}
              value={price}
            />
          </div>
          {/* Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping"> Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateFilters(e)}
              checked={shipping}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
