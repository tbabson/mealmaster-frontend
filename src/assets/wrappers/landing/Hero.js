import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  background: var(--ink);
  color: var(--ink-text);
  padding-top: 8.5rem;
  overflow: hidden;

  /* soft brand-green glow behind the stack */
  &::before {
    content: "";
    position: absolute;
    inset: auto -20% -30% -20%;
    height: 70%;
    background: radial-gradient(closest-side, rgba(53, 132, 56, 0.35), transparent);
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    display: grid;
    gap: 3.5rem;
    align-items: center;
    padding-bottom: 4rem;
  }

  .hero-copy {
    display: grid;
    justify-items: center;
    gap: 1.5rem;
    text-align: center;
  }

  .hero-title {
    font-size: clamp(2.75rem, 7vw, 5.5rem);
    color: var(--ink-text);

    .line {
      display: block;
      overflow: hidden;
      padding-bottom: 0.08em;
    }
    .line > span { display: inline-block; }
  }

  .hero-sub {
    max-width: 34rem;
    color: var(--ink-text-secondary);
    font-size: 1.05rem;
  }

  .hero-ctas {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem 1.75rem;
    margin-top: 0.5rem;

    .arrow-link { color: var(--ink-text); }
  }

  /* ── draggable stack ── */
  .stack-area {
    display: grid;
    justify-items: center;
    gap: 1.75rem;
  }

  .stack {
    position: relative;
    width: min(340px, 78vw);
    aspect-ratio: 4 / 5;
  }

  .stack-card {
    position: absolute;
    inset: 0;
    border-radius: 1.75rem;
    overflow: hidden;
    background: var(--ink-surface);
    border: 6px solid var(--background);
    box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.8);
    cursor: grab;
    touch-action: pan-y;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }

    &.is-placeholder {
      background: linear-gradient(135deg, var(--ink-surface), var(--primary));
    }
  }

  .card-meta {
    position: absolute;
    inset: auto 0 0;
    display: grid;
    gap: 0.25rem;
    padding: 2.5rem 1.25rem 1.1rem;
    background: linear-gradient(transparent, rgba(15, 26, 19, 0.88));

    span {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #8fd18f;
    }
    a {
      font-family: var(--font-display);
      font-weight: 700;
      letter-spacing: -0.02em;
      font-size: 1.5rem;
      color: var(--ink-text);
      &:hover { text-decoration: underline; }
    }
  }

  .drag-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: var(--radius-pill);
    background: rgba(244, 241, 232, 0.08);
    border: 1px solid var(--ink-border);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-text-secondary);
  }

  /* ── ticker ── */
  .hero-ticker {
    position: relative;
    padding: 1.1rem 0;
    border-top: 1px solid var(--ink-border);
    background: var(--primary);
  }
  .ticker-word {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    padding-right: 1.5rem;
    font-size: clamp(0.9rem, 1.6vw, 1.15rem);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
    color: #fff;

    .dot { color: var(--secondary); }
  }

  @media (min-width: 992px) {
    padding-top: 9.5rem;

    .hero-inner {
      grid-template-columns: 1.1fr 0.9fr;
      padding-bottom: 5.5rem;
    }
    .hero-copy {
      justify-items: start;
      text-align: left;
    }
    .hero-ctas { justify-content: flex-start; }
  }
`;

export default Wrapper;
