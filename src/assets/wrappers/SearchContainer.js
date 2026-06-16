import styled from "styled-components";

const Wrapper = styled.div`
  position: sticky;
  top: 5.5rem;

  .mobile-toggle {
    display: none;
    width: 100%;
    padding: 0.7rem 1rem;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--darkest);
    cursor: pointer;
    align-items: center;
    gap: 0.5rem;
    transition: border-color 0.2s;

    &:hover {
      border-color: var(--primary);
    }
  }

  .filter-panel {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    padding: 1.4rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .filter-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
    letter-spacing: 0.01em;
  }

  .clear-all {
    font-size: 0.78rem;
    color: var(--secondary);
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
      text-decoration: underline;
    }
  }

  .active-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .chip {
    background: rgba(40, 132, 43, 0.1);
    color: var(--primary);
    border-radius: 20px;
    padding: 0.2rem 0.65rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .filter-form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .filter-group {
    margin-bottom: 1.1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .filter-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    margin-bottom: 0.4rem;
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 0.8rem;
    pointer-events: none;
  }

  .filter-input {
    width: 100%;
    padding: 0.55rem 0.75rem 0.55rem 2rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;

    &::placeholder {
      color: #b0b8c4;
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background: #fff;
    }
  }

  .filter-select {
    width: 100%;
    padding: 0.55rem 0.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2rem;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background-color: #fff;
    }
  }

  /* ── Mobile collapse ──────────────────────────── */
  @media (max-width: 860px) {
    position: static;

    .mobile-toggle {
      display: flex;
    }

    .filter-panel {
      max-height: 0;
      overflow: hidden;
      padding: 0 1.25rem;
      opacity: 0;
      transition: max-height 0.3s ease, opacity 0.2s ease, padding 0.2s ease;

      &.open {
        max-height: 900px;
        opacity: 1;
        padding: 1.4rem 1.25rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

export default Wrapper;
