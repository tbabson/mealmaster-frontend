import styled from "styled-components";

const Wrapper = styled.header`
  position: fixed;
  inset: 1rem 0 auto;
  z-index: 1500;
  pointer-events: none;

  .nav-bar {
    pointer-events: auto;
    width: min(1200px, 100% - 2rem);
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.55rem 0.6rem 0.55rem 1.25rem;
    border-radius: var(--radius-pill);
    background: rgba(255, 249, 242, 0.82);
    border: 1px solid rgba(36, 49, 41, 0.08);
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    transition: box-shadow 0.3s, background 0.3s;
  }
  .nav-bar.is-scrolled {
    background: rgba(255, 249, 242, 0.94);
    box-shadow: 0 12px 40px -18px rgba(15, 26, 19, 0.45);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    .logo { width: 104px; height: auto; display: block; }
  }

  .nav-links {
    display: none;
    gap: 0.25rem;
    margin: 0;
  }

  .nav-link {
    position: relative;
    display: block;
    padding: 0.55rem 0.95rem;
    border-radius: var(--radius-pill);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color 0.2s;
    &:hover { color: var(--text-primary); }
    &.active { color: #fff; }
  }
  .nav-active {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--primary);
  }
  .nav-label { position: relative; }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .cart-btn,
  .icon-btn,
  .menu-toggle {
    position: relative;
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-primary);
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    &:hover { border-color: var(--primary); color: var(--primary); }
  }

  .cart-count {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 1.2rem;
    height: 1.2rem;
    padding: 0 0.3rem;
    display: grid;
    place-items: center;
    border-radius: var(--radius-pill);
    background: var(--secondary);
    color: var(--on-secondary);
    font-size: 0.65rem;
    font-weight: 700;
  }

  .user-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .avatar {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    overflow: hidden;
    border: 2px solid var(--surface);
    box-shadow: 0 0 0 1px var(--border);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .login-btn {
    padding: 0.75rem 1.3rem;
    border-radius: var(--radius-pill);
    background: var(--ink);
    color: var(--ink-text);
    font-size: 0.88rem;
    font-weight: 600;
    transition: background 0.2s;
    &:hover { background: var(--primary); }
  }

  .hide-mobile { display: none; }

  /* ── mobile sheet ── */
  .mobile-menu {
    pointer-events: auto;
    width: min(1200px, 100% - 2rem);
    margin: 0.5rem auto 0;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    background: var(--ink);
    color: var(--ink-text);
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5);

    ul { display: grid; gap: 0.25rem; margin: 0; }
  }
  .mobile-link {
    display: block;
    padding: 0.45rem 0;
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.03em;
    font-size: 2rem;
    color: var(--ink-text-secondary);
    &.active, &:hover { color: var(--ink-text); }
  }
  .mobile-footer {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--ink-border);
  }
  .mobile-cta,
  .mobile-ghost {
    flex: 1;
    padding: 0.9rem;
    border-radius: var(--radius-pill);
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
  }
  .mobile-cta { background: var(--primary); color: #fff; border: none; }
  .mobile-ghost {
    background: transparent;
    color: var(--ink-text);
    border: 1px solid var(--ink-border);
  }

  @media (min-width: 992px) {
    .nav-links { display: flex; }
    .menu-toggle { display: none; }
    .hide-mobile { display: grid; }
    .login-btn.hide-mobile { display: inline-block; }
    .mobile-menu { display: none; }
  }
`;

export default Wrapper;
