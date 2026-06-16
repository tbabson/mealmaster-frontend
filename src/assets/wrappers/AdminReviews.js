import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  background: #f8fafc;

  /* ── Error box ─────────────────────────────────────────────────── */
  .error-box {
    max-width: 480px;
    margin: 4rem auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 2.5rem;
    text-align: center;

    h3 { color: #ef4444; margin: 0 0 0.5rem; }
    p  { color: #64748b; margin: 0; }
  }

  /* ── Page wrapper ──────────────────────────────────────────────── */
  .page-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 1.75rem 1.75rem 5rem;
  }

  /* ── Page header ───────────────────────────────────────────────── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.2rem;

    .title-icon { color: #f59e0b; font-size: 1.45rem; }
  }

  .page-sub {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }

  .header-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 0.5rem 1.1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    .badge-num {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--darkest);
      line-height: 1.1;
    }

    .badge-label {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
    }
  }

  /* ── Filter bar ────────────────────────────────────────────────── */
  .filter-bar {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;

    .search-icon {
      position: absolute;
      left: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 0.8rem;
      pointer-events: none;
    }
  }

  .search-input {
    width: 100%;
    padding: 0.55rem 0.85rem 0.55rem 2.2rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    font-family: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder { color: #94a3b8; }
    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background: #fff;
    }
  }

  .filter-select {
    padding: 0.55rem 2rem 0.55rem 0.8rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 0.6rem center / 1em;
    appearance: none;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--primary);
    }
  }

  .clear-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1rem;
    background: #fff;
    border: 1.5px solid #fecaca;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #ef4444;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;

    &:hover { background: #ef4444; color: #fff; border-color: #ef4444; }
  }

  /* ── Empty state ───────────────────────────────────────────────── */
  .empty-state {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .empty-icon { font-size: 2.5rem; color: #cbd5e1; margin-bottom: 0.25rem; }
    h4 { font-size: 1.05rem; font-weight: 700; color: var(--darkest); margin: 0; }
    p  { font-size: 0.875rem; color: #64748b; margin: 0 0 0.5rem; }
  }

  /* ── Reviews list ──────────────────────────────────────────────── */
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  /* ── Review card ───────────────────────────────────────────────── */
  .review-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    display: flex;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover { box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); transform: translateY(-1px); }
    &.editing { box-shadow: 0 0 0 2px #3b82f6, 0 6px 20px rgba(59,130,246,0.12); transform: none; }
  }

  .card-accent {
    width: 4px;
    flex-shrink: 0;
    background: var(--accent, #94a3b8);
  }

  .card-body {
    flex: 1;
    padding: 1.25rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    min-width: 0;
  }

  /* ── View mode ─────────────────────────────────────────────────── */
  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .card-left { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }

  .meal-name {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent, #94a3b8);
    margin: 0;
  }

  .review-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 500px;
  }

  .star-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    .rating-num {
      font-size: 0.78rem;
      font-weight: 700;
      color: #64748b;
      margin-left: 0.25rem;
    }
  }

  .review-comment {
    font-size: 0.875rem;
    color: #475569;
    line-height: 1.65;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;

    .meta-reviewer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #475569;
    }

    .reviewer-init {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--darkest));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .meta-date {
      font-size: 0.78rem;
      color: #94a3b8;
    }
  }

  .card-actions {
    display: flex;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .act-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.18s;

    &.edit {
      background: #eff6ff;
      color: #3b82f6;
      &:hover { background: #3b82f6; color: #fff; }
    }

    &.del {
      background: #fef2f2;
      color: #ef4444;
      &:hover { background: #ef4444; color: #fff; }
    }
  }

  /* ── Edit mode ─────────────────────────────────────────────────── */
  .edit-context {
    font-size: 0.82rem;
    color: #64748b;
    margin: 0;
    padding: 0.5rem 0.75rem;
    background: #f0f9ff;
    border-radius: 7px;
    border-left: 3px solid #3b82f6;

    strong { color: var(--darkest); }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .field-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
  }

  .field-input {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
      background: #fff;
    }
  }

  .textarea-wrap {
    position: relative;
  }

  .field-textarea {
    min-height: 90px;
    resize: vertical;
    line-height: 1.55;
    padding-bottom: 1.75rem;
  }

  .char-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.7rem;
    font-size: 0.7rem;
    color: #94a3b8;
    pointer-events: none;
  }

  /* ── Star picker ───────────────────────────────────────────────── */
  .star-picker {
    display: flex;
    align-items: center;
    gap: 0.15rem;
  }

  .star-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.15rem;
    font-size: 1.4rem;
    color: #e2e8f0;
    transition: color 0.15s, transform 0.1s;
    line-height: 1;

    &.lit { /* color set inline */ }
    &:hover { transform: scale(1.15); }
  }

  .star-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    margin-left: 0.4rem;
  }

  /* ── Edit footer ───────────────────────────────────────────────── */
  .edit-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.65rem;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
  }

  .cancel-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1.1rem;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.18s;

    &:hover { border-color: #94a3b8; color: var(--darkest); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  .save-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1.25rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;

    &:hover:not(:disabled) { background: var(--darkest); transform: translateY(-1px); }
    &:disabled { opacity: 0.65; cursor: not-allowed; }
  }

  /* ── Pagination ────────────────────────────────────────────────── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 0.65rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.18s;

    &:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
    &.active { background: var(--primary); border-color: var(--primary); color: #fff; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
    &.icon { min-width: 36px; padding: 0; }
  }

  .ellipsis {
    display: inline-flex;
    align-items: center;
    height: 36px;
    color: #94a3b8;
    font-size: 0.9rem;
    padding: 0 0.15rem;
  }

  /* ── Responsive ────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .page-wrap { padding: 1.1rem 1rem 3rem; }
    .filter-bar { padding: 0.75rem; }
    .review-title { max-width: 240px; }
  }

  @media (max-width: 480px) {
    .filter-bar { flex-direction: column; align-items: stretch; }
    .search-wrap { min-width: 0; }
    .page-title { font-size: 1.4rem; }

    .card-top { flex-direction: column; gap: 0.75rem; }
    .card-actions { align-self: flex-end; }
    .review-title { max-width: 100%; white-space: normal; }
  }
`;

export default Wrapper;
