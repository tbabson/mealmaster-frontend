import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 60vh;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 55vh;
    text-align: center;

    .empty-icon {
      font-size: 5rem;
      color: var(--primary);
      opacity: 0.4;
    }

    h2 {
      font-size: 1.6rem;
      color: var(--darkest);
      font-weight: 700;
    }

    p {
      color: var(--dark);
      font-size: 1rem;
      max-width: 320px;
    }

    .btn-primary {
      margin-top: 0.5rem;
      padding: 0.75rem 2rem;
    }
  }

  .cart-header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--secondary);

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--darkest);
    }

    .item-count {
      font-size: 0.95rem;
      color: var(--dark);
      background: var(--primary);
      color: var(--light);
      padding: 0.15rem 0.65rem;
      border-radius: 999px;
      font-weight: 600;
    }
  }

  .cartContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;

    @media (min-width: 768px) {
      grid-template-columns: 2fr 1fr;
    }
  }

  .cartItemList {
    width: 100%;
  }

  .cartTotals {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
    }
  }

  .checkout-btn {
    display: block;
    text-align: center;
    padding: 0.85rem;
    font-size: 1rem;
    font-weight: 600;
    background: var(--primary);
    color: var(--light);
    border-radius: 0.5rem;
    transition: background 0.25s ease, transform 0.15s ease;

    &:hover {
      background: var(--secondary);
      transform: translateY(-1px);
    }
  }

  .continue-link {
    text-align: center;
    font-size: 0.9rem;
    color: var(--dark);
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--secondary);
    }
  }

  /* ═══════════════════════════════════════════════════════
     GUEST / NOT LOGGED IN SCREEN
  ═══════════════════════════════════════════════════════ */
  .guest-screen {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
  }

  .guest-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
    padding: 3rem 2.5rem;
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .guest-avatar {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff8a65 0%, #ff5722 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2rem;
    box-shadow: 0 4px 18px rgba(255, 87, 34, 0.28);
    flex-shrink: 0;
  }

  .guest-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
    line-height: 1.2;
  }

  .guest-sub {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.65;
    margin: 0;
    max-width: 380px;
  }

  .guest-features {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    text-align: left;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    border: 1px solid #f1f5f9;
    background: #fafbfc;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: rgba(255, 87, 34, 0.2);
      background: #fff9f7;
    }
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

  .save-icon     { background: #fef9c3; color: #b45309; }
  .checkout-icon { background: #ede9fe; color: #6d28d9; }
  .secure-icon   { background: #dcfce7; color: #166534; }

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

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }
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

    &:hover {
      background: #fff5f2;
      transform: translateY(-1px);
    }
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

    &:hover { text-decoration: underline; }
  }

  @media (max-width: 480px) {
    .guest-card { padding: 2rem 1.25rem; }
    .guest-actions { flex-direction: column; }
  }
`;

export default Wrapper;
