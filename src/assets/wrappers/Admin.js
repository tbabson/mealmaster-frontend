import styled from "styled-components";

const SIDEBAR_W      = "240px";
const SIDEBAR_W_COL  = "68px";

const Wrapper = styled.div`
  /* ── Layout shell ── */
  .layout {
    display: flex;
    min-height: 100vh;
  }

  /* ═══════════════════════════════
     SIDEBAR
  ═══════════════════════════════ */
  .sidebar {
    width: ${SIDEBAR_W};
    flex-shrink: 0;
    background: linear-gradient(180deg, #0e2510 0%, #1a3d1c 60%, #143315 100%);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 900;
    overflow: hidden;
    transition: width 0.28s ease, transform 0.28s ease;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.18);
  }

  /* ── Desktop collapsed ── */
  &.sidebar-collapsed .sidebar {
    width: ${SIDEBAR_W_COL};
  }

  /* ── Sidebar header ── */
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1rem 1rem;
    min-height: 64px;
    flex-shrink: 0;
  }

  .brand-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
  }

  .collapse-btn {
    background: rgba(255, 255, 255, 0.08);
    border: none;
    color: rgba(255, 255, 255, 0.7);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;
    font-size: 0.75rem;

    &:hover {
      background: var(--secondary);
      color: #fff;
    }
  }

  /* collapsed: center the collapse button */
  &.sidebar-collapsed .sidebar-header {
    justify-content: center;
    padding: 1.25rem 0 1rem;
  }

  /* ── User info ── */
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem 1rem;
    flex-shrink: 0;
    overflow: hidden;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--secondary);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.05em;
  }

  .user-text {
    overflow: hidden;
  }

  .user-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 0.1rem;
  }

  .user-role {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin: 0;
  }

  /* collapsed user-info: center avatar */
  &.sidebar-collapsed .user-info {
    justify-content: center;
    padding: 0 0 1rem;
  }

  /* ── Divider ── */
  .nav-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 0 1rem 0.5rem;
    flex-shrink: 0;
  }

  /* ── Nav links ── */
  .nav-links {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 2px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.85rem;
    border-radius: 0.55rem;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: background 0.18s, color 0.18s;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    &.active {
      background: var(--secondary);
      color: #fff;
      font-weight: 700;

      .nav-icon { color: #fff; }
    }

    /* Active left accent bar */
    &.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 3px;
      background: #fff;
      border-radius: 0 3px 3px 0;
    }
  }

  .nav-icon {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.55);
    flex-shrink: 0;
    width: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.18s;
  }

  .nav-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* collapsed: center icons */
  &.sidebar-collapsed .nav-link {
    justify-content: center;
    padding: 0.7rem;
    gap: 0;

    &.active::before { display: none; }

    &.active {
      border-radius: 0.55rem;
    }
  }

  &.sidebar-collapsed .nav-icon {
    width: auto;
    font-size: 1.15rem;
  }

  /* ── Sidebar footer / logout ── */
  .sidebar-footer {
    flex-shrink: 0;
    padding: 0 0.6rem 1.25rem;
  }

  .sidebar-footer .nav-divider {
    margin: 0 0.4rem 0.5rem;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: none;
    border-radius: 0.55rem;
    background: rgba(255, 87, 34, 0.12);
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    white-space: nowrap;

    &:hover {
      background: var(--secondary);
      color: #fff;

      .nav-icon { color: #fff; }
    }
  }

  &.sidebar-collapsed .logout-btn {
    justify-content: center;
    padding: 0.7rem;
    gap: 0;
  }

  /* ═══════════════════════════════
     MOBILE TOGGLE BUTTON
  ═══════════════════════════════ */
  .mobile-toggle {
    display: none;
    position: fixed;
    top: 0.85rem;
    left: 0.85rem;
    z-index: 1100;
    background: #0e2510;
    color: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
    transition: background 0.2s;

    &:hover { background: var(--secondary); }
  }

  /* ── Backdrop ── */
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 800;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* ═══════════════════════════════
     MAIN CONTENT
  ═══════════════════════════════ */
  .main-content {
    flex: 1;
    margin-left: ${SIDEBAR_W};
    min-height: 100vh;
    background: #f8fafc;
    transition: margin-left 0.28s ease;
    overflow-x: hidden;
  }

  &.sidebar-collapsed .main-content {
    margin-left: ${SIDEBAR_W_COL};
  }

  /* ═══════════════════════════════
     DESKTOP — hide mobile elements
  ═══════════════════════════════ */
  @media (min-width: 769px) {
    .mobile-toggle { display: none !important; }
    .backdrop      { display: none !important; }
  }

  /* ═══════════════════════════════
     MOBILE
  ═══════════════════════════════ */
  @media (max-width: 768px) {
    .mobile-toggle { display: flex; }
    .backdrop      { display: block; }
    .desktop-only  { display: none; }

    .sidebar {
      transform: translateX(-100%);
      width: ${SIDEBAR_W};
      box-shadow: none;

      &.mobile-open {
        transform: translateX(0);
        box-shadow: 6px 0 30px rgba(0, 0, 0, 0.3);
      }
    }

    .main-content {
      margin-left: 0;
      padding-top: 3.5rem; /* space for the floating toggle button */
    }

    /* Never collapse on mobile */
    &.sidebar-collapsed .sidebar { width: ${SIDEBAR_W}; }
    &.sidebar-collapsed .main-content { margin-left: 0; }
    &.sidebar-collapsed .brand-name,
    &.sidebar-collapsed .user-text,
    &.sidebar-collapsed .nav-label { display: revert; }
    &.sidebar-collapsed .user-info { justify-content: flex-start; padding: 0 1rem 1rem; }
    &.sidebar-collapsed .nav-link { justify-content: flex-start; padding: 0.65rem 0.85rem; gap: 0.75rem; }
    &.sidebar-collapsed .logout-btn { justify-content: flex-start; padding: 0.65rem 0.85rem; gap: 0.75rem; }
    &.sidebar-collapsed .nav-link.active::before { display: block; }
    &.sidebar-collapsed .sidebar-header { justify-content: space-between; padding: 1.25rem 1rem 1rem; }
  }
`;

export default Wrapper;
