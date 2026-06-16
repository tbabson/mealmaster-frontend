import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1.75rem 2rem 3rem;
  background: #f8fafc;
  min-height: 100vh;

  /* ── Page header ── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.25rem;
  }

  .page-sub {
    font-size: 0.875rem;
    color: var(--dark);
    margin: 0;
  }

  /* ── Filter bar ── */
  .filter-bar {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-wrap {
    position: relative;
    width: 100%;

    .search-icon {
      position: absolute;
      left: 0.9rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--dark);
      font-size: 1rem;
      pointer-events: none;
    }

    .search-clear {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--dark);
      cursor: pointer;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      border-radius: 50%;
      transition: color 0.2s;
      &:hover { color: var(--secondary); }
    }
  }

  .search-input {
    width: 100%;
    padding: 0.65rem 2.5rem 0.65rem 2.5rem;
    border: 1.5px solid var(--grey-200);
    border-radius: 0.55rem;
    font-size: 0.9rem;
    color: var(--darkest);
    background: #fafafa;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;

    &:focus {
      border-color: var(--secondary);
      box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
      background: #fff;
    }

    &::placeholder { color: var(--grey-400); }
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: flex-end;
  }

  .select-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 160px;
    flex: 1;

    label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--dark);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    select {
      padding: 0.6rem 0.8rem;
      border: 1.5px solid var(--grey-200);
      border-radius: 0.55rem;
      font-size: 0.875rem;
      color: var(--darkest);
      background: #fafafa;
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s;

      &:focus { border-color: var(--secondary); }
    }
  }

  .clear-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.6rem 1rem;
    background: #fee2e2;
    color: #991b1b;
    border: none;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
    align-self: flex-end;

    &:hover { background: #fca5a5; }
  }

  /* ── Table card ── */
  .table-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    overflow: hidden;
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .orders-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    min-width: 900px;

    thead tr {
      background: #f8fafc;
      border-bottom: 2px solid #e2e8f0;
    }

    th {
      padding: 0.85rem 1rem;
      text-align: left;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--dark);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.15s;

      &:last-child { border-bottom: none; }
      &:hover { background: #fafafa; }
    }

    td {
      padding: 0.85rem 1rem;
      color: var(--darkest);
      vertical-align: middle;
    }
  }

  /* Table cell helpers */
  .order-id {
    font-family: monospace;
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--darkest);
    margin: 0 0 0.15rem;
    letter-spacing: 0.04em;
  }

  .order-track {
    font-size: 0.72rem;
    color: var(--dark);
    margin: 0;
  }

  .customer-name {
    font-weight: 600;
    color: var(--darkest);
    margin: 0 0 0.15rem;
    white-space: nowrap;
  }

  .customer-email {
    font-size: 0.75rem;
    color: var(--dark);
    margin: 0;
  }

  .items-count {
    display: inline-block;
    padding: 0.2rem 0.55rem;
    background: var(--primary-100, #e3f5e3);
    color: var(--darkest);
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
  }

  .amount {
    font-weight: 700;
    white-space: nowrap;
  }

  .date-cell {
    font-size: 0.82rem;
    color: var(--dark);
    white-space: nowrap;
  }

  /* Inline status selects */
  .inline-select {
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    appearance: none;
    text-align: center;
    min-width: 105px;

    &:focus { box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.3); }
    &:disabled { opacity: 0.6; cursor: wait; }
  }

  /* Payment toggle */
  .pay-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.65rem;
    border: none;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;

    &:hover:not(:disabled) { opacity: 0.82; transform: scale(1.04); }
    &:disabled { opacity: 0.6; cursor: wait; }

    &.paid   { background: #dcfce7; color: #166534; }
    &.unpaid { background: #fee2e2; color: #991b1b; }
  }

  /* View button */
  .view-btn {
    width: 34px;
    height: 34px;
    border-radius: 0.45rem;
    border: 1.5px solid var(--grey-200);
    background: #fff;
    color: var(--dark);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s, border-color 0.2s, color 0.2s;

    &:hover {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #fff;
    }
  }

  /* ── Status badges (modal) ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    .badge-icon { display: flex; align-items: center; }
  }

  /* ── Loading / empty ── */
  .loading-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1rem;
    color: var(--dark);
    text-align: center;
  }

  .spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--primary-200, #c8eac9);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Pagination ── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.25rem 1rem;
    border-top: 1px solid #f1f5f9;
  }

  .page-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.85rem;
    background: #fff;
    border: 1.5px solid var(--grey-200);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--darkest);
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #fff;
    }

    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .page-num {
    width: 36px;
    height: 36px;
    border-radius: 0.45rem;
    border: 1.5px solid var(--grey-200);
    background: #fff;
    color: var(--darkest);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover { background: var(--primary-100, #e3f5e3); }
    &.active {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #fff;
    }
  }

  .dots {
    padding: 0 0.2rem;
    color: var(--dark);
    font-size: 0.875rem;
    line-height: 36px;
  }

  /* ═══════════════════════════════
     MODAL
  ═══════════════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: #fff;
    border-radius: 1rem;
    width: 100%;
    max-width: 860px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.22);
    animation: slideUp 0.22s ease;

    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-thumb { background: var(--grey-200); border-radius: 4px; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Modal header */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem 1.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.5rem;
  }

  .modal-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    font-size: 0.82rem;
    color: var(--dark);
  }

  .modal-id {
    font-family: monospace;
    font-weight: 700;
    color: var(--darkest);
    letter-spacing: 0.06em;
  }

  .modal-track {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--dark);
  }

  .modal-close {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1.5px solid var(--grey-200);
    background: #fff;
    color: var(--dark);
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;

    &:hover { background: var(--secondary); color: #fff; border-color: var(--secondary); }
  }

  /* Modal badges row */
  .modal-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    padding: 0.85rem 1.75rem;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
  }

  .pay-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;

    &.paid   { background: #dcfce7; color: #166534; }
    &.unpaid { background: #fee2e2; color: #991b1b; }
  }

  /* Modal body two-col layout */
  .modal-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;

    @media (min-width: 640px) {
      grid-template-columns: 1fr 340px;
    }
  }

  .modal-left {
    padding: 1.5rem 1.75rem;
    border-right: 1px solid #f1f5f9;

    @media (max-width: 639px) { border-right: none; border-bottom: 1px solid #f1f5f9; }
  }

  .modal-right {
    padding: 1.5rem 1.5rem;
    background: #fafafa;
    border-radius: 0 0 1rem 0;
  }

  /* Modal sections */
  .modal-section {
    margin-bottom: 1.5rem;

    &:last-child { margin-bottom: 0; }
  }

  .modal-section-title {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--dark);
    margin: 0 0 0.85rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondary);
  }

  /* Items */
  .item-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .item-row {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 0.85rem;
    align-items: start;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid #f1f5f9;

    &:last-child { border-bottom: none; padding-bottom: 0; }
  }

  .item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  .item-name {
    font-weight: 700;
    color: var(--darkest);
    font-size: 0.9rem;
    margin: 0 0 0.35rem;
  }

  .ing-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      color: var(--dark);
      padding: 0.1rem 0;
    }
  }

  .ing-price {
    font-weight: 600;
    color: var(--darkest);
    margin-left: 0.5rem;
  }

  .item-total {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--darkest);
    white-space: nowrap;
    margin: 0;
  }

  /* Address */
  .address-block {
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--dark);

    p { margin: 0; }
  }

  .addr-name {
    font-weight: 700;
    color: var(--darkest) !important;
    margin-bottom: 0.15rem !important;
  }

  .addr-phone {
    color: var(--secondary) !important;
    font-weight: 600;
    margin-top: 0.2rem !important;
  }

  /* Summary */
  .summary-section {
    background: #fff;
    border-radius: 0.65rem;
    padding: 1rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 1rem;
  }

  .summary-rows { display: flex; flex-direction: column; gap: 0.5rem; }

  .sum-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--dark);
    padding: 0.3rem 0;

    &:not(:last-child) { border-bottom: 1px solid #f1f5f9; }
  }

  .total-row {
    padding-top: 0.6rem !important;
    font-size: 0.95rem;
    color: var(--darkest) !important;
    strong { font-size: 1.05rem; }
  }

  .capitalize { text-transform: capitalize; }

  /* Controls */
  .controls-section {
    background: #fff;
    border-radius: 0.65rem;
    padding: 1rem;
    box-shadow: var(--shadow-1);
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.85rem;

    label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--dark);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    select {
      padding: 0.55rem 0.75rem;
      border: 1.5px solid var(--grey-200);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: var(--darkest);
      background: #fafafa;
      outline: none;
      cursor: pointer;
      transition: border-color 0.2s;

      &:focus { border-color: var(--secondary); }
      &:disabled { opacity: 0.6; cursor: wait; }
    }
  }

  .payment-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    padding: 0.65rem;
    border: none;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 0.25rem;

    &.is-paid   { background: #fee2e2; color: #991b1b; }
    &.is-unpaid { background: #dcfce7; color: #166534; }

    &:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
    &:disabled { opacity: 0.6; cursor: wait; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    padding: 1rem;

    .filter-row { flex-direction: column; }
    .select-wrap { min-width: unset; }
    .clear-btn { align-self: stretch; justify-content: center; }
    .modal-left { padding: 1.25rem 1rem; }
    .modal-right { padding: 1.25rem 1rem; border-radius: 0 0 1rem 1rem; }
    .modal-header { padding: 1.25rem 1rem 1rem; }
    .modal-badges { padding: 0.85rem 1rem; }
    .item-row { grid-template-columns: 50px 1fr auto; }
  }
`;

export default Wrapper;
