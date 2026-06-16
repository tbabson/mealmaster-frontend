import styled from "styled-components";

const Wrapper = styled.div`
  .card {
    background: #fff;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--darkest);
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary);
  }

  .card-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    font-size: 0.95rem;
    color: var(--dark);
    border-bottom: 1px solid #f1f5f9;

    span:first-child {
      font-weight: 500;
    }

    &:last-child {
      border-bottom: none;
      margin-top: 0.5rem;
      padding-top: 0.75rem;
      border-top: 2px solid var(--primary);
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--darkest);
    }
  }
`;

export default Wrapper;
