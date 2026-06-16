import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;

  /* ── Progress Steps ── */
  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-bottom: 2.5rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    color: #a0aec0;

    .step-dot {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 2px solid #cbd5e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      background: #fff;
    }

    span {
      font-size: 0.75rem;
      font-weight: 500;
    }

    &.active {
      color: var(--primary);
      .step-dot {
        border-color: var(--primary);
        color: var(--primary);
      }
    }

    &.current .step-dot {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }
  }

  .step-line {
    flex: 1;
    height: 2px;
    background: #cbd5e0;
    margin: 0 0.5rem;
    margin-bottom: 1.2rem;
    max-width: 80px;

    &.active {
      background: var(--primary);
    }
  }

  /* ── Layout ── */
  .checkout-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;

    @media (min-width: 768px) {
      grid-template-columns: 3fr 2fr;
    }
  }

  .form-col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .summary-col {
    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
    }
  }

  /* ── Card ── */
  .checkout-card {
    background: #fff;
    border-radius: 0.75rem;
    padding: 1.75rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .card-section-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary);

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--darkest);
    }

    .section-icon {
      font-size: 1.3rem;
      color: var(--primary);
    }
  }

  /* ── Form inputs ── */
  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: var(--darkest);
    text-transform: capitalize;
  }

  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.6rem 0.85rem;
    border-radius: 0.4rem;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    color: var(--darkest);
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 72, 187, 120), 0.15);
    }

    &::placeholder {
      color: #a0aec0;
    }
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  /* ── Payment section ── */
  .payment-section {
    margin-top: 1.75rem;
  }

  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .payment-card {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 0.9rem 1rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: #fafafa;

    input[type="radio"] {
      accent-color: var(--primary);
      width: 1.1rem;
      height: 1.1rem;
      flex-shrink: 0;
    }

    .pay-icon {
      font-size: 1.4rem;
      color: var(--dark);
      flex-shrink: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .pay-label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--darkest);
    }

    .pay-sub {
      font-size: 0.78rem;
      color: var(--dark);
    }

    &.selected {
      border-color: var(--primary);
      background: rgba(72, 187, 120, 0.06);

      .pay-icon {
        color: var(--primary);
      }
    }

    &:hover:not(.selected) {
      border-color: #a0aec0;
    }
  }

  /* ── Submit button ── */
  .submit-btn {
    width: 100%;
    margin-top: 1.5rem;
    padding: 0.85rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background 0.25s ease, transform 0.15s ease;

    svg {
      font-size: 1.2rem;
    }

    &:hover:not(:disabled) {
      background: var(--darkest);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* ── Bank transfer ── */
  .bank-transfer-container {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* Steps */
  .transfer-steps {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.6rem;
    border: 1px solid #e2e8f0;
  }

  .transfer-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
    text-align: center;

    span {
      font-size: 0.75rem;
      color: var(--dark);
      line-height: 1.3;
    }
  }

  .t-step-num {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .transfer-step-line {
    flex-shrink: 0;
    width: 2rem;
    height: 2px;
    background: #cbd5e0;
    margin-bottom: 1.2rem;
  }

  /* Amount */
  .transfer-amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: var(--primary);
    border-radius: 0.6rem;
    color: #fff;
  }

  .amount-label {
    font-size: 0.88rem;
    font-weight: 500;
    opacity: 0.9;
  }

  .amount-value {
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  /* Bank slip */
  .bank-slip {
    border: 1.5px solid #e2e8f0;
    border-radius: 0.65rem;
    overflow: hidden;
  }

  .bank-slip-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--darkest);
    color: #fff;
    padding: 0.75rem 1.1rem;
    font-size: 0.9rem;
    font-weight: 600;

    .slip-bank-icon {
      font-size: 1.1rem;
      opacity: 0.85;
    }
  }

  .slip-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.1rem;
    border-bottom: 1px solid #f1f5f9;
    gap: 0.5rem;

    &:last-child {
      border-bottom: none;
    }
  }

  .account-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .slip-key {
    font-size: 0.82rem;
    color: var(--dark);
    font-weight: 500;
    white-space: nowrap;
  }

  .slip-val {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--darkest);
  }

  .account-num-wrap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .account-num {
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    color: var(--primary);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.65rem;
    border-radius: 0.35rem;
    border: 1.5px solid var(--primary);
    background: #fff;
    color: var(--primary);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;

    svg {
      font-size: 0.85rem;
    }

    &:hover {
      background: var(--primary);
      color: #fff;
    }

    &.copied {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }
  }

  /* Confirmation */
  .confirmation-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.9rem 1rem;
    border-radius: 0.5rem;
    border: 1.5px solid #e2e8f0;
    background: #fafafa;
    transition: border-color 0.2s, background 0.2s;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--darkest);
    line-height: 1.4;

    input[type="checkbox"] {
      accent-color: var(--primary);
      width: 1.1rem;
      height: 1.1rem;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }

    &.checked {
      border-color: var(--primary);
      background: rgba(72, 187, 120, 0.06);
    }
  }

  /* ── Back link ── */
  .back-link {
    font-size: 0.88rem;
    color: var(--dark);
    text-decoration: underline;
    transition: color 0.2s;
    padding-left: 0.25rem;

    &:hover {
      color: var(--primary);
    }
  }

  /* ── Order summary items ── */
  .order-items {
    margin-bottom: 1rem;
  }

  .order-item {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  .order-item-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.6rem;
  }

  .item-image {
    width: 3.2rem;
    height: 3.2rem;
    object-fit: cover;
    border-radius: 0.4rem;
    flex-shrink: 0;
  }

  .item-name {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--darkest);
    text-transform: capitalize;
  }

  .ingredients-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .ingredient-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    color: var(--dark);
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
    background: #f8fafc;
  }

  /* ── Summary totals ── */
  .summary-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 0.85rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.92rem;
    color: var(--dark);
    padding: 0.35rem 0;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--darkest);
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 2px solid var(--primary);
  }
`;

export default Wrapper;
