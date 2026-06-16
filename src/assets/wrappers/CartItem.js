import styled from "styled-components";

const Wrapper = styled.div`
  .cart-item {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 1.25rem;
    background: #fff;
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .meal-image {
    img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }

  .meal-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
  }

  .meal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .meal-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--darkest);
    text-transform: capitalize;
    flex: 1;
  }

  .remove-meal-btn {
    background: none;
    border: none;
    color: #e53e3e;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0.1rem;
    border-radius: 0.25rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s, background 0.2s;

    &:hover {
      background: #fff5f5;
      color: #c53030;
    }
  }

  .ingredient-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ingredient-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--background, #f9f9f9);
    border-radius: 0.4rem;
    padding: 0.5rem 0.75rem;
    flex-wrap: wrap;
  }

  .ing-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--darkest);
    text-transform: capitalize;
    min-width: 100px;
  }

  .ing-unit {
    font-weight: 400;
    color: var(--dark);
    font-size: 0.82rem;
  }

  .ing-price {
    font-size: 0.88rem;
    color: var(--dark);
    white-space: nowrap;
  }

  .qty-controls {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;
  }

  .qty-btn {
    width: 1.8rem;
    height: 1.8rem;
    border: 1.5px solid var(--primary);
    background: #fff;
    color: var(--primary);
    border-radius: 0.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: var(--primary);
      color: #fff;
    }
  }

  .qty-value {
    min-width: 1.5rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--darkest);
  }

  .remove-ing-btn {
    background: none;
    border: none;
    color: #e53e3e;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    border-radius: 0.25rem;
    transition: background 0.2s;
    margin-left: 0.25rem;

    &:hover {
      background: #fff5f5;
    }
  }

  .meal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 1px dashed #e2e8f0;
  }

  .meal-total {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--darkest);
  }
`;

export default Wrapper;
