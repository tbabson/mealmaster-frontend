import { createGlobalStyle } from "styled-components";

// Typography and shared building blocks for the public site.
// Everything is scoped under .public-site so the admin area keeps its own look.
const PublicStyles = createGlobalStyle`
  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-stopped { overflow: hidden; }

  .public-site {
    font-family: var(--font-sans);
    color: var(--text-primary);
    background: var(--background);
    -webkit-font-smoothing: antialiased;

    h1, h2, h3 {
      font-family: var(--font-display);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.04;
    }
    h3 { letter-spacing: -0.02em; }

    h4, h5, h6, button, input, select, textarea {
      font-family: var(--font-sans);
    }

    p { line-height: 1.6; }

    :focus-visible {
      outline: 2px solid var(--secondary);
      outline-offset: 3px;
    }
  }

  /* ── content width ── */
  .mm-container {
    width: min(1200px, 100% - 2rem);
    margin-inline: auto;
  }

  /* ── eyebrow pill ── */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.85rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1;
    white-space: nowrap;

    svg { font-size: 0.8rem; }
  }
  .eyebrow-light {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--primary);
  }
  .eyebrow-dark {
    background: rgba(53, 132, 56, 0.16);
    border: 1px solid rgba(53, 132, 56, 0.45);
    color: #8fd18f;
  }
  .eyebrow-onColor {
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(36, 49, 41, 0.12);
    color: var(--text-primary);
  }

  /* ── pill call-to-action ── */
  .pill-link {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.45rem 0.5rem 0.45rem 1.4rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.25s, color 0.25s, box-shadow 0.25s;
    cursor: pointer;
  }
  .pill-arrow {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    font-size: 1rem;
  }
  .pill-dark {
    background: var(--ink);
    color: var(--ink-text);
    .pill-arrow { background: var(--secondary); color: var(--on-secondary); }
    &:hover { box-shadow: 0 10px 30px -10px rgba(15, 26, 19, 0.6); }
  }
  .pill-green {
    background: var(--primary);
    color: #fff;
    .pill-arrow { background: #fff; color: var(--primary); }
    &:hover { background: var(--primary-hover); }
  }
  .pill-orange {
    background: var(--secondary);
    color: var(--on-secondary);
    .pill-arrow { background: var(--ink); color: var(--ink-text); }
  }
  .pill-light {
    background: var(--ink-text);
    color: var(--ink);
    .pill-arrow { background: var(--primary); color: #fff; }
  }

  /* text link with arrow */
  .arrow-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: inherit;
    text-decoration: none;

    svg { transition: transform 0.25s var(--ease-out); }
    &:hover svg { transform: translateX(4px); }
  }

  /* ── marquee ── */
  .marquee {
    overflow: hidden;
    width: 100%;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
  .marquee-track {
    display: flex;
    width: max-content;
  }
  .marquee-group {
    display: flex;
    flex-shrink: 0;
  }

  /* ── section headings ── */
  .section-heading {
    display: grid;
    gap: 1.25rem;
    max-width: 44rem;

    h2 { font-size: clamp(2.25rem, 5vw, 4rem); }
    p { font-size: 1.05rem; color: var(--text-secondary); max-width: 36rem; }

    &.centered {
      margin-inline: auto;
      text-align: center;
      justify-items: center;
    }
    &.on-dark p { color: var(--ink-text-secondary); }
    &.on-dark h2 { color: var(--ink-text); }
  }

  .fine-print {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-align: center;
  }
`;

export default PublicStyles;
