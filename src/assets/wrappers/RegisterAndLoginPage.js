import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  background: var(--background);

  /* ── visual panel ── */
  .auth-visual {
    position: relative;
    display: none;
    overflow: hidden;
    margin: 1rem 0 1rem 1rem;
    border-radius: 2rem;
    background: var(--ink);
    color: var(--ink-text);
  }

  .visual-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .visual-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 26, 19, 0.35) 0%, rgba(15, 26, 19, 0.2) 40%, rgba(15, 26, 19, 0.92) 100%);
  }

  .auth-logo {
    position: absolute;
    top: 1.75rem;
    left: 1.75rem;
    padding: 0.55rem 0.85rem;
    border-radius: 1rem;
    background: var(--background);
    .logo { width: 110px; height: auto; display: block; }
  }

  .visual-copy {
    position: absolute;
    inset: auto 2.5rem 2.5rem;
    display: grid;
    justify-items: start;
    gap: 1rem;

    h2 {
      font-size: clamp(2.5rem, 4vw, 3.75rem);
      color: var(--ink-text);
      max-width: 30rem;
    }
    p { font-size: 1.15rem; color: var(--secondary); font-weight: 600; }
  }

  .photo-caption {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-text-secondary);
  }

  /* ── form side ── */
  .auth-main {
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
  }

  .auth-card {
    width: min(440px, 100%);

    h1 { font-size: clamp(2.5rem, 5vw, 3.25rem); }
  }

  .auth-logo-mobile {
    display: inline-block;
    margin-bottom: 2rem;
    .logo { width: 120px; height: auto; display: block; }
  }

  .auth-sub {
    margin-top: 0.75rem;
    color: var(--text-secondary);
  }

  form {
    display: grid;
    gap: 1.1rem;
    margin-top: 2rem;
  }

  .form-row { display: grid; gap: 0.45rem; }

  .form-label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .form-input {
    width: 100%;
    padding: 0.95rem 1.1rem;
    border-radius: 0.9rem;
    border: 1px solid var(--border-strong);
    background: var(--surface);
    color: var(--text-primary);
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(53, 132, 56, 0.15);
    }
  }

  .form-error {
    padding: 0.85rem 1rem;
    border-radius: 0.9rem;
    background: var(--red-light);
    color: var(--accent);
    font-size: 0.92rem;
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    margin-top: 0.5rem;
    padding: 1rem;
    border: none;
    border-radius: var(--radius-pill);
    background: var(--primary);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) { background: var(--primary-hover); }
    &:disabled { opacity: 0.7; cursor: wait; }
  }

  .auth-links {
    display: grid;
    gap: 0.75rem;
    margin-top: 0.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: 0.95rem;
    color: var(--text-secondary);

    a { color: var(--primary); font-weight: 600; }
  }

  @media (min-width: 992px) {
    grid-template-columns: 1.05fr 0.95fr;

    .auth-visual { display: block; }
    .auth-logo-mobile { display: none; }
  }
`;

export default Wrapper;
