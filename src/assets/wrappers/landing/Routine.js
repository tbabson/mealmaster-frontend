import styled from "styled-components";

const Wrapper = styled.section`
  padding: 5rem 0 6rem;

  .routine-inner {
    display: grid;
    gap: 3rem;
  }

  .routine-copy {
    display: grid;
    justify-items: start;
    gap: 1.5rem;
    align-self: start;

    h2 { font-size: clamp(2.25rem, 4.6vw, 3.75rem); }
    p { color: var(--text-secondary); font-size: 1.05rem; max-width: 30rem; }
    .arrow-link { color: var(--text-primary); }
  }

  .story-cards {
    display: grid;
    gap: 1.25rem;
  }

  .story-card {
    position: sticky;
    display: grid;
    align-content: end;
    gap: 0.75rem;
    min-height: 22rem;
    padding: 2rem;
    border-radius: var(--radius-lg);
    transform-origin: top center;
    box-shadow: 0 -12px 40px -24px rgba(15, 26, 19, 0.35);

    h3 { font-size: clamp(1.6rem, 2.6vw, 2.1rem); }
    p { max-width: 26rem; font-size: 0.98rem; opacity: 0.85; }
  }

  .card-icon {
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-size: 1.9rem;
  }

  .card-tag {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  .tone-orange { background: var(--secondary); color: var(--on-secondary); }
  .tone-soft { background: var(--surface-soft); color: var(--text-primary); border: 1px solid var(--border); }
  .tone-green { background: var(--primary); color: #fff; }

  @media (min-width: 992px) {
    padding: 7rem 0;

    .routine-inner {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    .routine-copy {
      position: sticky;
      top: 8rem;
    }
  }
`;

export default Wrapper;
