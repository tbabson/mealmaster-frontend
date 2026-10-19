import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--ink);
  color: var(--ink-text);
  padding: clamp(5rem, 9vw, 8rem) 0;

  .rows {
    display: grid;
    gap: 1rem;
    margin-top: 3.5rem;
  }

  .rows > div { height: 100%; }

  .row {
    height: 100%;
    display: grid;
    align-content: start;
    gap: 0.6rem;
    padding: 1.75rem;
    border-radius: var(--radius-lg);
    background: var(--ink-surface);
    border: 1px solid var(--ink-border);
    transition: border-color 0.3s;

    &:hover { border-color: rgba(255, 87, 34, 0.5); }

    h3 { margin-top: 2.5rem; font-family: var(--font-sans); font-size: 1.35rem; font-weight: 600; letter-spacing: -0.01em; }
    p { color: var(--ink-text-secondary); font-size: 0.95rem; }
  }

  .row-icon {
    display: inline-flex;
    width: fit-content;
    font-size: 1.6rem;
    color: var(--secondary);
  }

  .fine-print {
    margin-top: 3rem;
    color: var(--ink-text-secondary);
  }

  @media (min-width: 768px) {
    .rows { grid-template-columns: repeat(3, 1fr); }
  }
`;

export default Wrapper;
