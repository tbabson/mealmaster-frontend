import styled from "styled-components";
import { motion } from "framer-motion";

/* ── Page wrapper ─────────────────────────────────────────────── */
const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 1.75rem 1.75rem 5rem;
  max-width: 1200px;
  margin: 0 auto;

  /* ── Page header ────────────────────────────────── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--secondary);
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: 0.55rem;
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
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }

  .browse-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.25rem;
    background: var(--primary);
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 700;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;

    &:hover {
      background: var(--darkest);
      transform: translateY(-1px);
    }
  }

  /* ── Stats strip ────────────────────────────────── */
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
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &.upcoming .chip-num { color: var(--secondary); }
    &.recurring .chip-num { color: #a855f7; }
  }

  /* ── Main layout ────────────────────────────────── */
  .main-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  /* ── Calendar column ────────────────────────────── */
  .calendar-col {
    position: sticky;
    top: 5.5rem;
  }

  .calendar-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    padding: 0.5rem;
  }

  .cal-legend {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: #64748b;
    margin: 0.6rem 0 0 0.25rem;
  }

  .legend-dot {
    width: 7px;
    height: 7px;
    background: var(--primary);
    border-radius: 50%;
    display: inline-block;
  }

  /* ── react-calendar overrides ───────────────────── */
  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    background: transparent;
    line-height: 1.4;
  }

  .react-calendar__navigation {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    gap: 0.2rem;
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--darkest);
    cursor: pointer;
    padding: 0.4rem 0.5rem;
    transition: background 0.15s;
    min-width: 32px;

    &:hover { background: #f1f5f9; }
    &:disabled { color: #cbd5e1; cursor: default; }
  }

  .react-calendar__navigation__label {
    font-size: 0.95rem !important;
    font-weight: 700 !important;
    color: var(--darkest) !important;
    flex: 1;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94a3b8;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 0.25rem;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__tile {
    background: none;
    border: none;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    padding: 0.45rem 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    transition: background 0.15s, color 0.15s;
    position: relative;

    &:hover {
      background: #f0fdf4;
      color: var(--primary);
    }

    abbr { pointer-events: none; }
  }

  .react-calendar__tile--now {
    background: #f0fdf4 !important;
    color: var(--primary) !important;
    font-weight: 700;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:hover {
    background: var(--primary) !important;
    color: #fff !important;
    font-weight: 700;
  }

  .react-calendar__tile--active .cal-dot {
    background: rgba(255, 255, 255, 0.8) !important;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #cbd5e1;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #64748b;
  }

  .cal-dot {
    width: 5px;
    height: 5px;
    background: var(--primary);
    border-radius: 50%;
    display: block;
    flex-shrink: 0;
  }

  /* ── List column ────────────────────────────────── */
  .list-col {
    min-height: 200px;
  }

  .list-heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0 0 1.1rem;

    .heading-icon {
      color: var(--secondary);
      font-size: 0.9rem;
    }
  }

  .loading-wrap {
    display: flex;
    justify-content: center;
    padding: 3rem;
  }

  /* ── Empty state ────────────────────────────────── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3.5rem 2rem;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    gap: 0.65rem;

    .empty-icon {
      font-size: 2.75rem;
      color: #cbd5e1;
    }

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--darkest);
      margin: 0;
    }

    p {
      font-size: 0.85rem;
      color: #64748b;
      margin: 0;
      max-width: 280px;
    }
  }

  .empty-cta {
    margin-top: 0.25rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1.2rem;
    background: var(--primary);
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 700;
    transition: background 0.2s;

    &:hover { background: var(--darkest); }
  }

  /* ── Reminder cards ─────────────────────────────── */
  .cards-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .reminder-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    padding: 1.1rem 1.2rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    &.past { opacity: 0.65; }
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
    padding-left: 0.5rem;
  }

  .card-meal {
    font-size: 1rem;
    font-weight: 700;
    color: var(--darkest);
    margin: 0;
    flex: 1;
    line-height: 1.3;
  }

  .badge-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .method-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.18rem 0.5rem;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.03em;

    svg { font-size: 0.6rem; }
  }

  .recurring-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.18rem 0.5rem;
    border-radius: 20px;
    background: #f3e8ff;
    color: #a855f7;
    text-transform: capitalize;

    .b-icon { font-size: 0.6rem; }
  }

  .past-badge {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.15rem 0.45rem;
    border-radius: 20px;
    background: #f1f5f9;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .card-time {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    margin: 0;
    padding-left: 0.5rem;

    .time-icon {
      color: var(--secondary);
      font-size: 0.75rem;
    }
  }

  .card-note {
    font-size: 0.8rem;
    color: #64748b;
    font-style: italic;
    background: #f8fafc;
    border-left: 3px solid #e2e8f0;
    padding: 0.35rem 0.6rem;
    border-radius: 0 6px 6px 0;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid #f1f5f9;
    padding-top: 0.7rem;
    margin-top: 0.1rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.38rem 0.75rem;
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

    &.delete {
      background: #fef2f2;
      color: #ef4444;
      &:hover { background: #ef4444; color: #fff; }
    }
  }

  /* ── Responsive ─────────────────────────────────── */
  @media (max-width: 820px) {
    .main-layout {
      grid-template-columns: 1fr;
    }

    .calendar-col {
      position: static;
    }

    .calendar-card {
      max-width: 340px;
    }
  }

  @media (max-width: 480px) {
    padding: 1.1rem 1rem 3rem;

    .calendar-card {
      max-width: 100%;
    }
  }
`;

/* ── Modal overlay ────────────────────────────────────────────── */
export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 25, 12, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

/* ── Modal content ────────────────────────────────────────────── */
export const ModalContent = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  width: 95%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);

  /* Header */
  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1.4rem 1.5rem 1.1rem;
    border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(135deg, #143315 0%, #0f2210 100%);
    border-radius: 16px 16px 0 0;
  }

  .modal-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 0.2rem;
    line-height: 1.3;
  }

  .modal-sub {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.12);
    border: none;
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 0.875rem;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.22);
      color: #fff;
    }
  }

  /* Body */
  .modal-body {
    padding: 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    position: relative;
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
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(40, 132, 43, 0.12);
      background: #fff;
    }
  }

  .field-textarea {
    min-height: 90px;
    resize: vertical;
    line-height: 1.5;
    padding-bottom: 1.5rem;
  }

  .char-count {
    position: absolute;
    bottom: 0.45rem;
    right: 0.65rem;
    font-size: 0.7rem;
    color: #94a3b8;
    pointer-events: none;
  }

  /* Info rows (view mode) */
  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child { border-bottom: none; }
  }

  .info-icon {
    color: #94a3b8;
    font-size: 0.9rem;
    margin-top: 0.15rem;
    flex-shrink: 0;
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
  }

  .info-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94a3b8;
  }

  .info-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--darkest);
  }

  .method-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.22rem 0.6rem;
    border-radius: 20px;
    text-transform: capitalize;
    width: fit-content;

    svg { font-size: 0.65rem; }
  }

  .note-block {
    background: #f8fafc;
    border-left: 3px solid #e2e8f0;
    border-radius: 0 8px 8px 0;
    padding: 0.65rem 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    p {
      font-size: 0.875rem;
      color: #475569;
      margin: 0;
      line-height: 1.5;
      font-style: italic;
    }
  }

  /* Footer */
  .modal-footer {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.5rem 1.4rem;
    border-top: 1px solid #f1f5f9;
    flex-wrap: wrap;
  }

  .modal-order-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1.1rem;
    background: var(--secondary);
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 700;
    transition: background 0.2s, transform 0.15s;
    margin-right: auto;

    &:hover {
      background: #e64a19;
      transform: translateY(-1px);
    }
  }

  .modal-edit-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    background: #eff6ff;
    color: #3b82f6;
    border: 1.5px solid #bfdbfe;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;

    &:hover {
      background: #3b82f6;
      color: #fff;
      border-color: #3b82f6;
    }
  }

  .modal-delete-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    background: #fef2f2;
    color: #ef4444;
    border: 1.5px solid #fecaca;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;

    &:hover {
      background: #ef4444;
      color: #fff;
      border-color: #ef4444;
    }
  }

  .modal-cancel {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1.1rem;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    margin-left: auto;

    &:hover {
      border-color: #94a3b8;
      color: var(--darkest);
    }
  }

  .modal-save {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 1.25rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
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

  @media (max-width: 480px) {
    .modal-footer {
      flex-wrap: wrap;

      .modal-order-btn { order: -1; width: 100%; justify-content: center; margin-right: 0; }
      .modal-cancel { margin-left: 0; }
      .modal-cancel,
      .modal-save,
      .modal-edit-btn,
      .modal-delete-btn { flex: 1; justify-content: center; }
    }
  }
`;

export default Wrapper;
