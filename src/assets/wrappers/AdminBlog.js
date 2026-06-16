import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;

  /* ═══════════════════════════════════════════════════════
     TOPBAR (form view)
  ═══════════════════════════════════════════════════════ */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.85rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
    &:hover { background: #f1f5f9; color: #1e293b; }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex: 1;
    overflow: hidden;
  }
  .bc-seg { font-size: 0.82rem; color: #94a3b8; white-space: nowrap; }
  .bc-seg.current { color: #1e293b; font-weight: 600; }
  .bc-sep { font-size: 0.6rem; color: #cbd5e1; flex-shrink: 0; }

  .topbar-right {
    display: flex;
    gap: 0.6rem;
    margin-left: auto;
    flex-shrink: 0;
  }

  .btn-discard {
    padding: 0.45rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    &:hover { background: #f1f5f9; color: #1e293b; }
  }

  .btn-save {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.2rem;
    border: none;
    border-radius: 8px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
    &:hover:not(:disabled) { opacity: 0.88; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  .btn-spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
    margin-right: 2px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ═══════════════════════════════════════════════════════
     TWO-COLUMN FORM LAYOUT
  ═══════════════════════════════════════════════════════ */
  .form-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.5rem;
    padding: 2rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: start;
  }

  @media (max-width: 860px) {
    .form-layout { grid-template-columns: 1fr; }
  }

  .form-main { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-sidebar { display: flex; flex-direction: column; gap: 1.25rem; position: sticky; top: 76px; }

  /* ── Cards ────────────────────────────────────────────── */
  .form-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    padding: 1.5rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-section-head { display: flex; flex-direction: column; gap: 0.2rem; }
  .section-title { font-size: 0.92rem; font-weight: 700; color: #1e293b; margin: 0; }
  .section-sub { font-size: 0.78rem; color: #94a3b8; margin: 0; }

  /* ── Fields ───────────────────────────────────────────── */
  .field-group { display: flex; flex-direction: column; gap: 0.35rem; }

  .field-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .req { color: var(--secondary, #ff5722); margin-left: 2px; }

  .field-input {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.875rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
    &:focus { border-color: var(--secondary, #ff5722); box-shadow: 0 0 0 3px rgba(255,87,34,0.1); }
    &::placeholder { color: #cbd5e1; }
  }

  .title-input {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.75rem 1rem;
  }

  .field-textarea {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.875rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    width: 100%;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus { border-color: var(--secondary, #ff5722); box-shadow: 0 0 0 3px rgba(255,87,34,0.1); }
    &::placeholder { color: #cbd5e1; }
  }

  .char-count {
    font-size: 0.72rem;
    color: #94a3b8;
    text-align: right;
    margin-top: -0.15rem;
  }

  /* Quill editor */
  .quill-wrap .ql-toolbar {
    border-radius: 9px 9px 0 0;
    border-color: #e2e8f0;
    background: #f8fafc;
  }
  .quill-wrap .ql-container {
    border-radius: 0 0 9px 9px;
    border-color: #e2e8f0;
    min-height: 260px;
    font-size: 0.9rem;
  }
  .quill-wrap .ql-container:focus-within {
    border-color: var(--secondary, #ff5722);
  }

  /* Status toggle */
  .status-toggle {
    display: flex;
    gap: 0.4rem;
  }
  .status-opt {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    &:hover:not(.active) { background: #f1f5f9; }
  }

  /* Image upload */
  .img-upload-zone {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    overflow: hidden;
    border: 2px dashed #cbd5e1;
    cursor: pointer;
    background: #f8fafc;
    transition: border-color 0.2s;
    &:hover { border-color: var(--secondary, #ff5722); }
    &:hover .img-overlay { opacity: 1; }
  }
  .img-preview { width: 100%; height: 100%; object-fit: cover; display: block; }
  .img-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    opacity: 0;
    transition: opacity 0.2s;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .overlay-icon { font-size: 1.3rem; }
  .img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    color: #94a3b8;
    text-align: center;
    small { font-size: 0.72rem; color: #cbd5e1; }
  }
  .placeholder-icon { font-size: 2rem; color: #cbd5e1; }

  /* Keywords */
  .keyword-input-row {
    display: flex;
    gap: 0.5rem;
  }
  .add-kw-btn {
    padding: 0.6rem 0.9rem;
    border: 1.5px solid var(--secondary, #ff5722);
    border-radius: 9px;
    background: #fff;
    color: var(--secondary, #ff5722);
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
    &:hover { background: #fff0ec; }
  }
  .kw-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.25rem;
  }
  .kw-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.22rem 0.65rem;
    border-radius: 20px;
    background: #fff0ec;
    color: var(--secondary, #ff5722);
    font-size: 0.75rem;
    font-weight: 600;
    button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
      font-size: 0.65rem;
      display: flex;
      align-items: center;
      opacity: 0.7;
      &:hover { opacity: 1; }
    }
  }
  .kw-icon { font-size: 0.6rem; }

  /* ═══════════════════════════════════════════════════════
     LIST VIEW
  ═══════════════════════════════════════════════════════ */
  .list-page {
    padding: 1.5rem 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .list-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .page-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  .page-sub { font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0; }

  .btn-create {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1.2rem;
    border: none;
    border-radius: 9px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
    &:hover { opacity: 0.88; }
  }

  /* Filter card */
  .filter-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .filter-field {
    position: relative;
    flex: 1;
    min-width: 180px;
  }
  .filter-search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 0.8rem;
    pointer-events: none;
  }
  .filter-input {
    width: 100%;
    padding: 0.55rem 2.4rem 0.55rem 2.2rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #1e293b;
    outline: none;
    background: #fff;
    transition: border-color 0.15s;
    &:focus { border-color: var(--secondary, #ff5722); }
    &::placeholder { color: #cbd5e1; }
  }
  .filter-clear-x {
    position: absolute;
    right: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 0.75rem;
    display: flex;
    &:hover { color: #ef4444; }
  }

  .filter-select {
    padding: 0.55rem 0.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.83rem;
    color: #475569;
    background: #fff;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
    &:focus { border-color: var(--secondary, #ff5722); }
  }

  .filter-clear-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 0.9rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
    &:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; }
  }

  /* Table */
  .table-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  .table-wrap { overflow-x: auto; }

  .blog-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
  }

  .blog-table thead tr {
    background: #fafbfc;
    border-bottom: 2px solid #f1f5f9;
  }

  .blog-table th {
    padding: 0.8rem 1rem;
    text-align: left;
    font-size: 0.72rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  .blog-table td {
    padding: 0.85rem 1rem;
    font-size: 0.875rem;
    color: #1e293b;
    border-bottom: 1px solid #f8fafc;
    vertical-align: middle;
  }

  .blog-table tbody tr:last-child td { border-bottom: none; }
  .blog-table tbody tr:hover td { background: #fafbfc; }

  .td-num { color: #94a3b8; font-size: 0.8rem; font-weight: 600; }

  .td-post {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .post-thumb {
    width: 56px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
    background: #f1f5f9;
  }
  .post-thumb-placeholder {
    width: 56px;
    height: 40px;
    border-radius: 6px;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e1;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .post-title {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 320px;
    line-height: 1.4;
  }

  .cat-badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    background: #f1f5f9;
    color: #475569;
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .status-badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .td-date { color: #64748b; font-size: 0.82rem; white-space: nowrap; }

  .row-actions {
    display: flex;
    gap: 0.4rem;
  }
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.78rem;
    transition: all 0.15s;
    &.edit { background: #eff6ff; color: #3b82f6; &:hover { background: #dbeafe; } }
    &.delete { background: #fff5f5; color: #ef4444; &:hover { background: #fee2e2; } }
  }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 4rem 2rem;
    text-align: center;
    color: #94a3b8;
  }
  .empty-icon { font-size: 3rem; color: #e2e8f0; }
  .empty-state p { font-size: 0.9rem; font-weight: 600; color: #64748b; margin: 0; }
  .clear-btn {
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 8px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    &:hover { opacity: 0.88; }
  }

  /* ═══════════════════════════════════════════════════════
     PAGINATION
  ═══════════════════════════════════════════════════════ */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }
  .pag-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 0.65rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    font-size: 0.83rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover:not(:disabled):not(.active) { border-color: var(--secondary, #ff5722); color: var(--secondary, #ff5722); }
    &.active { background: var(--secondary, #ff5722); border-color: var(--secondary, #ff5722); color: #fff; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }
  .pag-dots { color: #94a3b8; font-size: 0.9rem; padding: 0 0.2rem; }

  /* ═══════════════════════════════════════════════════════
     DELETE CONFIRMATION MODAL
  ═══════════════════════════════════════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 1rem;
  }
  .confirm-modal {
    background: #fff;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
  }
  .confirm-icon { font-size: 2.5rem; color: #f59e0b; }
  .confirm-modal h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }
  .confirm-modal p { font-size: 0.875rem; color: #64748b; margin: 0; line-height: 1.5; }
  .confirm-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
    width: 100%;
  }
  .cancel-btn {
    flex: 1;
    padding: 0.6rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    background: #fff;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #f1f5f9; }
  }
  .delete-confirm-btn {
    flex: 1;
    padding: 0.6rem;
    border: none;
    border-radius: 9px;
    background: #ef4444;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    &:hover { background: #dc2626; }
  }
`;

export default Wrapper;
