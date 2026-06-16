import styled from "styled-components";

const Wrapper = styled.section`
  background: #f8fafc;
  min-height: 100vh;

  /* ═══════════════════════════════════════════════════════
     HERO
  ═══════════════════════════════════════════════════════ */
  .blog-hero {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    padding: 5rem 1.5rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .blog-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 50%, rgba(255, 87, 34, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  .hero-eyebrow {
    display: inline-block;
    padding: 0.25rem 0.85rem;
    border-radius: 20px;
    background: rgba(255, 87, 34, 0.18);
    color: #ff8a65;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hero-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    margin: 0;
  }

  .hero-sub {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.6;
  }

  /* Search bar */
  .search-bar {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin-top: 0.5rem;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 0.9rem;
    pointer-events: none;
  }

  .search-bar input {
    width: 100%;
    padding: 0.85rem 3rem 0.85rem 2.75rem;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    outline: none;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: border-color 0.2s, background 0.2s;
  }

  .search-bar input::placeholder {
    color: #64748b;
  }

  .search-bar input:focus {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 87, 34, 0.5);
  }

  .clear-search {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    transition: color 0.15s;
  }

  .clear-search:hover {
    color: #ef4444;
  }

  /* ═══════════════════════════════════════════════════════
     FILTER BAR
  ═══════════════════════════════════════════════════════ */
  .filter-bar {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cat-pills {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
  }

  .cat-pill {
    padding: 0.38rem 1rem;
    border-radius: 20px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .cat-pill:hover:not(.active) {
    border-color: #94a3b8;
    color: #1e293b;
  }

  .cat-pill.active {
    background: var(--secondary, #ff5722);
    border-color: var(--secondary, #ff5722);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
  }

  .sort-select {
    padding: 0.45rem 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    font-size: 0.83rem;
    color: #475569;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .sort-select:focus {
    border-color: var(--secondary, #ff5722);
  }

  /* ═══════════════════════════════════════════════════════
     BLOG GRID
  ═══════════════════════════════════════════════════════ */
  .blog-grid {
    max-width: 1200px;
    margin: 1.5rem auto 0;
    padding: 0 1.5rem 3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* First card is featured — spans all 3 columns horizontally */
  .blog-card.featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .blog-card.featured .card-img-wrap {
    height: 360px;
    border-radius: 14px 0 0 14px;
  }

  .blog-card.featured .card-body {
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 14px 14px 0;
  }

  .blog-card.featured .card-title {
    font-size: 1.5rem;
  }

  .blog-card.featured .card-excerpt {
    -webkit-line-clamp: 5;
  }

  /* ── Card ──────────────────────────────────────────── */
  .blog-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  /* Image area */
  .card-img-wrap {
    position: relative;
    display: block;
    height: 220px;
    overflow: hidden;
    text-decoration: none;
    flex-shrink: 0;
  }

  .card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .blog-card:hover .card-img-wrap img {
    transform: scale(1.04);
  }

  .card-img-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  }

  .card-cat {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.22rem 0.7rem;
    border-radius: 20px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    z-index: 1;
  }

  /* Card body */
  .card-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.15s;
  }

  .card-title a:hover {
    color: var(--secondary, #ff5722);
  }

  .card-excerpt {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  /* Card footer */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
  }

  .card-meta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: #94a3b8;
    white-space: nowrap;
  }

  .meta-icon {
    font-size: 0.7rem;
  }

  .read-more {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--secondary, #ff5722);
    text-decoration: none;
    transition: gap 0.18s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .read-more:hover {
    gap: 0.55rem;
  }

  .arrow-icon {
    font-size: 0.7rem;
  }

  /* ═══════════════════════════════════════════════════════
     EMPTY STATE
  ═══════════════════════════════════════════════════════ */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 6rem 2rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 3rem;
    color: #e2e8f0;
  }

  .empty-state h2 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  .empty-state p {
    color: #94a3b8;
    margin: 0;
  }

  .clear-btn {
    margin-top: 0.5rem;
    padding: 0.55rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .clear-btn:hover {
    opacity: 0.88;
  }

  /* ═══════════════════════════════════════════════════════
     PAGINATION
  ═══════════════════════════════════════════════════════ */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0 1.5rem 4rem;
  }

  .pag-btn {
    min-width: 38px;
    height: 38px;
    padding: 0 0.75rem;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #475569;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pag-btn:hover:not(:disabled):not(.active) {
    border-color: var(--secondary, #ff5722);
    color: var(--secondary, #ff5722);
  }

  .pag-btn.active {
    background: var(--secondary, #ff5722);
    border-color: var(--secondary, #ff5722);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
  }

  .pag-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pag-dots {
    color: #94a3b8;
    font-size: 0.9rem;
    padding: 0 0.25rem;
    display: flex;
    align-items: center;
  }

  /* ═══════════════════════════════════════════════════════
     RESPONSIVE
  ═══════════════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .blog-card.featured {
      grid-template-columns: 1fr;
    }
    .blog-card.featured .card-img-wrap {
      height: 260px;
      border-radius: 14px 14px 0 0;
    }
    .blog-card.featured .card-body {
      border-radius: 0 0 14px 14px;
      padding: 1.5rem;
    }
    .blog-card.featured .card-title {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 580px) {
    .blog-grid {
      grid-template-columns: 1fr;
    }
    .filter-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .sort-select {
      width: 100%;
    }
  }
`;

export default Wrapper;
