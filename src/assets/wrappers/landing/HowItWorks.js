import styled from "styled-components";

const Wrapper = styled.section`
  padding: clamp(5rem, 9vw, 8rem) 0;
  background: #f1e9dd;
  scroll-margin-top: 5rem;

  .steps {
    display: grid;
    gap: 1rem;
    margin-top: 3.5rem;
  }

  @media (min-width: 640px) {
    .steps { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1100px) {
    .steps { grid-template-columns: repeat(4, 1fr); }
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 19rem;
    height: 100%;
    padding: 1.75rem;
    border-radius: var(--radius-lg);

    h3 { margin-top: auto; font-size: 1.75rem; }
    p { font-size: 0.95rem; opacity: 0.8; }
  }

  .step-top {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 700;
    svg { font-size: 1.15rem; }
  }

  .tone-soft { background: var(--surface-soft); }
  .tone-white { background: var(--surface); }
  .tone-orange { background: var(--secondary); color: var(--on-secondary); }
  .tone-green { background: var(--primary); color: #fff; }
`;

export default Wrapper;
