import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;

  /* ═══════════════════════════════════════════════════════
     TOPBAR
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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
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
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #1e293b;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex: 1;
    overflow: hidden;
    min-width: 0;
  }

  .bc-seg {
    font-size: 0.82rem;
    color: #94a3b8;
    white-space: nowrap;
    &.current {
      color: #1e293b;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }
  }

  .bc-sep {
    font-size: 0.6rem;
    color: #cbd5e1;
    flex-shrink: 0;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════════
     SHARED BUTTONS
  ═══════════════════════════════════════════════════════ */
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
    &:hover {
      background: #f1f5f9;
      color: #1e293b;
      border-color: #cbd5e1;
    }
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
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ═══════════════════════════════════════════════════════
     FORM WRAP
  ═══════════════════════════════════════════════════════ */
  .form-wrap {
    max-width: 920px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ═══════════════════════════════════════════════════════
     CARDS
  ═══════════════════════════════════════════════════════ */
  .form-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    padding: 1.75rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  }

  /* Card 1: image + info side-by-side */
  .card-inner-grid {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    align-items: start;
  }

  @media (max-width: 640px) {
    .card-inner-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Image column */
  .image-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .col-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0;
  }

  .image-upload-zone {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    background: #f1f5f9;
    border: 2px dashed #cbd5e1;
    transition: border-color 0.2s;
  }

  .image-upload-zone:hover {
    border-color: var(--secondary, #ff5722);
  }

  .image-upload-zone:hover .img-overlay {
    opacity: 1;
  }

  .img-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .img-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
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

  .overlay-icon {
    font-size: 1.4rem;
  }

  .upload-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1rem;
    text-align: center;
  }

  .placeholder-icon {
    font-size: 2.5rem;
    color: #94a3b8;
  }

  .placeholder-text {
    font-size: 0.85rem;
    font-weight: 600;
    color: #64748b;
  }

  .placeholder-hint {
    font-size: 0.72rem;
    color: #94a3b8;
  }

  .new-image-note {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #16a34a;
    font-weight: 600;
    margin: 0;
  }

  .note-check {
    color: #16a34a;
  }

  /* Info column */
  .info-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  .card-sub {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0.15rem 0 0;
  }

  .type-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Card head row — for Ingredients and Steps cards */
  .card-head-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  /* ═══════════════════════════════════════════════════════
     FIELDS
  ═══════════════════════════════════════════════════════ */
  .field-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .field-row > .field-group {
    flex: 1;
    min-width: 140px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .req {
    color: var(--secondary, #ff5722);
    margin-left: 2px;
  }

  .field-input {
    padding: 0.55rem 0.8rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
  }

  .field-input:focus {
    border-color: var(--secondary, #ff5722);
    box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
  }

  .field-input::placeholder {
    color: #cbd5e1;
  }

  .field-textarea {
    padding: 0.55rem 0.8rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    width: 100%;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .field-textarea:focus {
    border-color: var(--secondary, #ff5722);
    box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
  }

  .field-textarea::placeholder {
    color: #cbd5e1;
  }

  /* ═══════════════════════════════════════════════════════
     FEATURED BUTTON
  ═══════════════════════════════════════════════════════ */
  .featured-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.9rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: all 0.18s;
  }

  .featured-btn svg {
    color: #cbd5e1;
    transition: color 0.18s;
  }

  .featured-btn.active {
    background: #fff7ed;
    border-color: #fdba74;
    color: #c2410c;
  }

  .featured-btn.active svg {
    color: #f97316;
  }

  .featured-btn:hover:not(.active) {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  /* ═══════════════════════════════════════════════════════
     DIETARY CHIPS
  ═══════════════════════════════════════════════════════ */
  .dietary-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .diet-chip {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 20px;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .diet-chip.on {
    background: #fff0ec;
    border-color: var(--secondary, #ff5722);
    color: var(--secondary, #ff5722);
  }

  .diet-chip:hover:not(.on) {
    background: #f1f5f9;
    border-color: #94a3b8;
  }

  .chip-check {
    font-size: 0.65rem;
  }

  /* ═══════════════════════════════════════════════════════
     ADD BUTTON
  ═══════════════════════════════════════════════════════ */
  .add-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1rem;
    border: 1.5px dashed var(--secondary, #ff5722);
    border-radius: 8px;
    background: #fff;
    color: var(--secondary, #ff5722);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
  }

  .add-btn:hover {
    background: #fff0ec;
  }

  /* ═══════════════════════════════════════════════════════
     INGREDIENT CARDS
  ═══════════════════════════════════════════════════════ */
  .ingredients-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ing-card {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ing-card-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .ing-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ing-name-preview {
    flex: 1;
    font-size: 0.88rem;
    font-weight: 600;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid #fecaca;
    border-radius: 6px;
    background: #fff5f5;
    color: #ef4444;
    font-size: 0.75rem;
    cursor: pointer;
    margin-left: auto;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .remove-btn:hover {
    background: #fee2e2;
  }

  /* Substitutions */
  .subs-block {
    padding: 0.75rem;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .subs-label {
    font-size: 0.73rem;
    font-weight: 700;
    color: #0369a1;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 0.25rem;
  }

  .sub-row {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .field-input.sm {
    padding: 0.38rem 0.55rem;
    font-size: 0.8rem;
    flex: 1;
    min-width: 80px;
  }

  .sub-remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: 1px solid #fecaca;
    border-radius: 6px;
    background: #fff5f5;
    color: #ef4444;
    font-size: 0.7rem;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .sub-remove-btn:hover {
    background: #fee2e2;
  }

  .add-sub-link {
    background: none;
    border: none;
    padding: 0;
    color: #0ea5e9;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
  }

  .add-sub-link:hover {
    text-decoration: underline;
  }

  /* ═══════════════════════════════════════════════════════
     STEP CARDS
  ═══════════════════════════════════════════════════════ */
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .step-card {
    border: 1px solid #e2e8f0;
    border-left: 4px solid var(--secondary, #ff5722);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .step-card-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .step-label {
    flex: 1;
    font-size: 0.88rem;
    font-weight: 600;
    color: #1e293b;
  }

  .duration-group {
    max-width: 200px;
  }

  /* ═══════════════════════════════════════════════════════
     FORM FOOTER
  ═══════════════════════════════════════════════════════ */
  .form-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  /* ═══════════════════════════════════════════════════════
     LOADING / ERROR STATES
  ═══════════════════════════════════════════════════════ */
  .state-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 5rem 2rem;
    text-align: center;
  }

  .spinner {
    width: 44px;
    height: 44px;
    border: 3px solid #e2e8f0;
    border-top-color: var(--secondary, #ff5722);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .state-text {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
  }

  .state-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  .state-icon {
    font-size: 3rem;
  }

  .state-icon.warning {
    color: #f59e0b;
  }

  .btn-back-error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.25rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.15s;
  }

  .btn-back-error:hover {
    background: #f1f5f9;
  }
`;

export default Wrapper;
