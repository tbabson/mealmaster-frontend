import styled from "styled-components";

const Wrapper = styled.div`
  /* ── Result header ─────────────────────────────── */
  .result-header {
    margin-bottom: 1.1rem;
  }

  .result-count {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    background: #f1f5f9;
    padding: 0.3rem 0.75rem;
    border-radius: 20px;
  }

  /* ── Meals grid ────────────────────────────────── */
  .meals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 1.1rem;
  }

  /* ── Empty state ───────────────────────────────── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  }

  .empty-icon {
    font-size: 3.5rem;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 0.5rem;
  }

  .empty-state p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0 0 1.5rem;
  }

  .clear-btn {
    display: inline-block;
    padding: 0.6rem 1.5rem;
    background: var(--primary);
    color: #fff;
    border-radius: 25px;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 700;
    transition: background 0.2s, transform 0.15s;

    &:hover {
      background: var(--darkest);
      transform: translateY(-1px);
    }
  }

  /* ── Responsive ────────────────────────────────── */
  @media (max-width: 640px) {
    .meals-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 0.85rem;
    }
  }
`;

export default Wrapper;
