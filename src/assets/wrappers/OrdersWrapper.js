import styled from "styled-components";

const Wrapper = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;

  /* ── Header ── */
  .page-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 2rem;
    padding-bottom: 0.85rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    font-size: 1.7rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0;
  }

  .count-badge {
    background: var(--primary);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
  }

  /* ── Empty state ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    gap: 0.85rem;

    .empty-icon {
      font-size: 5rem;
      color: var(--primary);
      opacity: 0.35;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--darkest);
    }

    p {
      color: var(--dark);
      font-size: 0.95rem;
      max-width: 300px;
    }
  }

  .browse-btn {
    margin-top: 0.4rem;
    padding: 0.75rem 2rem;
    background: var(--primary);
    color: #fff;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background 0.2s, transform 0.15s;

    &:hover {
      background: var(--secondary);
      transform: translateY(-1px);
    }
  }

  /* ── Grid ── */
  .orders-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ── Card ── */
  .order-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-3px);
    }
  }

  /* Card header */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 1.1rem 0.85rem;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
    gap: 0.5rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  }

  .order-num {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--darkest);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
  }

  .order-date {
    font-size: 0.75rem;
    color: var(--dark);
  }

  /* ── Status badges ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;

    svg {
      font-size: 0.8rem;
    }

    &.pending {
      background: #fef9c3;
      color: #854d0e;
    }

    &.processing {
      background: #dbeafe;
      color: #1e40af;
    }

    &.processed {
      background: #ffedd5;
      color: #9a3412;
    }

    &.delivered {
      background: #dcfce7;
      color: #166534;
    }

    &.cancelled {
      background: #fee2e2;
      color: #991b1b;
    }
  }

  /* Card body */
  .card-body {
    padding: 1rem 1.1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .meal-previews {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .image-stack {
    display: flex;
    align-items: center;
  }

  .preview-img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    object-fit: cover;
    border: 2px solid #fff;
    margin-right: -0.6rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }

  .more-count {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    background: var(--primary);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    margin-right: -0.6rem;
  }

  .meal-label {
    margin-left: 0.9rem;
    font-size: 0.85rem;
    color: var(--dark);
    font-weight: 500;
  }

  .card-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .delivery-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;

    svg { font-size: 0.78rem; }

    &.scheduled       { background: #e0f2fe; color: #0369a1; }
    &.clearing        { background: #fef3c7; color: #92400e; }
    &.out-for-delivery { background: #ede9fe; color: #5b21b6; }
    &.delivered       { background: #dcfce7; color: #166534; }
    &.failed          { background: #fee2e2; color: #991b1b; }
  }

  .payment-dot {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;

    &.paid   { background: #dcfce7; color: #166534; }
    &.unpaid { background: #fef9c3; color: #854d0e; }
  }

  /* Card footer */
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1.1rem;
    border-top: 1px solid #f1f5f9;
    background: #fafafa;
  }

  .order-total {
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
  }

  .details-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--primary);
    transition: gap 0.2s, color 0.2s;

    &:hover {
      color: var(--secondary);
      gap: 0.5rem;
    }

    svg { font-size: 0.9rem; }
  }

  /* ═══════════════════════════════════════════════════════
     GUEST / NOT LOGGED IN SCREEN
  ═══════════════════════════════════════════════════════ */
  .guest-screen {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
  }

  .guest-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
    padding: 3rem 2.5rem;
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .guest-avatar {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff8a65 0%, #ff5722 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2rem;
    box-shadow: 0 4px 18px rgba(255, 87, 34, 0.28);
    flex-shrink: 0;
  }

  .guest-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
    line-height: 1.2;
  }

  .guest-sub {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.65;
    margin: 0;
    max-width: 380px;
  }

  .guest-features {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    text-align: left;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    border: 1px solid #f1f5f9;
    background: #fafbfc;
    transition: border-color 0.15s, background 0.15s;
  }

  .feature-item:hover {
    border-color: rgba(255, 87, 34, 0.2);
    background: #fff9f7;
  }

  .feature-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .status-icon  { background: #fef9c3; color: #b45309; }
  .history-icon { background: #dbeafe; color: #1e40af; }
  .reorder-icon { background: #dcfce7; color: #166534; }

  .feature-label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.15rem;
  }

  .feature-desc {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.4;
  }

  .guest-actions {
    display: flex;
    gap: 0.85rem;
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-login {
    flex: 1;
    padding: 0.85rem 1.5rem;
    border-radius: 10px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 3px 12px rgba(255, 87, 34, 0.3);
    min-width: 120px;

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }
  }

  .btn-register {
    flex: 1;
    padding: 0.85rem 1.5rem;
    border-radius: 10px;
    background: transparent;
    color: #ff5722;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    border: 2px solid #ff5722;
    transition: background 0.15s, color 0.15s, transform 0.15s;
    min-width: 120px;

    &:hover {
      background: #fff5f2;
      transform: translateY(-1px);
    }
  }

  .guest-footer-text {
    font-size: 0.82rem;
    color: #94a3b8;
    margin: 0;
  }

  .inline-link {
    color: var(--secondary, #ff5722);
    font-weight: 600;
    text-decoration: none;

    &:hover { text-decoration: underline; }
  }

  @media (max-width: 480px) {
    .guest-card {
      padding: 2rem 1.25rem;
    }
    .guest-actions {
      flex-direction: column;
    }
  }
`;

export default Wrapper;
