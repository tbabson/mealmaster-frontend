import styled from "styled-components";

const Wrapper = styled.div`
  background: #f8fafc;
  min-height: 100vh;

  /* ═══════════════════════════════
     LIST VIEW
  ═══════════════════════════════ */
  .list-page {
    padding: 1.5rem 2rem 3rem;
  }

  /* ── Page Header ── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.75rem;
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

  .create-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: var(--secondary);
    color: #fff;
    border: none;
    border-radius: 0.6rem;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.18s;
    align-self: center;

    &:hover { opacity: 0.88; }
  }

  /* ── Filter Bar ── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    align-items: center;
    background: #fff;
    padding: 0.9rem 1.25rem;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 1.25rem;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
  }

  .search-icon {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--dark);
    font-size: 0.8rem;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 0.52rem 0.85rem 0.52rem 2.2rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s;

    &:focus { border-color: var(--secondary); background: #fff; }
    &::placeholder { color: #94a3b8; }
  }

  .filter-input {
    padding: 0.52rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s;
    min-width: 110px;

    &:focus { border-color: var(--secondary); }
    &::placeholder { color: #94a3b8; }
  }

  .filter-select {
    padding: 0.52rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;

    &:focus { border-color: var(--secondary); }
  }

  .clear-btn {
    padding: 0.52rem 1rem;
    background: #f1f5f9;
    color: var(--dark);
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
    white-space: nowrap;

    &:hover { background: #e2e8f0; }
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

  .meals-table {
    width: 100%;
    min-width: 820px;
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
      padding: 0.8rem 1rem;
      color: var(--darkest);
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }

    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: #fafafa; }
  }

  .row-num {
    color: var(--dark);
    font-size: 0.8rem;
    font-weight: 600;
    width: 40px;
  }

  .meal-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .meal-thumb {
    width: 48px;
    height: 48px;
    border-radius: 0.55rem;
    object-fit: cover;
    flex-shrink: 0;
    background: #f1f5f9;
  }

  .meal-name {
    font-weight: 700;
    color: var(--darkest);
    font-size: 0.9rem;
  }

  .type-pill {
    display: inline-block;
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .country-cell {
    font-size: 0.875rem;
    color: var(--dark);
  }

  .dietary-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .dietary-tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .recommended-cell {
    white-space: nowrap;
  }

  .rec-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: #fef9c3;
    color: #854d0e;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .no-rec {
    color: #cbd5e1;
    font-size: 1rem;
  }

  .action-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .edit-btn,
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

  .edit-btn {
    background: #eff6ff;
    color: #1e40af;
    &:hover { background: var(--secondary); color: #fff; }
  }

  .del-btn {
    background: #fef2f2;
    color: #991b1b;
    &:hover { background: #dc2626; color: #fff; }
  }

  /* ── Loading / Empty ── */
  .loading-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 0.75rem;
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

  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-emoji { font-size: 2.5rem; }

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

    &:hover:not(:disabled) { background: var(--secondary); color: #fff; border-color: var(--secondary); }
    &:disabled { opacity: 0.35; cursor: default; }
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

    &:hover { border-color: var(--secondary); color: var(--secondary); }
    &.active { background: var(--secondary); border-color: var(--secondary); color: #fff; }
  }

  .ellipsis { color: var(--dark); padding: 0 0.2rem; font-size: 0.9rem; user-select: none; }
  .page-info { font-size: 0.82rem; color: var(--dark); margin-left: 0.25rem; }


  /* ═══════════════════════════════
     FORM VIEW
  ═══════════════════════════════ */
  .form-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── Sticky top bar ── */
  .form-topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 2rem;
    background: #fff;
    border-bottom: 1.5px solid #e2e8f0;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    background: #f1f5f9;
    color: var(--dark);
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s;

    &:hover { background: #e2e8f0; }
  }

  .form-title {
    flex: 1;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form-top-actions {
    display: flex;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  /* ── Form Body ── */
  .form-body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
  }

  .form-bottom-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 2rem;
  }

  /* ── Form cards (sections) ── */
  .form-card {
    background: #fff;
    border-radius: 0.85rem;
    box-shadow: var(--shadow-1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-section-title {
    font-size: 1rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid var(--secondary);
    display: inline-block;
  }

  .section-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* ── Field groups ── */
  .field-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 0.25rem;

    &.two-col   { grid-template-columns: 1fr 1fr; }
    &.three-col { grid-template-columns: 1fr 1fr 1fr; }
    &.no-mb     { margin-bottom: 0; }

    @media (max-width: 600px) {
      &.two-col, &.three-col { grid-template-columns: 1fr; }
    }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .req { color: var(--secondary); margin-left: 2px; }

  .field-input {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;

    &:focus { border-color: var(--secondary); background: #fff; }
    &::placeholder { color: #94a3b8; }
    &.sm { padding: 0.45rem 0.75rem; font-size: 0.82rem; }

    &[type="file"] {
      padding: 0.45rem 0.75rem;
      cursor: pointer;
    }
  }

  .field-textarea {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    outline: none;
    width: 100%;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus { border-color: var(--secondary); background: #fff; }
    &::placeholder { color: #94a3b8; }
  }

  /* ── Toggle switch ── */
  .toggle-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
    padding: 0.6rem 0;
  }

  .toggle-switch {
    width: 44px;
    height: 24px;
    border-radius: 999px;
    background: #e2e8f0;
    position: relative;
    flex-shrink: 0;
    transition: background 0.2s;
    cursor: pointer;

    &.on { background: var(--secondary); }
  }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    transition: transform 0.2s;

    .toggle-switch.on & { transform: translateX(20px); }
  }

  .toggle-label {
    font-size: 0.875rem;
    color: var(--dark);
  }

  /* ── Dietary checkboxes ── */
  .dietary-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .dietary-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    background: #f8fafc;
    color: var(--dark);
    user-select: none;
    transition: background 0.18s, border-color 0.18s, color 0.18s;

    input[type="checkbox"] { display: none; }

    &.selected {
      background: var(--secondary);
      border-color: var(--secondary);
      color: #fff;
    }

    &:hover:not(.selected) {
      border-color: var(--secondary);
      color: var(--secondary);
    }
  }

  /* ── Image upload ── */
  .image-upload-area {
    border: 2px dashed #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;

    &:hover { border-color: var(--secondary); }
  }

  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    color: var(--dark);
    font-size: 0.875rem;
    pointer-events: none;
  }

  .image-placeholder-icon {
    font-size: 2.5rem;
    color: #cbd5e1;
  }

  .image-hint {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .change-image-btn {
    display: inline-block;
    margin-top: 0.5rem;
    background: none;
    border: none;
    color: var(--secondary);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
  }

  /* ── Sub-cards (ingredient / step) ── */
  .sub-card {
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.7rem;
    padding: 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .step-card { border-left: 3px solid var(--secondary); }

  .sub-card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .sub-card-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--secondary);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sub-card-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--darkest);
    flex: 1;
  }

  .remove-icon-btn {
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 5px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.18s;

    &:hover { background: #dc2626; color: #fff; }
  }

  .add-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    background: #eff6ff;
    color: #1e40af;
    border: 1.5px solid #bfdbfe;
    border-radius: 0.55rem;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s;

    &:hover { background: var(--secondary); color: #fff; border-color: var(--secondary); }
  }

  /* ── Substitutions ── */
  .substitutions {
    background: #fff;
    border-radius: 0.55rem;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .sub-section-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.25rem;
  }

  .sub-row {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .sub-row .field-grid { flex: 1; margin-bottom: 0; }

  .remove-sub-btn {
    width: 28px;
    height: 36px;
    border: none;
    border-radius: 5px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.18s;
    margin-bottom: 0;

    &:hover { background: #dc2626; color: #fff; }
  }

  .add-sub-btn {
    background: none;
    border: none;
    color: var(--secondary);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    text-align: left;

    &:hover { text-decoration: underline; }
  }

  /* ── Form action buttons ── */
  .btn-save {
    padding: 0.58rem 1.35rem;
    background: var(--secondary);
    color: #fff;
    border: none;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.18s;
    white-space: nowrap;

    &:hover:not(:disabled) { opacity: 0.88; }
    &:disabled { opacity: 0.55; cursor: default; }
  }

  .btn-cancel {
    padding: 0.58rem 1.1rem;
    background: #fff;
    color: var(--darkest);
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
    white-space: nowrap;

    &:hover { background: #f1f5f9; }
  }


  /* ═══════════════════════════════
     DELETE CONFIRM MODAL
  ═══════════════════════════════ */
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

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .confirm-modal {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: slideUp 0.22s ease;
  }

  @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

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

  .btn-cancel-sm {
    padding: 0.6rem 1.5rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.55rem;
    background: #fff;
    color: var(--darkest);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;

    &:hover:not(:disabled) { background: #f1f5f9; }
    &:disabled { opacity: 0.5; cursor: default; }
  }

  .btn-delete-sm {
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 0.55rem;
    background: #dc2626;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.18s;

    &:hover:not(:disabled) { background: #b91c1c; }
    &:disabled { opacity: 0.6; cursor: default; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .list-page { padding: 1rem; }
    .page-title { font-size: 1.35rem; }
    .form-body { padding: 1rem; }
    .form-topbar { padding: 0.75rem 1rem; flex-wrap: wrap; }
    .form-title { font-size: 1rem; order: -1; width: 100%; }
  }
`;

export default Wrapper;
