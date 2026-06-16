import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 1.5rem 2rem 3rem;
  background: #f8fafc;
  min-height: 100vh;

  /* ── Loading / Error ── */
  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1rem;
    color: var(--dark);
  }

  .spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 4px solid var(--primary-200);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Header ── */
  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .dash-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.2rem;
  }

  .dash-sub {
    font-size: 0.95rem;
    color: var(--dark);
    margin: 0;
    strong { color: var(--darkest); }
  }

  .dash-date {
    font-size: 0.85rem;
    color: var(--dark);
    background: #fff;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    box-shadow: var(--shadow-1);
    white-space: nowrap;
    align-self: center;
  }

  /* ── Stat Cards ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.75rem;

    @media (min-width: 640px)  { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(6, 1fr); }
  }

  .stat-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    padding: 1.1rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
    border-left: 4px solid var(--accent, var(--primary));
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-3);

      .stat-arrow { opacity: 1; transform: translateX(0); }
    }
  }

  .stat-icon {
    font-size: 1.5rem;
    color: var(--accent, var(--primary));
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: color-mix(in srgb, var(--accent, var(--primary)) 12%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-body {
    flex: 1;
    min-width: 0;
  }

  .stat-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-value {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0;
    line-height: 1.1;
  }

  .stat-sub {
    font-size: 0.72rem;
    color: var(--dark);
    margin: 0.15rem 0 0;
  }

  .stat-arrow {
    font-size: 0.75rem;
    color: var(--accent, var(--primary));
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.2s, transform 0.2s;
    flex-shrink: 0;
  }

  /* ── Chart rows ── */
  .charts-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) { grid-template-columns: 2fr 1fr; }
  }

  .chart-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    padding: 1.25rem 1.5rem;

    &.wide { /* spans naturally in the grid */ }
  }

  .chart-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondary);
    display: inline-block;
  }

  .empty-chart {
    text-align: center;
    color: var(--dark);
    padding: 3rem 0;
    font-size: 0.9rem;
  }

  /* ── Recent Orders ── */
  .section-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
  }

  .section-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondary);
  }

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--secondary);
    text-decoration: none;
    transition: gap 0.2s;

    &:hover { gap: 0.55rem; }
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .recent-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;

    th {
      text-align: left;
      padding: 0.65rem 0.85rem;
      background: #f8fafc;
      color: var(--dark);
      font-weight: 600;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    td {
      padding: 0.75rem 0.85rem;
      color: var(--darkest);
      border-bottom: 1px solid #f1f5f9;
      white-space: nowrap;
    }

    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: #fafafa; }
  }

  .mono {
    font-family: monospace;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .empty-row {
    text-align: center;
    color: var(--dark);
    padding: 2rem !important;
  }

  .status-pill {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;

    &.pending    { background: #fef9c3; color: #854d0e; }
    &.processing { background: #dbeafe; color: #1e40af; }
    &.processed  { background: #ffedd5; color: #9a3412; }
    &.delivered  { background: #dcfce7; color: #166534; }
    &.cancelled  { background: #fee2e2; color: #991b1b; }
  }

  /* ── Quick Links ── */
  .quick-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .quick-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.1rem;
    background: var(--primary-50, #f3faf3);
    color: var(--darkest);
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    border: 1.5px solid var(--primary-200, #c8eac9);
    transition: background 0.2s, border-color 0.2s, color 0.2s;

    .ql-icon { color: var(--secondary); font-size: 1rem; }

    &:hover {
      background: var(--secondary);
      color: #fff;
      border-color: var(--secondary);

      .ql-icon { color: #fff; }
    }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    padding: 1rem;

    .dash-header { flex-direction: column; }
    .stat-value  { font-size: 1.1rem; }
    .chart-card  { padding: 1rem; }
    .section-card { padding: 1rem; }
  }
`;

export default Wrapper;
