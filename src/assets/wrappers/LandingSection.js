import styled from "styled-components";

const Wrapper = styled.div`
  /* ═══════════════════════════════════════════════════════
     SHARED
  ═══════════════════════════════════════════════════════ */
  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    gap: 1rem;
  }

  .section-head.centered {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-eyebrow {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--secondary, #ff5722);
    margin-bottom: 0.4rem;
  }

  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  .section-title.light { color: #fff; }
  .section-title.dark  { color: #222; }

  /* ═══════════════════════════════════════════════════════
     FEATURE STRIP
  ═══════════════════════════════════════════════════════ */
  .features-section {
    background: var(--lightest, #f4faf4);
    padding: 4.5rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .features-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .feature-card {
    text-align: center;
    padding: 2rem 1.5rem;
    border-radius: 16px;
    border: 1px solid #e8edf3;
    transition: box-shadow 0.2s, transform 0.2s;
    background: #fff;
  }

  .feature-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  .feat-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin: 0 auto 1.1rem;
  }

  .feat-green  { background: #dcfce7; color: #166534; }
  .feat-orange { background: #fff5f2; color: var(--secondary, #ff5722); }
  .feat-blue   { background: #dbeafe; color: #1e40af; }
  .feat-yellow { background: #fef9c3; color: #b45309; }

  .feat-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.45rem;
  }

  .feat-desc {
    font-size: 0.84rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  /* ═══════════════════════════════════════════════════════
     FEATURED MEALS
  ═══════════════════════════════════════════════════════ */
  .meals-section {
    background: #143315;
    padding: 5rem 1.5rem;
  }

  .view-all-link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #ff8a65;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s;
    flex-shrink: 0;
    padding-bottom: 0.2rem;
  }

  .view-all-link:hover { color: #fff; }

  /* Meal card grid */
  .meals-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-bottom: 2.75rem;
  }

  /* Skeleton card */
  .meal-card-sk {
    height: 270px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }

  .meal-card-sk::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.07) 50%,
      transparent 100%
    );
    animation: sk-sweep 1.5s ease-in-out infinite;
    transform: translateX(-100%);
  }

  @keyframes sk-sweep {
    100% { transform: translateX(100%); }
  }

  /* Real meal card */
  .meal-card {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }

  .meal-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 87, 34, 0.3);
  }

  .meal-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .meal-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .meal-card:hover .meal-img-wrap img {
    transform: scale(1.06);
  }

  .meal-img-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a3020, #0f1f12);
  }

  .meal-cat {
    position: absolute;
    bottom: 0.65rem;
    left: 0.65rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }

  .meal-body {
    padding: 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  .meal-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  .meal-price {
    font-size: 1.05rem;
    font-weight: 800;
    color: #ff8a65;
  }

  .order-hint {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.45);
    transition: color 0.15s;
  }

  .meal-card:hover .order-hint { color: #ff8a65; }

  .meals-cta {
    text-align: center;
  }

  .btn-explore {
    display: inline-block;
    padding: 0.9rem 2.75rem;
    border-radius: 10px;
    background: var(--secondary, #ff5722);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(255, 87, 34, 0.38);
  }

  .btn-explore:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════════════════════════════
     HOW IT WORKS
  ═══════════════════════════════════════════════════════ */
  .how-section {
    background: var(--lightest, #f4faf4);
    padding: 5rem 1.5rem;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    position: relative;
  }

  .step-card {
    text-align: center;
    padding: 2rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-num {
    font-size: 3.5rem;
    font-weight: 900;
    color: rgba(40, 132, 43, 0.1);
    line-height: 1;
    margin-bottom: 0.5rem;
    font-family: "Roboto", sans-serif;
  }

  .step-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary, #28842b);
    color: #fff;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.1rem;
    box-shadow: 0 4px 16px rgba(40, 132, 43, 0.28);
  }

  .step-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.5rem;
  }

  .step-desc {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.65;
    max-width: 200px;
    margin: 0 auto;
  }

  /* Dashed connector line between steps */
  .step-connector {
    position: absolute;
    top: 5.25rem;
    right: -12%;
    width: 24%;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      var(--primary, #28842b) 0,
      var(--primary, #28842b) 6px,
      transparent 6px,
      transparent 14px
    );
    opacity: 0.3;
  }

  /* ═══════════════════════════════════════════════════════
     TESTIMONIALS
  ═══════════════════════════════════════════════════════ */
  .testimonials-section {
    background: #fff;
    padding: 5rem 1.5rem;
    border-top: 1px solid #f1f5f9;
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .review-card {
    padding: 1.85rem;
    border-radius: 16px;
    border: 1px solid #e8edf3;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .review-card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
    transform: translateY(-3px);
  }

  .quote-icon {
    font-size: 1.5rem;
    color: var(--secondary, #ff5722);
    opacity: 0.3;
  }

  .review-text {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.75;
    font-style: italic;
    flex: 1;
    margin: 0;
  }

  .review-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .reviewer-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .reviewer-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--primary, #28842b);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .reviewer-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.1rem;
  }

  .reviewer-loc {
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0;
  }

  .stars-row {
    display: flex;
    gap: 2px;
  }

  .star {
    font-size: 0.78rem;
    color: #e2e8f0;
  }

  .star.filled {
    color: #ecc106;
  }

  /* ═══════════════════════════════════════════════════════
     BOTTOM CTA BANNER
  ═══════════════════════════════════════════════════════ */
  .cta-section {
    background: linear-gradient(135deg, #ff5722 0%, #ff8a65 100%);
    padding: 5.5rem 1.5rem;
    text-align: center;
  }

  .cta-inner {
    max-width: 640px;
    margin: 0 auto;
  }

  .cta-eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
    margin-bottom: 0.85rem;
  }

  .cta-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 1rem;
    line-height: 1.1;
  }

  .cta-sub {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
    margin: 0 0 2.25rem;
  }

  .cta-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cta-btn-primary {
    padding: 0.9rem 2.25rem;
    border-radius: 10px;
    background: #fff;
    color: #ff5722;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .cta-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
  }

  .cta-btn-ghost {
    padding: 0.9rem 2.25rem;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }

  .cta-btn-ghost:hover {
    border-color: #fff;
    background: rgba(255, 255, 255, 0.12);
  }

  /* ═══════════════════════════════════════════════════════
     RESPONSIVE
  ═══════════════════════════════════════════════════════ */
  @media (max-width: 960px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .meals-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .reviews-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .steps-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .step-connector {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .features-grid {
      grid-template-columns: 1fr;
    }

    .meals-grid {
      grid-template-columns: 1fr;
    }

    .reviews-grid {
      grid-template-columns: 1fr;
    }

    .section-head:not(.centered) {
      flex-direction: column;
      align-items: flex-start;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .cta-btn-primary,
    .cta-btn-ghost {
      width: 100%;
      text-align: center;
    }
  }
`;

export default Wrapper;
