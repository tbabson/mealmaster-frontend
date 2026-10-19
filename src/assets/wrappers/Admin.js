import styled from "styled-components";

const SIDEBAR_W = "248px";
const SIDEBAR_W_COL = "76px";
const GAP = "0.75rem";

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--background);

  .layout {
    display: flex;
    min-height: 100vh;
  }

  /* ═══════════════════════════════
     SIDEBAR: a floating rounded ink panel
  ═══════════════════════════════ */
  .sidebar {
    position: fixed;
    top: ${GAP};
    bottom: ${GAP};
    left: ${GAP};
    z-index: 900;
    width: ${SIDEBAR_W};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1.5rem;
    background: var(--ink);
    color: var(--ink-text);
    transition: width 0.3s var(--ease-out), transform 0.3s var(--ease-out);
  }

  &.sidebar-collapsed .sidebar { width: ${SIDEBAR_W_COL}; }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 72px;
    padding: 1.1rem 1rem 0.9rem;
    flex-shrink: 0;
  }

  .brand-logo {
    display: block;
    padding: 0.4rem 0.65rem;
    border-radius: 0.85rem;
    background: var(--background);
    .logo { width: 92px; height: auto; display: block; }
  }

  .collapse-btn {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1px solid var(--ink-border);
    border-radius: 50%;
    background: transparent;
    color: var(--ink-text-secondary);
    font-size: 0.7rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;

    &:hover {
      background: var(--secondary);
      border-color: var(--secondary);
      color: var(--on-secondary);
    }
  }

  &.sidebar-collapsed .sidebar-header {
    justify-content: center;
    padding-inline: 0;
  }

  /* ── user ── */
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0.75rem 0.75rem;
    padding: 0.7rem;
    border-radius: 1rem;
    background: var(--ink-surface);
    flex-shrink: 0;
    overflow: hidden;
  }

  .avatar {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--primary);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;

    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }

  .user-text { overflow: hidden; }

  .user-name {
    margin: 0 0 0.15rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--ink-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-role {
    margin: 0;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8fd18f;
  }

  &.sidebar-collapsed .user-info {
    justify-content: center;
    margin-inline: 0.6rem;
    padding: 0.5rem 0;
    background: transparent;
  }

  .nav-divider {
    height: 1px;
    margin: 0 1rem 0.5rem;
    background: var(--ink-border);
    flex-shrink: 0;
  }

  /* ── nav ── */
  .nav-links {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0.4rem 0.75rem;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: var(--ink-border); border-radius: 4px; }
  }

  .nav-link,
  .logout-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.9rem;
    border-radius: var(--radius-pill);
    color: var(--ink-text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.2s, background 0.2s;

    &:hover { color: var(--ink-text); background: rgba(244, 241, 232, 0.06); }
    &.active { color: #fff; font-weight: 600; }
    &.active:hover { background: transparent; }
  }

  /* animated pill behind the active link */
  .nav-active {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--primary);
  }

  .nav-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.2rem;
    font-size: 1.05rem;
  }

  .nav-label {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.sidebar-collapsed .nav-link,
  &.sidebar-collapsed .logout-btn {
    justify-content: center;
    gap: 0;
    padding: 0.75rem;
  }

  .sidebar-footer {
    flex-shrink: 0;
    padding: 0 0.75rem 1rem;
  }
  .sidebar-footer .nav-divider { margin: 0 0.25rem 0.5rem; }

  .logout-btn {
    width: 100%;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;

    &:hover { background: var(--secondary); color: var(--on-secondary); }
  }

  /* ═══════════════════════════════
     MOBILE TOGGLE + BACKDROP
  ═══════════════════════════════ */
  .mobile-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1100;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: var(--ink);
    color: var(--ink-text);
    font-size: 1.05rem;
    cursor: pointer;
    box-shadow: 0 10px 30px -12px rgba(15, 26, 19, 0.6);

    &:hover { background: var(--primary); }
  }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 800;
    background: rgba(15, 26, 19, 0.45);
    backdrop-filter: blur(3px);
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* ═══════════════════════════════
     MAIN CONTENT
  ═══════════════════════════════ */
  .main-content {
    flex: 1;
    min-width: 0;
    min-height: 100vh;
    margin-left: calc(${SIDEBAR_W} + ${GAP});
    padding: ${GAP} ${GAP} 2rem ${GAP};
    transition: margin-left 0.3s var(--ease-out);
  }

  &.sidebar-collapsed .main-content {
    margin-left: calc(${SIDEBAR_W_COL} + ${GAP});
  }

  /* ═══════════════════════════════
     SHARED ADMIN PAGE ELEMENTS
     Pages define their own wrappers; these rules give every page the
     same header banner, card surfaces and controls. The extra
     .admin-shell .main-content prefix wins over the page-level styles.
  ═══════════════════════════════ */
  .main-content :is(.page-header, .list-header, .dash-header) {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.25rem;
    margin: 0 0 1.5rem;
    padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.5rem, 4vw, 2.5rem);
    border: none;
    border-radius: 1.75rem;
    background: var(--ink);
    color: var(--ink-text);
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      right: -8%;
      bottom: -90%;
      width: 45%;
      aspect-ratio: 1;
      background: radial-gradient(closest-side, rgba(53, 132, 56, 0.4), transparent);
      pointer-events: none;
    }

    > * { position: relative; z-index: 1; }
  }

  .main-content :is(.page-title, .dash-title) {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.5rem;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3.5vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
    color: var(--ink-text);

    svg { font-size: 0.75em; color: var(--secondary); }
  }

  .main-content :is(.page-sub, .dash-sub, .dash-date) {
    margin: 0;
    font-size: 0.95rem;
    color: var(--ink-text-secondary);

    strong { color: var(--ink-text); }
  }

  /* count badges that sit in a header banner */
  .main-content .header-badge {
    border: none;
    border-radius: 1rem;
    box-shadow: none;
  }

  /* card surfaces */
  .main-content :is(.filter-bar, .table-card, .form-card) {
    border-radius: 1.25rem;
    border: 1px solid var(--border);
    box-shadow: none;
  }

  /* inputs */
  .main-content :is(.search-input, .filter-select, .field-input, .field-textarea) {
    border-radius: 0.85rem;
    font-family: inherit;
  }

  /* pagination + back buttons as pills */
  .main-content :is(.page-btn, .back-btn, .clear-btn) {
    border-radius: var(--radius-pill);
  }

  /* modals */
  .main-content .modal-overlay {
    background: rgba(15, 26, 19, 0.5);
    backdrop-filter: blur(4px);
  }

  /* ═══════════════════════════════
     DESKTOP / MOBILE
  ═══════════════════════════════ */
  @media (min-width: 769px) {
    .mobile-toggle { display: none !important; }
    .backdrop { display: none !important; }
  }

  @media (max-width: 768px) {
    .mobile-toggle { display: flex; }
    .backdrop { display: block; }
    .desktop-only { display: none; }

    .sidebar {
      width: ${SIDEBAR_W};
      transform: translateX(calc(-100% - 2rem));
      &.mobile-open { transform: translateX(0); }
    }

    .main-content {
      margin-left: 0;
      padding-top: 4.5rem;
    }

    /* never collapse on mobile */
    &.sidebar-collapsed .sidebar { width: ${SIDEBAR_W}; }
    &.sidebar-collapsed .main-content { margin-left: 0; }
    &.sidebar-collapsed .nav-link,
    &.sidebar-collapsed .logout-btn { justify-content: flex-start; gap: 0.75rem; padding: 0.7rem 0.9rem; }
    &.sidebar-collapsed .user-info { justify-content: flex-start; margin-inline: 0.75rem; padding: 0.7rem; background: var(--ink-surface); }
    &.sidebar-collapsed .sidebar-header { justify-content: space-between; padding-inline: 1rem; }
  }
`;

export default Wrapper;
