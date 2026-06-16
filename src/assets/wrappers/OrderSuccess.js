import styled, { keyframes } from "styled-components";

const popIn = keyframes`
  0%   { transform: scale(0.6); opacity: 0; }
  70%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(1.55); opacity: 0; }
  100% { transform: scale(1.55); opacity: 0; }
`;

const slideUp = keyframes`
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const drawCheck = keyframes`
  from { stroke-dashoffset: 40; }
  to   { stroke-dashoffset: 0; }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(160deg, #f0fdf4 0%, #fff 60%);

  .page {
    width: 100%;
    max-width: 520px;
  }

  .card {
    background: #fff;
    border-radius: 1.25rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: ${slideUp} 0.45s ease both;
  }

  /* ── Animated checkmark ── */
  .check-wrap {
    position: relative;
    width: 6rem;
    height: 6rem;
    margin: 0 auto 1.5rem;
  }

  .check-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--primary);
    opacity: 0.15;
    animation: ${pulse} 1.8s ease-out 0.2s infinite;
  }

  .check-circle {
    position: relative;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${popIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;

    svg {
      width: 2.6rem;
      height: 2.6rem;
      color: #fff;
      stroke-dasharray: 40;
      stroke-dashoffset: 40;
      animation: ${drawCheck} 0.4s ease 0.4s forwards;
    }
  }

  /* ── Text ── */
  .title {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--darkest);
    margin-bottom: 0.6rem;
  }

  .subtitle {
    font-size: 0.95rem;
    color: var(--dark);
    line-height: 1.6;
    max-width: 360px;
    margin: 0 auto 1.75rem;
  }

  /* ── Order details ── */
  .order-details {
    border: 1.5px solid #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 1.25rem;
    text-align: left;
  }

  .details-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--darkest);
    color: #fff;
    padding: 0.7rem 1.1rem;
    font-size: 0.88rem;
    font-weight: 600;

    .details-icon {
      font-size: 1rem;
      opacity: 0.85;
    }
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f1f5f9;

    &:nth-child(2n) {
      border-right: none;
    }

    &:nth-last-child(-n+2) {
      border-bottom: none;
    }

    @media (max-width: 420px) {
      grid-column: span 2;
      border-right: none;

      &:last-child {
        border-bottom: none;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;
    }
  }

  .detail-icon {
    font-size: 1rem;
    color: var(--primary);
    margin-top: 0.15rem;
    flex-shrink: 0;
  }

  .detail-label {
    font-size: 0.75rem;
    color: var(--dark);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .detail-value {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--darkest);
    word-break: break-all;

    &.mono {
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.05em;
      color: var(--primary);
    }

    &.amount {
      color: var(--primary);
      font-size: 1rem;
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.65rem;
    background: #fef9c3;
    color: #854d0e;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    border: 1px solid #fde047;
  }

  /* ── Notice ── */
  .notice {
    font-size: 0.82rem;
    color: var(--dark);
    line-height: 1.5;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 0.5rem;
    padding: 0.65rem 0.9rem;
    margin-bottom: 1.75rem;
    text-align: left;
  }

  /* ── Actions ── */
  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: 420px) {
      flex-direction: row;
    }
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.92rem;
    font-weight: 600;
    transition: background 0.2s ease, transform 0.15s ease;
    text-decoration: none;

    svg {
      font-size: 1.1rem;
    }

    &:hover {
      transform: translateY(-1px);
    }
  }

  .btn-primary {
    background: var(--primary);
    color: #fff;

    &:hover {
      background: var(--darkest);
    }
  }

  .btn-secondary {
    background: #f1f5f9;
    color: var(--darkest);
    border: 1.5px solid #e2e8f0;

    &:hover {
      background: #e2e8f0;
    }
  }
`;

export default Wrapper;
