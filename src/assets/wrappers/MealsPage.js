import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;

  /* ── Page hero ─────────────────────────────────── */
  .page-hero {
    background: linear-gradient(135deg, #143315 0%, #0f2210 100%);
    padding: 3.5rem 1.5rem 3rem;
    position: relative;
    overflow: hidden;
  }

  .page-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 70% 50%,
      rgba(255, 87, 34, 0.12) 0%,
      transparent 65%
    );
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .hero-text h1 {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 800;
    color: #fff;
    margin: 0 0 0.4rem;
    font-family: "Roboto", sans-serif;
  }

  .hero-text p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  /* ── Main layout ───────────────────────────────── */
  .meals-layout {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem 5rem;
    display: grid;
    grid-template-columns: 268px 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 860px) {
    .meals-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .page-hero {
      padding: 2.5rem 1rem 2rem;
    }
    .meals-layout {
      padding: 1.25rem 1rem 3rem;
      gap: 1rem;
    }
  }
`;

export default Wrapper;
