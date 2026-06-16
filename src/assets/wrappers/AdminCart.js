import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1.5rem 2rem 3rem;
  background: #f8fafc;
  min-height: 100vh;

  /* ── Page Header ── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.75rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.2rem;
  }

  .page-sub {
    font-size: 0.9rem;
    color: var(--dark);
    margin: 0;
  }

  /* ── Filter Bar ── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    background: #fff;
    padding: 1rem 1.25rem;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 1.25rem;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
  }

  .search-icon {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--dark);
    font-size: 0.85rem;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 0.55rem 0.85rem 0.55rem 2.25rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--secondary);
      background: #fff;
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  .filter-select {
    padding: 0.55rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--secondary);
    }
  }

  .search-btn {
    padding: 0.55rem 1.1rem;
    background: var(--secondary);
    color: #fff;
    border: none;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.88;
    }
  }

  .clear-btn {
    padding: 0.55rem 1.1rem;
    background: #f1f5f9;
    color: var(--dark);
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;

    &:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }
  }

  /* ── Table Card ── */
  .table-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .carts-table {
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    font-size: 0.875rem;

    thead tr {
      background: #f8fafc;
      border-bottom: 1.5px solid #e2e8f0;
    }

    th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--dark);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    td {
      padding: 0.85rem 1rem;
      color: var(--darkest);
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover td {
      background: #fafafa;
    }
  }

  .row-num {
    color: var(--dark);
    font-size: 0.8rem;
    font-weight: 600;
    width: 40px;
  }

  .mono {
    font-family: monospace;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--darkest);
    background: #f1f5f9;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  .customer-cell {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .customer-name {
    font-weight: 600;
    color: var(--darkest);
    font-size: 0.875rem;
  }

  .customer-email {
    font-size: 0.78rem;
    color: var(--dark);
  }

  .items-badge {
    display: inline-block;
    background: #eff6ff;
    color: #1e40af;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .total-cell {
    font-weight: 700;
    color: var(--secondary);
    white-space: nowrap;
  }

  .date-cell {
    font-size: 0.82rem;
    color: var(--dark);
    white-space: nowrap;
  }

  .action-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .view-btn,
  .del-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
  }

  .view-btn {
    background: #eff6ff;
    color: #1e40af;

    &:hover {
      background: var(--secondary);
      color: #fff;
    }
  }

  .del-btn {
    background: #fef2f2;
    color: #991b1b;

    &:hover {
      background: #dc2626;
      color: #fff;
    }
  }

  /* ── Loading / Empty ── */
  .loading-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1rem;
    color: var(--dark);
  }

  .spinner {
    width: 2.25rem;
    height: 2.25rem;
    border: 4px solid #e2e8f0;
    border-top-color: var(--secondary);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .empty-icon {
    font-size: 2.5rem;
    color: #cbd5e1;
  }

  /* ── Pagination ── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .page-nav {
    width: 34px;
    height: 34px;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.5rem;
    background: #fff;
    color: var(--darkest);
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s;

    &:hover:not(:disabled) {
      background: var(--secondary);
      color: #fff;
      border-color: var(--secondary);
    }

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }
  }

  .page-btn {
    min-width: 34px;
    height: 34px;
    padding: 0 0.5rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.5rem;
    background: #fff;
    color: var(--darkest);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, color 0.18s;

    &:hover {
      border-color: var(--secondary);
      color: var(--secondary);
    }

    &.active {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #fff;
    }
  }

  .ellipsis {
    color: var(--dark);
    padding: 0 0.2rem;
    font-size: 0.9rem;
    user-select: none;
  }

  .page-info {
    font-size: 0.82rem;
    color: var(--dark);
    margin-left: 0.25rem;
  }

  /* ═══════════════════════
     MODALS
  ═══════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(3px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.18s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .modal {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.22s ease;
    overflow: hidden;
  }

  @keyframes slideUp {
    from { transform: translateY(24px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* ── Modal Header ── */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.25rem 1.5rem;
    border-bottom: 1.5px solid #f1f5f9;
    flex-shrink: 0;
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.15rem;
  }

  .modal-sub {
    font-size: 0.82rem;
    color: var(--dark);
    margin: 0;
  }

  .modal-close {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: #f1f5f9;
    color: var(--dark);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    margin-left: 0.5rem;
    transition: background 0.18s, color 0.18s;

    &:hover {
      background: #e2e8f0;
      color: var(--darkest);
    }
  }

  /* ── Modal Body ── */
  .modal-body {
    overflow-y: auto;
    flex: 1;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .modal-section {
    /* spacing handled by gap */
  }

  .section-heading {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin: 0 0 0.75rem;
    padding-bottom: 0.4rem;
    border-bottom: 1.5px solid var(--secondary);
    display: inline-block;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .info-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .info-val {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--darkest);
    word-break: break-all;
  }

  /* ── Items List ── */
  .items-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .meal-block {
    background: #f8fafc;
    border-radius: 0.65rem;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }

  .meal-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }

  .meal-block-name {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--darkest);
  }

  .meal-block-total {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--secondary);
  }

  .ing-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.82rem;

    &:last-child {
      border-bottom: none;
    }
  }

  .ing-name {
    color: var(--darkest);
  }

  .ing-qty {
    color: var(--dark);
    font-size: 0.78rem;
    background: #e2e8f0;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-weight: 600;
    white-space: nowrap;
  }

  .ing-price {
    font-weight: 700;
    color: var(--darkest);
    white-space: nowrap;
    text-align: right;
    min-width: 70px;
  }

  /* ── Modal Summary ── */
  .modal-summary {
    background: #f8fafc;
    border-radius: 0.65rem;
    padding: 0.85rem 1rem;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--dark);

    strong {
      color: var(--darkest);
      font-weight: 700;
    }

    &.grand {
      margin-top: 0.35rem;
      padding-top: 0.6rem;
      border-top: 1.5px dashed #e2e8f0;
      font-size: 1rem;
      color: var(--darkest);
      font-weight: 700;

      strong {
        color: var(--secondary);
        font-size: 1.1rem;
      }
    }
  }

  /* ── Modal Footer ── */
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1.5px solid #f1f5f9;
    flex-shrink: 0;
  }

  .btn-close-modal {
    padding: 0.55rem 1.25rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    background: #fff;
    color: var(--darkest);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;

    &:hover {
      background: #f1f5f9;
    }
  }

  .btn-delete-modal {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1.25rem;
    border: none;
    border-radius: 0.55rem;
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;

    &:hover {
      background: #dc2626;
      color: #fff;
    }
  }

  /* ── Confirm Modal ── */
  .confirm-modal {
    max-width: 420px;
    padding: 2rem;
    align-items: center;
    text-align: center;
    gap: 0;
  }

  .confirm-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #fef3c7;
    color: #d97706;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .confirm-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.6rem;
  }

  .confirm-text {
    font-size: 0.9rem;
    color: var(--dark);
    margin: 0 0 1.5rem;
    line-height: 1.6;
  }

  .confirm-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    width: 100%;
  }

  .btn-cancel {
    padding: 0.6rem 1.5rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    background: #fff;
    color: var(--darkest);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;

    &:hover:not(:disabled) {
      background: #f1f5f9;
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  .btn-confirm-delete {
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 0.55rem;
    background: #dc2626;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.18s;

    &:hover:not(:disabled) {
      background: #b91c1c;
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    padding: 1rem;

    .page-title {
      font-size: 1.35rem;
    }

    .filter-bar {
      gap: 0.5rem;
    }

    .modal {
      max-height: 95vh;
    }
  }
`;

export default Wrapper;
