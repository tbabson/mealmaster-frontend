import styled from "styled-components";

const Wrapper = styled.footer`
  padding: 4rem 1rem 1rem;

  .footer-card {
    width: min(1200px, 100%);
    margin-inline: auto;
    padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3.5rem) 1.5rem;
    border-radius: 2rem;
    background: var(--ink);
    color: var(--ink-text);
    overflow: hidden;
  }

  .footer-top {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: 1fr;
  }

  .brand-logo {
    display: inline-block;
    padding: 0.6rem 0.9rem;
    border-radius: 1rem;
    background: var(--background);
    .logo { width: 120px; height: auto; display: block; }
  }

  .brand-copy {
    margin-top: 1.25rem;
    max-width: 22rem;
    color: var(--ink-text-secondary);
    font-size: 0.95rem;
  }

  .socials {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;

    a {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--ink-border);
      color: var(--ink-text);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      &:hover {
        background: var(--secondary);
        border-color: var(--secondary);
        color: var(--on-secondary);
      }
    }
  }

  .footer-col {
    display: grid;
    align-content: start;
    gap: 0.8rem;

    h4 {
      margin-bottom: 0.4rem;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--secondary);
    }

    a, span {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      color: var(--ink-text);
      font-size: 0.95rem;
      line-height: 1.4;
      transition: color 0.2s;
    }
    a:hover { color: #8fd18f; }
    svg { flex-shrink: 0; color: var(--ink-text-secondary); }
  }

  .wordmark {
    margin: 3rem 0 0.5rem;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(3.5rem, 15vw, 12rem);
    line-height: 0.9;
    letter-spacing: -0.04em;
    text-align: center;
    color: transparent;
    -webkit-text-stroke: 1px rgba(237, 246, 236, 0.18);
    user-select: none;
  }

  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.75rem 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--ink-border);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-text-secondary);

    .legal { display: flex; gap: 1.25rem; }
    a { color: inherit; &:hover { color: var(--ink-text); } }
  }

  @media (min-width: 768px) {
    .footer-top { grid-template-columns: 1.6fr 1fr 1fr 1.3fr; }
  }
`;

export default Wrapper;
