import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  min-height: 100vh;
  background: #f8fafc;

  /* ═══════════════════════════════════════════════════════
     PAGE LAYOUT: sidebar + main
  ═══════════════════════════════════════════════════════ */
  .page-layout {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 860px) {
    .page-layout {
      grid-template-columns: 1fr;
    }
  }

  /* ═══════════════════════════════════════════════════════
     USER CARD (left sidebar)
  ═══════════════════════════════════════════════════════ */
  .user-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 16px;
    padding: 2rem 1.5rem;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    position: sticky;
    top: 1.5rem;
  }

  /* Avatar */
  .avatar-wrap {
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 0.5rem;
    flex-shrink: 0;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 0 0 3px var(--secondary, #ff5722);
  }

  .avatar-wrap:hover .avatar-overlay {
    opacity: 1;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .avatar-initials {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, var(--secondary, #ff5722) 0%, #ff8a50 100%);
    text-transform: uppercase;
  }

  .avatar-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    opacity: 0;
    transition: opacity 0.2s;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    svg { font-size: 1.1rem; }
  }

  /* Name / email */
  .user-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0.25rem 0 0;
    text-align: center;
  }

  .user-email {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.82rem;
    color: #64748b;
    margin: 0;
    text-align: center;
    word-break: break-all;
  }

  .meta-icon {
    font-size: 0.9rem;
    color: #94a3b8;
    flex-shrink: 0;
  }

  .meta-icon-sm {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .role-badge {
    display: inline-block;
    padding: 0.2rem 0.75rem;
    border-radius: 20px;
    background: #fff0ec;
    color: var(--secondary, #ff5722);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .member-since {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: #f1f5f9;
    margin: 0.5rem 0;
  }

  /* Stat pills */
  .stat-pills {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }

  .stat-pill {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.6rem 0.4rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
  }

  .pill-val {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--secondary, #ff5722);
    line-height: 1;
  }

  .pill-label {
    font-size: 0.68rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Action buttons */
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    width: 100%;
    padding: 0.6rem 1rem;
    border-radius: 9px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
  }

  .action-btn.primary {
    background: var(--secondary, #ff5722);
    color: #fff;
    border: none;
    &:hover { opacity: 0.88; }
  }

  .action-btn.outline {
    background: #fff;
    color: #475569;
    border: 1.5px solid #e2e8f0;
    &:hover { background: #f1f5f9; border-color: #cbd5e1; color: #1e293b; }
  }

  /* ═══════════════════════════════════════════════════════
     CONTENT COLUMN (right)
  ═══════════════════════════════════════════════════════ */
  .content-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Tabs ─────────────────────────────────────────────── */
  .tabs-bar {
    display: flex;
    gap: 0.25rem;
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 0.35rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  .tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.75rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #64748b;
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;

    svg { font-size: 0.85rem; }
  }

  .tab-btn:hover:not(.active) {
    background: #f8fafc;
    color: #1e293b;
  }

  .tab-btn.active {
    background: var(--secondary, #ff5722);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
  }

  .tab-count {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.08);
    line-height: 1.4;
  }

  .tab-btn.active .tab-count {
    background: rgba(255, 255, 255, 0.25);
  }

  /* ── Tab panels ────────────────────────────────────────── */
  .tab-panel {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  }

  /* ── Empty state ──────────────────────────────────────── */
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

  .empty-icon {
    font-size: 2.5rem;
    color: #e2e8f0;
  }

  .empty-state p {
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748b;
    margin: 0;
  }

  .empty-link {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: opacity 0.15s;
    &:hover { opacity: 0.88; }
  }

  /* ── Row cards ────────────────────────────────────────── */
  .item-list {
    display: flex;
    flex-direction: column;
  }

  .row-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    text-decoration: none;
    color: inherit;
    transition: background 0.15s;
    cursor: pointer;

    &:last-child { border-bottom: none; }
    &:hover { background: #fafbfc; }
  }

  .row-card.clickable { cursor: pointer; }

  /* Icon badge */
  .row-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .orders-icon   { background: #fff0ec; color: var(--secondary, #ff5722); }
  .reminder-icon { background: #eff6ff; color: #3b82f6; }
  .cart-icon     { background: #f0fdf4; color: #16a34a; }

  .cart-thumb {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
  }

  /* Row body */
  .row-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .row-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: #94a3b8;
  }

  .dot { color: #cbd5e1; }

  .row-total {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
  }

  .row-arrow {
    color: #cbd5e1;
    font-size: 0.8rem;
    flex-shrink: 0;
  }

  /* Status badge */
  .status-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.18rem 0.6rem;
    border-radius: 20px;
    text-transform: capitalize;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Reminder-specific badges */
  .badge-group {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .badge-pill {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.18rem 0.55rem;
    border-radius: 20px;
    white-space: nowrap;

    svg { font-size: 0.6rem; }
  }

  .badge-pill.recurring { background: #eff6ff; color: #3b82f6; }
  .badge-pill.method    { background: #f0fdf4; color: #16a34a; }

  .reminder-note {
    font-size: 0.78rem;
    color: #64748b;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ═══════════════════════════════════════════════════════
     MODALS (Edit Profile + Change Password)
  ═══════════════════════════════════════════════════════ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-box {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 460px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;

    h3 {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 700;
      color: #1e293b;
    }
  }

  .modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #fee2e2; border-color: #fecaca; color: #ef4444; }
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
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

  .field-input {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.9rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus {
      border-color: var(--secondary, #ff5722);
      box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
    }
    &::placeholder { color: #cbd5e1; }
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .btn-cancel {
    flex: 1;
    padding: 0.6rem 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    background: #fff;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    &:hover { background: #f1f5f9; color: #1e293b; }
  }

  .btn-submit {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 9px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover:not(:disabled) { opacity: 0.88; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  /* ═══════════════════════════════════════════════════════
     GUEST / NOT LOGGED IN SCREEN
  ═══════════════════════════════════════════════════════ */
  .guest-screen {
    min-height: 100vh;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
  }

  .guest-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
    padding: 3rem 2.5rem;
    max-width: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .guest-avatar {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff8a65 0%, #ff5722 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2.2rem;
    box-shadow: 0 4px 18px rgba(255, 87, 34, 0.28);
    flex-shrink: 0;
  }

  .guest-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
    line-height: 1.2;
  }

  .guest-sub {
    font-size: 0.97rem;
    color: #64748b;
    line-height: 1.65;
    margin: 0;
    max-width: 380px;
  }

  .guest-features {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    text-align: left;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.9rem 1rem;
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

  .orders-icon    { background: #fef9c3; color: #b45309; }
  .reminders-icon { background: #ede9fe; color: #6d28d9; }
  .cart-icon      { background: #dcfce7; color: #166534; }
  .account-icon   { background: #dbeafe; color: #1e40af; }

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
  }

  .btn-login:hover {
    opacity: 0.88;
    transform: translateY(-1px);
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
  }

  .btn-register:hover {
    background: #fff5f2;
    transform: translateY(-1px);
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
  }

  .inline-link:hover {
    text-decoration: underline;
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
