import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;

  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 0.5rem;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: var(--darkest);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }
  }

  .dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 36px;
    color: #94a3b8;
    font-size: 1rem;
    pointer-events: none;
  }

  .arrow-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.45rem 1rem;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #475569;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    svg {
      font-size: 1rem;
    }
  }
`;

export default Wrapper;
