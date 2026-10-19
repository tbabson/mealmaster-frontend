import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100%;

  .meal-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:hover {
      border-color: var(--primary);
      box-shadow: 0 24px 50px -28px rgba(15, 26, 19, 0.45);
    }
  }

  /* ── Image ─────────────────────────────────────── */
  .card-image {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--border);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .type-badge,
  .rating-badge {
    position: absolute;
    top: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.7rem;
    border-radius: var(--radius-pill);
    background: rgba(15, 26, 19, 0.7);
    backdrop-filter: blur(8px);
    color: #fff;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .type-badge { left: 0.85rem; }
  .rating-badge { right: 0.85rem; letter-spacing: 0.02em; }

  .star-icon {
    color: var(--secondary);
    font-size: 0.7rem;
  }

  /* ── Card body ─────────────────────────────────── */
  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.7rem;
    padding: 1.15rem 1.25rem 1.25rem;
  }

  .meal-name {
    font-size: 1.35rem;
    color: var(--text-primary);
    line-height: 1.15;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .meta-country {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: capitalize;
  }

  .meta-icon {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .dietary-chip {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: var(--surface-soft);
    color: var(--primary);
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.55rem;
    border-radius: var(--radius-pill);
    text-transform: capitalize;
  }

  .leaf-icon {
    font-size: 0.65rem;
  }

  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
    padding-top: 0.85rem;
    border-top: 1px solid var(--border);
  }

  .card-price {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--primary);
    span { display: inline-flex; }
  }
`;

export default Wrapper;
