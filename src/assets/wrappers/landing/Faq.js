import styled from "styled-components";

const Wrapper = styled.section`
  padding: clamp(5rem, 9vw, 8rem) 0;

  .faq-inner {
    display: grid;
    gap: 3rem;
  }

  .faq-head {
    display: grid;
    justify-items: start;
    gap: 1.25rem;
    align-self: start;

    h2 { font-size: clamp(2.25rem, 4.5vw, 3.5rem); }
    p { color: var(--text-secondary); max-width: 24rem; }
  }

  .faq-item {
    border-bottom: 1px solid var(--border-strong);
    h3 { font: inherit; }
  }

  .faq-q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
    padding: 1.4rem 0;
    background: none;
    border: none;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;

    &:hover { color: var(--primary); }
  }

  .faq-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--surface-soft);
    color: var(--primary);
  }

  .faq-a {
    overflow: hidden;
    p {
      padding-bottom: 1.4rem;
      max-width: 38rem;
      color: var(--text-secondary);
    }
  }

  @media (min-width: 992px) {
    .faq-inner { grid-template-columns: 0.8fr 1.2fr; gap: 5rem; }
    .faq-head { position: sticky; top: 8rem; }
  }
`;

export default Wrapper;
