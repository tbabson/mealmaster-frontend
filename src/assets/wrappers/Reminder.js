import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;

  /* ── Hero ─────────────────────────────────────── */
  .page-hero {
    position: relative;
    background-color: #143315;
    background-image: var(--hero-img);
    background-size: cover;
    background-position: center;
    padding: 0;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 25, 12, 0.92) 0%,
      rgba(20, 51, 21, 0.78) 55%,
      rgba(10, 25, 12, 0.6) 100%
    );
  }

  .hero-inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 1.5rem 1.75rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    width: fit-content;
    transition: color 0.2s;

    &:hover { color: #fff; }
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--secondary);
    margin-bottom: 0.3rem;
  }

  .hero-title {
    font-size: clamp(1.5rem, 3.5vw, 2.2rem);
    font-weight: 800;
    color: #fff;
    margin: 0 0 0.5rem;
    line-height: 1.2;
  }

  .hero-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
    text-transform: capitalize;

    &.green {
      background: rgba(40, 132, 43, 0.35);
      color: #a3e6a5;
    }
  }

  /* ── Page content ─────────────────────────────── */
  .page-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.75rem 5rem;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.75rem;
    align-items: start;
  }

  /* ── Form card ────────────────────────────────── */
  .form-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
    overflow: hidden;
  }

  /* ── Section blocks ───────────────────────────── */
  .section-block {
    padding: 1.5rem 1.75rem;
    border-bottom: 1px solid #f1f5f9;

    &:last-of-type { border-bottom: none; }
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 1.1rem;

    .section-icon {
      color: var(--secondary);
      font-size: 0.85rem;
    }
  }

  /* ── Date / time row ──────────────────────────── */
  .datetime-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 0.85rem;
    align-items: end;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
  }

  .field-input {
    width: 100%;
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background: #fff;
    }
  }

  .field-textarea {
    min-height: 100px;
    resize: vertical;
    line-height: 1.5;
  }

  .char-count {
    position: absolute;
    bottom: 0.45rem;
    right: 0.65rem;
    font-size: 0.7rem;
    color: #94a3b8;
    pointer-events: none;
  }

  /* ── AM / PM toggle ───────────────────────────── */
  .period-group { min-width: 90px; }

  .period-toggle {
    display: flex;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    overflow: hidden;
  }

  .period-btn {
    flex: 1;
    padding: 0.6rem 0;
    border: none;
    background: #f8fafc;
    font-size: 0.85rem;
    font-weight: 700;
    color: #64748b;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;

    &.active {
      background: var(--primary);
      color: #fff;
    }

    &:first-child { border-right: 1px solid #e2e8f0; }
  }

  /* ── Time preview ─────────────────────────────── */
  .time-preview {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.85rem;
    font-size: 0.85rem;
    color: #475569;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 0.5rem 0.85rem;

    .preview-icon {
      color: #16a34a;
      flex-shrink: 0;
    }

    strong { color: var(--darkest); }
  }

  /* ── Method pills ─────────────────────────────── */
  .method-pills {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .method-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0.85rem 0.6rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: #f8fafc;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
    text-align: center;

    .pill-icon {
      font-size: 1.25rem;
      color: #94a3b8;
      transition: color 0.2s;
    }

    .pill-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #475569;
      transition: color 0.2s;
    }

    .pill-desc {
      font-size: 0.7rem;
      color: #94a3b8;
      line-height: 1.3;
    }

    &:hover {
      border-color: var(--primary);
      transform: translateY(-1px);
    }

    &.active {
      border-color: var(--primary);
      background: #f0fdf4;

      .pill-icon { color: var(--primary); }
      .pill-label { color: var(--primary); }
    }
  }

  /* ── Method extras (push / calendar) ─────────── */
  .method-extra {
    margin-top: 1rem;
  }

  .connected-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #16a34a;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 0.6rem 0.9rem;

    .connected-icon { flex-shrink: 0; }
  }

  .disconnect-btn {
    margin-left: auto;
    background: none;
    border: 1px solid #86efac;
    border-radius: 6px;
    color: #16a34a;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.6rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #dcfce7; }
  }

  .connect-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    background: var(--primary);
    color: #fff;
    transition: background 0.2s, transform 0.15s;

    &:hover { background: var(--darkest); transform: translateY(-1px); }

    &.google {
      background: #4285f4;
      &:hover { background: #3367d6; }
    }
  }

  /* ── Recurring row ────────────────────────────── */
  .recurring-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .toggle-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0.7rem 0.85rem;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    transition: border-color 0.2s;

    &:hover { border-color: var(--primary); }
  }

  .toggle-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--darkest);
  }

  .toggle {
    width: 44px;
    height: 26px;
    background: #cbd5e1;
    border-radius: 13px;
    position: relative;
    transition: background 0.25s;
    flex-shrink: 0;

    &.on { background: var(--primary); }
  }

  .toggle-knob {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s;

    .toggle.on & { transform: translateX(18px); }
  }

  .freq-pills {
    display: flex;
    gap: 0.5rem;
  }

  .freq-pill {
    flex: 1;
    padding: 0.5rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.18s;

    &:hover { border-color: var(--primary); }

    &.active {
      border-color: var(--primary);
      background: #f0fdf4;
      color: var(--primary);
    }
  }

  /* ── Submit button ────────────────────────────── */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.9rem;
    margin: 0 1.75rem 1.75rem;
    width: calc(100% - 3.5rem);
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;

    &:hover:not(:disabled) {
      background: var(--darkest);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  }

  /* ── Meal summary card ────────────────────────── */
  .meal-card {
    position: sticky;
    top: 5.5rem;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
    overflow: hidden;
  }

  .meal-card-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .meal-card-body {
    padding: 1.25rem;
  }

  .mc-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 1.1rem;
    line-height: 1.3;
  }

  .mc-section {
    margin-bottom: 1.1rem;

    &:last-child { margin-bottom: 0; }
  }

  .mc-section-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #94a3b8;
    margin: 0 0 0.6rem;
  }

  .mc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .mc-list-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    color: #475569;
    text-transform: capitalize;

    &.dim { color: #94a3b8; font-style: italic; }
  }

  .ing-dot {
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ing-qty {
    color: #94a3b8;
    font-size: 0.75rem;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .step-row {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
  }

  .step-num {
    min-width: 22px;
    height: 22px;
    background: var(--secondary);
    color: #fff;
    border-radius: 50%;
    font-size: 0.68rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 0.8rem;
    color: #475569;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Responsive ───────────────────────────────── */
  @media (max-width: 860px) {
    .page-content {
      grid-template-columns: 1fr;
    }

    .meal-card {
      position: static;
      order: -1;
    }

    .meal-card-img { aspect-ratio: 16 / 7; }
  }

  @media (max-width: 580px) {
    .page-content {
      padding: 1.25rem 1rem 3rem;
    }

    .datetime-row {
      grid-template-columns: 1fr 1fr;

      .period-group { grid-column: span 2; }
    }

    .method-pills {
      grid-template-columns: 1fr;
    }

    .section-block {
      padding: 1.25rem 1rem;
    }

    .submit-btn {
      margin: 0 1rem 1.25rem;
      width: calc(100% - 2rem);
    }
  }
`;

export default Wrapper;
