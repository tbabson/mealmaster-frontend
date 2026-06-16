import styled from "styled-components";

const Wrapper = styled.div`
  /* ═══════════════════════════════════════════════════════
     SHIMMER KEYFRAME + BASE BLOCK
  ═══════════════════════════════════════════════════════ */
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .sk {
    background: #e8edf3;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .sk::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.65) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s ease-in-out infinite;
    transform: translateX(-100%);
  }

  /* ═══════════════════════════════════════════════════════
     SHARED LAYOUT HELPERS
  ═══════════════════════════════════════════════════════ */
  .sk-wrap {
    padding: 2rem 1.5rem;
    background: #f8fafc;
    min-height: 100vh;
  }

  .sk-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sk-row {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .sk-col {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    flex: 1;
  }

  .sk-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    flex: 1;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  /* ═══════════════════════════════════════════════════════
     PAGE (generic full-page)
  ═══════════════════════════════════════════════════════ */
  .sk-page {
    padding: 2.5rem 2rem;
    background: #f8fafc;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sk-page-hero {
    background: #fff;
    border-radius: 14px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  .sk-three-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .sk-three-cards { grid-template-columns: 1fr; }
  }

  /* ═══════════════════════════════════════════════════════
     PROFILE
  ═══════════════════════════════════════════════════════ */
  .sk-profile {
    padding: 2rem 1.5rem;
    background: #f8fafc;
    min-height: 100vh;
  }

  .sk-profile-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 860px) {
    .sk-profile-grid { grid-template-columns: 1fr; }
  }

  .sk-sidebar {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 16px;
    padding: 2rem 1.5rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .sk-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }

  .sk-pills-row {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .sk-profile-right {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sk-tabs {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 0.35rem;
    display: flex;
    gap: 0.25rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .sk-list-panel {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  .sk-list-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .sk-list-row:last-child {
    border-bottom: none;
  }

  /* ═══════════════════════════════════════════════════════
     REMINDERS PAGE
  ═══════════════════════════════════════════════════════ */
  .sk-reminders {
    padding: 2rem 1.5rem;
    background: #f8fafc;
    min-height: 100vh;
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sk-reminder-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  /* ═══════════════════════════════════════════════════════
     SINGLE MEAL
  ═══════════════════════════════════════════════════════ */
  .sk-single-meal {
    padding: 2rem 1.5rem 4rem;
    background: #f8fafc;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sk-meal-hero {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 2rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  @media (max-width: 640px) {
    .sk-meal-hero { grid-template-columns: 1fr; }
  }

  .sk-meal-image {
    border-radius: 12px;
    aspect-ratio: 4 / 3;
  }

  /* ═══════════════════════════════════════════════════════
     SINGLE BLOG
  ═══════════════════════════════════════════════════════ */
  .sk-single-blog {
    padding: 2rem 1.5rem 4rem;
    background: #f8fafc;
    min-height: 100vh;
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sk-blog-hero-img {
    width: 100%;
    height: 340px;
    border-radius: 14px;
  }

  .sk-paragraph {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  /* ═══════════════════════════════════════════════════════
     BLOG GRID
  ═══════════════════════════════════════════════════════ */
  .sk-blog-wrap {
    padding: 2rem 1.5rem 4rem;
    background: #f8fafc;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sk-blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 860px) {
    .sk-blog-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 580px) {
    .sk-blog-grid { grid-template-columns: 1fr; }
  }

  .sk-blog-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .sk-blog-img {
    width: 100%;
    height: 180px;
    border-radius: 0;
  }

  .sk-blog-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  /* ═══════════════════════════════════════════════════════
     ADMIN TABLE (full-page admin loading)
  ═══════════════════════════════════════════════════════ */
  .sk-admin {
    padding: 1.5rem 2rem 3rem;
    background: #f8fafc;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sk-filter-bar {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    gap: 0.75rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .sk-table-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }

  .sk-table-head {
    display: flex;
    gap: 1rem;
    padding: 0.9rem 1.25rem;
    border-bottom: 2px solid #f1f5f9;
    background: #fafbfc;
  }

  .sk-table-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #f8fafc;
  }

  .sk-table-row:last-child {
    border-bottom: none;
  }

  /* ═══════════════════════════════════════════════════════
     ADMIN DASHBOARD
  ═══════════════════════════════════════════════════════ */
  .sk-dashboard {
    padding: 1.5rem 2rem 3rem;
    background: #f8fafc;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sk-stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .sk-stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .sk-stat-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .sk-chart {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    padding: 1.5rem;
    height: 260px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  /* ═══════════════════════════════════════════════════════
     INLINE ROWS (used inside admin table-card)
  ═══════════════════════════════════════════════════════ */
  .sk-inline-rows {
    display: flex;
    flex-direction: column;
  }
`;

export default Wrapper;
