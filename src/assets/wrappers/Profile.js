import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 0 4rem;
  min-height: 100vh;

  /* ═══════════════════════════════════════════════════════
     PAGE LAYOUT: sidebar + main
     minmax(0, …) lets the columns shrink below their content's width;
     a plain 1fr would stretch to fit the tab bar and overflow the phone.
  ═══════════════════════════════════════════════════════ */
  .page-layout {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 860px) {
    .page-layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.25rem;
    }
  }

  /* ═══════════════════════════════════════════════════════
     USER CARD (left sidebar)
  ═══════════════════════════════════════════════════════ */
  .user-card {
    background: #fff;
    border-radius: var(--radius-lg);
    padding: 2rem 1.5rem;
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
    position: sticky;
    top: 6.5rem; /* clears the floating navbar */
  }

  @media (max-width: 860px) {
    .user-card {
      position: static;
      padding: 1.75rem 1.25rem;
    }
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
    box-shadow: 0 0 0 3px var(--secondary, var(--secondary));
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
    background: linear-gradient(135deg, var(--secondary, var(--secondary)) 0%, #ff8a50 100%);
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
    color: var(--text-primary);
    margin: 0.25rem 0 0;
    text-align: center;
  }

  .user-email {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    max-width: 100%;
    font-size: 0.82rem;
    color: var(--text-secondary);
    margin: 0;
    text-align: center;
    overflow-wrap: anywhere;
  }

  .meta-icon {
    font-size: 0.9rem;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .meta-icon-sm {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .role-badge {
    display: inline-block;
    padding: 0.2rem 0.75rem;
    border-radius: 20px;
    background: #fff0ec;
    color: var(--secondary, var(--secondary));
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
    color: var(--text-muted);
    margin: 0;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: var(--surface-soft);
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
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.6rem 0.4rem;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  .pill-val {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--secondary, var(--secondary));
    line-height: 1;
  }

  .pill-label {
    max-width: 100%;
    font-size: 0.68rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 380px) {
    .pill-label { font-size: 0.6rem; letter-spacing: 0; }
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
    background: var(--secondary, var(--secondary));
    color: #fff;
    border: none;
    &:hover { opacity: 0.88; }
  }

  .action-btn.outline {
    background: #fff;
    color: var(--text-secondary);
    border: 1.5px solid var(--border);
    &:hover { background: var(--surface-soft); border-color: var(--border-strong); color: var(--text-primary); }
  }

  /* ═══════════════════════════════════════════════════════
     CONTENT COLUMN (right)
  ═══════════════════════════════════════════════════════ */
  .content-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    min-width: 0;
  }

  /* ── Tabs ─────────────────────────────────────────────── */
  /* On narrow screens the tabs scroll sideways instead of widening the page */
  .tabs-bar {
    display: flex;
    gap: 0.25rem;
    background: #fff;
    border-radius: var(--radius-pill);
    padding: 0.35rem;
    box-shadow: var(--card-shadow);
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  .tab-btn {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.6rem 0.9rem;
    border: none;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;

    svg { font-size: 0.85rem; }
  }

  .tab-btn:hover:not(.active) {
    background: var(--background);
    color: var(--text-primary);
  }

  .tab-btn.active {
    background: var(--secondary, var(--secondary));
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
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--card-shadow);
  }

  @media (max-width: 480px) {
    .row-card { gap: 0.75rem; padding: 0.9rem 1rem; }
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
    color: var(--text-muted);
  }

  .empty-icon {
    font-size: 2.5rem;
    color: var(--border);
  }

  .empty-state p {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 0;
  }

  .empty-link {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    background: var(--secondary, var(--secondary));
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
    border-bottom: 1px solid var(--surface-soft);
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

  .orders-icon   { background: #fff0ec; color: var(--secondary, var(--secondary)); }
  .reminder-icon { background: #eff6ff; color: #3b82f6; }
  .cart-icon     { background: var(--surface-soft); color: #16a34a; }

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
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .dot { color: var(--border-strong); }

  .row-total {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .row-arrow {
    color: var(--border-strong);
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
  .badge-pill.method    { background: var(--surface-soft); color: #16a34a; }

  .reminder-note {
    font-size: 0.78rem;
    color: var(--text-secondary);
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
    z-index: 2000; /* above the floating navbar (1500) */
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
    border-bottom: 1px solid var(--surface-soft);

    h3 {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  }

  .modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--background);
    color: var(--text-secondary);
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
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .field-input {
    padding: 0.6rem 0.85rem;
    border: 1.5px solid var(--border);
    border-radius: 9px;
    font-size: 0.9rem;
    color: var(--text-primary);
    background: #fff;
    outline: none;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus {
      border-color: var(--secondary, var(--secondary));
      box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
    }
    &::placeholder { color: var(--border-strong); }
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .btn-cancel {
    flex: 1;
    padding: 0.6rem 1rem;
    border: 1.5px solid var(--border);
    border-radius: 9px;
    background: #fff;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    &:hover { background: var(--surface-soft); color: var(--text-primary); }
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
    background: var(--secondary, var(--secondary));
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
    background: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
  }

  .guest-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 20px;
    box-shadow: var(--card-shadow);
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
    background: linear-gradient(135deg, #ff8a65 0%, var(--secondary) 100%);
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
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
  }

  .guest-sub {
    font-size: 0.97rem;
    color: var(--text-secondary);
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
    border: 1px solid var(--surface-soft);
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
    color: var(--text-primary);
    margin: 0 0 0.15rem;
  }

  .feature-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
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
    background: var(--secondary, var(--secondary));
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
    color: var(--secondary);
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    border: 2px solid var(--secondary);
    transition: background 0.15s, color 0.15s, transform 0.15s;
    min-width: 120px;
  }

  .btn-register:hover {
    background: #fff5f2;
    transform: translateY(-1px);
  }

  .guest-footer-text {
    font-size: 0.82rem;
    color: var(--text-muted);
    margin: 0;
  }

  .inline-link {
    color: var(--secondary, var(--secondary));
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
