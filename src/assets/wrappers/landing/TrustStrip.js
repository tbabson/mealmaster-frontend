import styled from "styled-components";

const Wrapper = styled.section`
  padding: 3.5rem 1rem 1rem;
  text-align: center;

  .strip-title {
    margin-bottom: 1.5rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .chips {
    display: grid;
    gap: 0.75rem;
    width: min(1100px, 100%);
    margin: 0 auto;
  }

  @media (min-width: 560px) {
    .chips { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1100px) {
    .chips { grid-template-columns: repeat(4, 1fr); }
  }

  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.95rem 1.25rem;
    border-radius: var(--radius-pill);
    background: var(--surface);
    border: 1px solid var(--border);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-primary);

    svg { color: var(--primary); font-size: 1rem; }
  }
`;

export default Wrapper;
