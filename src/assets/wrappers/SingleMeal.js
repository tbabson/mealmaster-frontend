import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;

  /* ═══════════════════════════════════════════════════════
     TOP SECTION: image column + info column
  ═══════════════════════════════════════════════════════ */
  .top-section {
    display: grid;
    grid-template-columns: 460px 1fr;
    gap: 2.5rem;
    align-items: start;
    margin-bottom: 2.5rem;
  }

  /* ── Image column ─────────────────────────────────── */
  .img-col {
    position: sticky;
    top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .meal-img-wrap {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 20px;
    overflow: hidden;
    background: var(--lightest, #f4faf4);
    border: 1px solid #e8edf3;
    box-shadow: 0 4px 28px rgba(0, 0, 0, 0.08);
  }

  .meal-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .meal-img-wrap:hover img {
    transform: scale(1.04);
  }

  .img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--light, #daf2da), var(--lightest, #f4faf4));
    color: var(--medium, #87a887);
    font-size: 5rem;
  }

  /* Quick stats bar below image */
  .quick-stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 1.25rem;
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .qs-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    text-align: center;
  }

  .qs-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-weight: 600;
    color: #94a3b8;
  }

  .qs-value {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1e293b;
    text-transform: capitalize;
  }

  .qs-sep {
    width: 1px;
    height: 32px;
    background: #e8edf3;
    flex-shrink: 0;
  }

  /* ── Info column ──────────────────────────────────── */
  .info-col {
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    padding-top: 0.25rem;
  }

  .meal-title {
    font-size: clamp(1.65rem, 3vw, 2.5rem);
    font-weight: 800;
    color: #1e293b;
    line-height: 1.15;
    margin: 0;
  }

  /* Dietary chips */
  .dietary-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .diet-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    background: #dcfce7;
    color: #166534;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  /* Rating */
  .rating-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .star {
    font-size: 1.15rem;
    color: #e2e8f0;
  }

  .star.filled {
    color: #ecc106;
  }

  .rating-num {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
  }

  .review-count {
    font-size: 0.85rem;
    color: #94a3b8;
  }

  /* Price box */
  .price-block {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1.25rem 1.5rem;
    background: var(--lightest, #f4faf4);
    border-radius: 14px;
    border: 1px solid #e8edf3;
  }

  .price-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: #94a3b8;
  }

  .price-value {
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--secondary, #ff5722);
    line-height: 1;
    font-family: "Roboto", sans-serif;
  }

  /* CTA buttons */
  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-cart {
    flex: 1;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.95rem 1.5rem;
    border-radius: 10px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 3px 14px rgba(255, 87, 34, 0.3);
  }

  .btn-cart:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }

  .btn-reminder {
    flex: 1;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.95rem 1.5rem;
    border-radius: 10px;
    background: transparent;
    color: var(--primary, #28842b);
    font-size: 1rem;
    font-weight: 700;
    border: 2px solid var(--primary, #28842b);
    cursor: pointer;
    transition: background 0.15s;
  }

  .btn-reminder:hover {
    background: var(--lightest, #f4faf4);
  }

  /* Prep meta pills */
  .prep-meta {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .prep-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    background: #fff;
    border: 1px solid #e8edf3;
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
  }

  .pill-icon {
    color: var(--secondary, #ff5722);
    font-size: 0.78rem;
  }

  /* ═══════════════════════════════════════════════════════
     CONTENT BLOCKS
  ═══════════════════════════════════════════════════════ */
  .content-block {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 18px;
    padding: 2rem;
    margin-bottom: 1.75rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  }

  .block-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--lightest, #f4faf4);
  }

  .block-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
  }

  .block-count {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: var(--lightest, #f4faf4);
    color: #64748b;
    border: 1px solid #e8edf3;
  }

  /* ── Ingredients grid ─────────────────────────────── */
  .ingredients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 1rem;
  }

  .ing-card {
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #e8edf3;
    background: #fafbfc;
    transition: border-color 0.15s, background 0.15s;
  }

  .ing-card:hover {
    border-color: var(--secondary, #ff5722);
    background: #fff;
  }

  .ing-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
    text-transform: capitalize;
    margin-bottom: 0.3rem;
  }

  .ing-qty {
    font-size: 0.82rem;
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .ing-price {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--secondary, #ff5722);
  }

  .ing-sub {
    font-size: 0.75rem;
    color: #94a3b8;
    font-style: italic;
    margin-top: 0.35rem;
    line-height: 1.4;
  }

  /* ── Preparation ──────────────────────────────────── */
  .prep-guide {
    margin-bottom: 1.75rem;
  }

  .prep-guide:last-child {
    margin-bottom: 0;
  }

  .prep-description {
    font-size: 0.95rem;
    color: #475569;
    line-height: 1.75;
    margin: 0 0 0.85rem;
  }

  .skill-badge {
    display: inline-block;
    padding: 0.25rem 0.85rem;
    border-radius: 999px;
    background: #dbeafe;
    color: #1e40af;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 1.25rem;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    background: var(--lightest, #f4faf4);
    border-left: 4px solid var(--secondary, #ff5722);
  }

  .step-badge {
    min-width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 0.92rem;
    color: #475569;
    line-height: 1.75;
    margin: 0;
    padding-top: 0.18rem;
  }

  /* ── Reviews ──────────────────────────────────────── */
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .review-card {
    padding: 1.25rem;
    border-radius: 14px;
    border: 1px solid #e8edf3;
    background: #fafbfc;
    transition: border-color 0.15s;
  }

  .review-card:hover {
    border-color: #cbd5e1;
  }

  .review-top {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 0.85rem;
  }

  .reviewer-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary, #28842b);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .reviewer-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1e293b;
    display: block;
    margin-bottom: 0.18rem;
    text-transform: capitalize;
  }

  .review-stars {
    display: flex;
    gap: 2px;
  }

  .review-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #334155;
    margin: 0 0 0.4rem;
  }

  .review-comment {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.7;
    margin: 0;
  }

  .empty-note {
    font-size: 0.9rem;
    color: #94a3b8;
    font-style: italic;
    padding: 0.5rem 0;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════════
     RESPONSIVE
  ═══════════════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .top-section {
      grid-template-columns: 1fr;
    }

    .img-col {
      position: static;
    }

    .meal-img-wrap {
      aspect-ratio: 16 / 9;
    }
  }

  @media (max-width: 580px) {
    padding: 1.25rem 1rem 4rem;

    .content-block {
      padding: 1.25rem;
      border-radius: 14px;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .btn-cart,
    .btn-reminder {
      min-width: 0;
      width: 100%;
    }

    .ingredients-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default Wrapper;
