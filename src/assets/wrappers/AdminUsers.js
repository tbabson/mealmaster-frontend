import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  background: #f8fafc;

  /* ── Shared avatar ─────────────────────────────────────────────── */
  .avatar-img,
  .avatar-init {
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
  }

  .avatar-img.sm, .avatar-init.sm { width: 42px; height: 42px; }
  .avatar-img.lg, .avatar-init.lg { width: 88px; height: 88px; }

  .avatar-init {
    background: linear-gradient(135deg, var(--primary), var(--darkest));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;

    &.sm { font-size: 1rem; }
    &.lg { font-size: 2rem; }
  }

  /* ── Role badge ────────────────────────────────────────────────── */
  .role-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: capitalize;
    padding: 0.22rem 0.65rem;
    border-radius: 20px;
    white-space: nowrap;

    svg { font-size: 0.65rem; }
  }

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
    p  { color: #64748b; margin: 0 0 1.5rem; }
  }

  /* ══════════════════════════════════════════════════════════════
     LIST VIEW
  ══════════════════════════════════════════════════════════════ */
  .list-view {
    max-width: 1100px;
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

    .title-icon { color: var(--secondary); font-size: 1.5rem; }
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
    min-width: 200px;

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

  /* ── Users table ───────────────────────────────────────────────── */
  .users-table {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .table-head {
    display: grid;
    grid-template-columns: 1fr 130px 130px 100px;
    padding: 0.8rem 1.25rem;
    background: #f1f5f9;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    border-bottom: 1px solid #e2e8f0;

    @media (max-width: 680px) {
      display: none;
    }
  }

  .user-row {
    display: grid;
    grid-template-columns: 1fr 130px 130px 100px;
    align-items: center;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;
    gap: 0.5rem;

    &:last-child { border-bottom: none; }
    &:hover { background: #f8fafc; }

    @media (max-width: 680px) {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      gap: 0.5rem 1rem;

      .role-badge { grid-row: 2; grid-column: 1; }
      .ur-date    { display: none; }
      .ur-actions { grid-row: 1 / 3; grid-column: 2; align-self: center; }
    }
  }

  .ur-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;

    .ur-name {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--darkest);
      margin: 0 0 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ur-email {
      font-size: 0.78rem;
      color: #64748b;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ur-date {
    font-size: 0.8rem;
    color: #64748b;
  }

  .ur-actions {
    display: flex;
    gap: 0.4rem;
    justify-content: flex-end;
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

    &.view {
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
    p  { font-size: 0.875rem; color: #64748b; margin: 0; }
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

    &:hover:not(:disabled) {
      border-color: var(--primary);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

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

  /* ══════════════════════════════════════════════════════════════
     DETAIL VIEW
  ══════════════════════════════════════════════════════════════ */
  .detail-view {
    max-width: 860px;
    margin: 0 auto;
    padding: 1.75rem 1.75rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Detail topbar ─────────────────────────────────────────────── */
  .detail-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.15rem;
    background: var(--darkest);
    color: #fff;
    border: none;
    border-radius: 9px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;

    &:hover { background: #0f2210; transform: translateY(-1px); }
  }

  .danger-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1.1rem;
    background: #fef2f2;
    color: #ef4444;
    border: 1.5px solid #fecaca;
    border-radius: 9px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;

    &:hover { background: #ef4444; color: #fff; border-color: #ef4444; }
  }

  /* ── Profile hero card ─────────────────────────────────────────── */
  .profile-hero {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: linear-gradient(135deg, #143315 0%, #0f2210 100%);
    border-radius: 16px;
    padding: 1.75rem 2rem;

    @media (max-width: 600px) {
      flex-direction: column;
      text-align: center;
      align-items: center;

      .hero-meta { justify-content: center; }
    }
  }

  .hero-info {
    flex: 1;

    .hero-name {
      font-size: 1.5rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 0.4rem;
    }

    .hero-email {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 0.65rem;

      .hi { font-size: 0.75rem; }
    }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;

      .hero-date {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);

        .hi { font-size: 0.7rem; }
      }
    }
  }

  /* ── Stats strip ───────────────────────────────────────────────── */
  .stats-strip {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .stat-chip {
    flex: 1;
    min-width: 120px;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 0.85rem 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    .chip-num {
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.1;
    }

    .chip-label {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
    }
  }

  /* ── Data sections ─────────────────────────────────────────────── */
  .data-section {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    background: #f8fafc;

    .si { color: var(--secondary); font-size: 0.85rem; }
  }

  .data-rows {
    display: flex;
    flex-direction: column;
  }

  .data-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;

    &:last-child { border-bottom: none; }
    &:hover { background: #f8fafc; }

    .dr-left {
      min-width: 0;

      .dr-title {
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--darkest);
        margin: 0 0 0.15rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dr-sub {
        font-size: 0.775rem;
        color: #64748b;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }

    .dr-right {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-shrink: 0;
    }

    .dr-amount {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--darkest);
      white-space: nowrap;
    }
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: capitalize;
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    white-space: nowrap;
  }

  .method-chip {
    display: inline-flex;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: capitalize;
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    background: #eff6ff;
    color: #3b82f6;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Responsive ────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .list-view,
    .detail-view { padding: 1.1rem 1rem 3rem; }

    .filter-bar { padding: 0.75rem; }

    .stats-strip { gap: 0.5rem; }

    .stat-chip { min-width: 100px; }
  }

  @media (max-width: 480px) {
    .page-title { font-size: 1.4rem; }
    .filter-bar { flex-direction: column; align-items: stretch; }
    .search-wrap { min-width: 0; }
  }
`;

export default Wrapper;
