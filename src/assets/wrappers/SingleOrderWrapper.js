import styled from "styled-components";

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;

  /* ── Not found ── */
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-height: 50vh;
    justify-content: center;
    text-align: center;

    .nf-icon { font-size: 4rem; color: var(--primary); opacity: 0.4; }
    h2 { font-size: 1.4rem; color: var(--darkest); }
  }

  /* ── Back link ── */
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1.5rem;
    transition: color 0.2s;

    &:hover { color: var(--primary); }
    svg { font-size: 0.95rem; }
  }

  .back-btn {
    margin-top: 0.5rem;
    padding: 0.65rem 1.5rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: var(--darkest); }
  }

  /* ── Hero header ── */
  .order-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    background: #fff;
    border-radius: 0.85rem;
    padding: 1.5rem 1.75rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    margin-bottom: 1.75rem;
    border-left: 4px solid var(--primary);
  }

  .hero-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--darkest);
    margin-bottom: 0.6rem;
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--dark);

    strong { color: var(--darkest); font-weight: 600; }
  }

  .mono {
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.05em;
    font-weight: 700;
    color: var(--primary);
    font-size: 0.88rem;
  }

  .hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    svg { font-size: 0.82rem; }
  }

  /* ── Layout grid ── */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: start;

    @media (min-width: 768px) {
      grid-template-columns: 3fr 2fr;
    }
  }

  .left-col, .right-col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .right-col {
    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
    }
  }

  /* ── Section cards ── */
  .section-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    overflow: hidden;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.25rem;
    border-bottom: 2px solid var(--primary);
    background: #fafafa;

    h2 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--darkest);
      margin: 0;
    }

    .section-icon {
      font-size: 1.15rem;
      color: var(--primary);
    }
  }

  /* ── Meal list ── */
  .meal-list {
    display: flex;
    flex-direction: column;
  }

  .meal-item {
    display: flex;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;

    &:last-child { border-bottom: none; }
  }

  .meal-img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  .meal-info {
    flex: 1;
    min-width: 0;
  }

  .meal-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .meal-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
    text-transform: capitalize;
  }

  .meal-price {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--primary);
    white-space: nowrap;
  }

  .ing-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ing-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--dark);
    padding: 0.25rem 0.5rem;
    border-radius: 0.3rem;
    background: #f8fafc;
  }

  /* ── Review ── */
  .review-section {
    margin-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
    padding-top: 0.75rem;
  }

  .review-done {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #166534;
    background: #dcfce7;
    padding: 0.45rem 0.75rem;
    border-radius: 0.4rem;
    border: 1px solid #bbf7d0;
    svg { color: #16a34a; }
  }

  .review-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--primary);
    background: none;
    border: 1.5px solid var(--primary);
    border-radius: 0.4rem;
    padding: 0.4rem 0.85rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &:hover { background: var(--primary); color: #fff; }

    .chevron {
      margin-left: auto;
      transition: transform 0.2s;
      &.open { transform: rotate(180deg); }
    }
  }

  .review-form {
    margin-top: 0.85rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.55rem;
    border: 1.5px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .star-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .star-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--darkest);
  }

  .stars {
    display: flex;
    gap: 0.2rem;
  }

  .star {
    font-size: 1.6rem;
    color: #d1d5db;
    cursor: pointer;
    transition: color 0.15s;
    user-select: none;
    &.on { color: #f59e0b; }
    &:hover { color: #fbbf24; }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
      font-size: 0.83rem;
      font-weight: 600;
      color: var(--darkest);
    }

    .optional {
      font-weight: 400;
      color: var(--dark);
    }

    input, textarea {
      width: 100%;
      padding: 0.55rem 0.75rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.4rem;
      font-size: 0.9rem;
      background: #fff;
      color: var(--darkest);
      transition: border-color 0.2s;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(72,187,120,0.12);
      }

      &::placeholder { color: #a0aec0; }
    }

    textarea { resize: vertical; min-height: 80px; }
  }

  .review-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .submit-review {
    padding: 0.55rem 1.25rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover:not(:disabled) { background: var(--darkest); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  .cancel-review {
    padding: 0.55rem 1.25rem;
    background: #f1f5f9;
    color: var(--dark);
    border: 1.5px solid #e2e8f0;
    border-radius: 0.4rem;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #e2e8f0; }
  }

  /* ── Shipping address ── */
  .address-block {
    padding: 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    p {
      font-size: 0.92rem;
      color: var(--darkest);
      text-transform: capitalize;
    }

    .address-name {
      font-weight: 700;
      font-size: 1rem;
    }

    .address-phone {
      margin-top: 0.25rem;
      color: var(--dark);
      font-size: 0.88rem;
    }
  }

  /* ── Summary card ── */
  .summary-rows {
    padding: 0.75rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--dark);
    border-bottom: 1px solid #f8fafc;

    &:last-child { border-bottom: none; }

    span:last-child { font-weight: 600; color: var(--darkest); }
  }

  .total-row {
    margin-top: 0.4rem;
    padding-top: 0.75rem !important;
    border-top: 2px solid var(--primary) !important;
    font-size: 1rem !important;
    font-weight: 700;
    color: var(--darkest);

    span { font-size: 1rem; }
    span:last-child { color: var(--primary) !important; }
  }

  .info-rows {
    padding: 0.85rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .info-icon {
    font-size: 1rem;
    color: var(--primary);
    flex-shrink: 0;
  }

  .info-label {
    display: block;
    font-size: 0.75rem;
    color: var(--dark);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .info-val {
    display: block;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--darkest);
    &.capitalize { text-transform: capitalize; }
  }

  .payment-status {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;

    &.paid   { background: #dcfce7; color: #166534; }
    &.unpaid { background: #fef9c3; color: #854d0e; }
  }
`;

export default Wrapper;
