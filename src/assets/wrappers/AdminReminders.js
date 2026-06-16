import styled from "styled-components";

const Wrapper = styled.section`
  padding: 1.75rem 2rem 4rem;
  background: #f8fafc;
  min-height: 100vh;

  /* ── Page header ──────────────────────────────── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--darkest);
    margin: 0 0 0.2rem;
  }

  .title-icon {
    color: var(--secondary);
    font-size: 1.6rem;
  }

  .page-sub {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
  }

  .add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.3rem;
    background: var(--secondary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;

    &:hover {
      background: #e04e1e;
      transform: translateY(-1px);
    }
  }

  /* ── Stats strip ──────────────────────────────── */
  .stats-strip {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
  }

  .stat-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    .chip-num {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--darkest);
    }

    .chip-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &.recurring .chip-num { color: #a855f7; }
    &.email .chip-num     { color: #3b82f6; }
  }

  /* ── Loading / Empty ──────────────────────────── */
  .loading-state {
    display: flex;
    justify-content: center;
    padding: 4rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5rem 2rem;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    gap: 0.75rem;

    .empty-icon {
      font-size: 3rem;
      color: #cbd5e1;
    }

    h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--darkest);
      margin: 0;
    }

    p {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
  }

  /* ── Reminders grid ───────────────────────────── */
  .reminders-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  /* ── Reminder card ────────────────────────────── */
  .reminder-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    padding: 1.3rem 1.3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .card-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--accent);
    border-radius: 14px 0 0 14px;
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding-left: 0.4rem;
  }

  .meal-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0;
    flex: 1;
    line-height: 1.3;
  }

  .badge-row {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .method-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.18rem 0.55rem;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .recurring-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.18rem 0.55rem;
    border-radius: 20px;
    background: #f3e8ff;
    color: #a855f7;
    text-transform: capitalize;

    .badge-icon { font-size: 0.65rem; }
  }

  /* ── Card meta rows ───────────────────────────── */
  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-left: 0.4rem;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.825rem;
    color: #475569;
    margin: 0;

    &.dim { color: #94a3b8; font-style: italic; }
  }

  .meta-icon {
    font-size: 0.75rem;
    color: #94a3b8;
    flex-shrink: 0;
  }

  /* ── Card note ────────────────────────────────── */
  .card-note {
    font-size: 0.8rem;
    color: #64748b;
    font-style: italic;
    background: #f8fafc;
    border-left: 3px solid #e2e8f0;
    padding: 0.4rem 0.65rem;
    border-radius: 0 6px 6px 0;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Card actions ─────────────────────────────── */
  .card-actions {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    border-top: 1px solid #f1f5f9;
    padding-top: 0.85rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.38rem 0.7rem;
    border: none;
    border-radius: 7px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;

    &.edit {
      background: #eff6ff;
      color: #3b82f6;
      &:hover { background: #3b82f6; color: #fff; }
    }

    &.notify {
      background: #fff8f0;
      color: #ff5722;
      &:hover { background: #ff5722; color: #fff; }
    }

    &.sync {
      background: #faf5ff;
      color: #a855f7;
      &:hover { background: #a855f7; color: #fff; }
    }

    &.delete {
      background: #fef2f2;
      color: #ef4444;
      margin-left: auto;
      &:hover { background: #ef4444; color: #fff; }
    }
  }

  /* ═══════════════════════════════════════════════ */
  /* ── Form view ────────────────────────────────── */
  /* ═══════════════════════════════════════════════ */

  .form-view {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: none;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    width: fit-content;
    transition: border-color 0.2s, color 0.2s;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  }

  .form-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
    overflow: hidden;
  }

  .form-header {
    padding: 1.5rem 2rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(135deg, #143315 0%, #0f2210 100%);

    .form-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 0.3rem;
    }

    .form-sub {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.65);
      margin: 0;
    }
  }

  .reminder-form {
    padding: 2rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 2rem;

    @media (max-width: 680px) {
      grid-template-columns: 1fr;
    }
  }

  .form-col {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .field-group {
    margin-bottom: 1.25rem;
    position: relative;
  }

  .field-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #64748b;
    margin-bottom: 0.4rem;
  }

  .field-input {
    width: 100%;
    padding: 0.6rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--darkest);
    background: #f8fafc;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background: #fff;
    }

    option { background: #fff; }
  }

  .field-textarea {
    min-height: 110px;
    resize: vertical;
    font-family: inherit;
    line-height: 1.5;
  }

  .char-count {
    position: absolute;
    bottom: 0.4rem;
    right: 0.6rem;
    font-size: 0.7rem;
    color: #94a3b8;
    pointer-events: none;
  }

  /* ── Toggle switch ────────────────────────────── */
  .toggle-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0.6rem 0.85rem;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    transition: border-color 0.2s;

    &:hover { border-color: var(--primary); }
  }

  .toggle {
    width: 42px;
    height: 24px;
    background: #cbd5e1;
    border-radius: 12px;
    position: relative;
    transition: background 0.25s;
    flex-shrink: 0;

    &.on { background: var(--primary); }
  }

  .toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.18);
    transition: transform 0.25s;

    .toggle.on & { transform: translateX(18px); }
  }

  /* ── Form actions ─────────────────────────────── */
  .form-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #f1f5f9;
    flex-wrap: wrap;
  }

  .cancel-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.3rem;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;

    &:hover {
      border-color: #94a3b8;
      color: var(--darkest);
    }
  }

  .save-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.5rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
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

  /* ── Responsive ───────────────────────────────── */
  @media (max-width: 640px) {
    padding: 1.25rem 1rem 3rem;

    .reminders-grid {
      grid-template-columns: 1fr;
    }

    .reminder-form {
      padding: 1.25rem;
    }

    .form-actions {
      justify-content: stretch;

      .cancel-btn,
      .save-btn {
        flex: 1;
        justify-content: center;
      }
    }
  }
`;

export default Wrapper;
