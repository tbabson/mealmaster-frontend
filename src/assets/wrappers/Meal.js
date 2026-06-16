import styled from "styled-components";

const Wrapper = styled.div`
  .meal-card {
    display: block;
    text-decoration: none;
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    &:hover .card-overlay {
      opacity: 1;
    }

    &:hover .card-image img {
      transform: scale(1.06);
    }
  }

  /* ── Image ─────────────────────────────────────── */
  .card-image {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #e2e8f0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.35s ease;
    }
  }

  .type-badge {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    background: var(--primary);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.22rem 0.55rem;
    border-radius: 20px;
  }

  .rating-badge {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.22rem 0.5rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .star-icon {
    color: #fbbf24;
    font-size: 0.7rem;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(20, 51, 21, 0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .view-recipe {
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    border: 2px solid #fff;
    padding: 0.5rem 1.2rem;
    border-radius: 25px;
    letter-spacing: 0.03em;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  /* ── Card body ─────────────────────────────────── */
  .card-body {
    padding: 0.9rem 1rem 1rem;
  }

  .meal-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 0.5rem;
    line-height: 1.35;
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
    margin-bottom: 0.55rem;
  }

  .meta-country {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    color: #64748b;
    text-transform: capitalize;
  }

  .meta-icon {
    color: #94a3b8;
    font-size: 0.7rem;
  }

  .dietary-chip {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #dcfce7;
    color: #16a34a;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 20px;
    text-transform: capitalize;
  }

  .leaf-icon {
    font-size: 0.65rem;
  }

  .card-price {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--secondary);
  }
`;

export default Wrapper;
