import styled from "styled-components";

const Wrapper = styled.div`
  .hero {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    background-image: url("https://res.cloudinary.com/dwrmehhg3/image/upload/v1739197458/mealmaster/leewvncyfi1ghunkl0wy.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    margin-top: -5rem;
    padding: 0 1.5rem;

    @media (max-width: 768px) {
      background-attachment: scroll;
      background-image: url("https://res.cloudinary.com/dwrmehhg3/image/upload/v1739199710/mealmaster/tszab0fn3rnp6heorq69.jpg");
    }
  }

  /* Dark gradient overlay for text legibility */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 25, 12, 0.88) 0%,
      rgba(20, 51, 21, 0.72) 55%,
      rgba(10, 25, 12, 0.45) 100%
    );
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding-top: 9rem;
    padding-bottom: 5rem;
  }

  /* ── Eyebrow ───────────────────────────────────── */
  .hero-eyebrow {
    display: inline-block;
    padding: 0.3rem 1rem;
    border-radius: 999px;
    background: rgba(255, 87, 34, 0.18);
    border: 1px solid rgba(255, 87, 34, 0.4);
    color: #ff8a65;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  /* ── Headline ──────────────────────────────────── */
  .hero-title {
    font-family: "Roboto", sans-serif;
    font-size: clamp(2.2rem, 5.5vw, 4rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    max-width: 660px;
  }

  /* ── Sub-text ──────────────────────────────────── */
  .hero-sub {
    font-size: clamp(0.95rem, 2vw, 1.2rem);
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.75;
    margin-bottom: 2.25rem;
    max-width: 520px;
  }

  /* ── CTAs ──────────────────────────────────────── */
  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3.5rem;
  }

  .cta-primary {
    padding: 0.9rem 2.25rem;
    border-radius: 10px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 4px 22px rgba(255, 87, 34, 0.45);

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }

  .cta-ghost {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.9rem 1.85rem;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.85);
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .cta-arrow {
    font-size: 0.8rem;
    margin-top: 1px;
  }

  /* ── Stats row ─────────────────────────────────── */
  .hero-stats {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .stat-num {
    font-size: 1.55rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    font-family: "Roboto", sans-serif;
  }

  .stat-label {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .stat-sep {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.22);
    flex-shrink: 0;
  }

  /* ── Mobile ────────────────────────────────────── */
  @media (max-width: 480px) {
    .hero-inner {
      padding-top: 10rem;
    }

    .hero-ctas {
      flex-direction: column;
      align-items: flex-start;
    }

    .cta-primary,
    .cta-ghost {
      width: 100%;
      justify-content: center;
    }

    .title-br {
      display: none;
    }
  }
`;

export default Wrapper;
