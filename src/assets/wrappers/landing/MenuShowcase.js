import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--ink);
  color: var(--ink-text);
  padding: clamp(5rem, 9vw, 8rem) 0;
  scroll-margin-top: 5rem;

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 3.5rem;
  }

  .menu-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--ink-surface);
    border: 1px solid var(--ink-border);
    color: var(--ink-text);
    transition: border-color 0.3s;

    &:hover { border-color: rgba(53, 132, 56, 0.6); }

    &.is-skeleton {
      min-height: 26rem;
      background: linear-gradient(110deg, var(--ink-surface) 30%, #1f3226 50%, var(--ink-surface) 70%);
      background-size: 200% 100%;
      animation: shimmer 1.4s linear infinite;
    }
  }

  @keyframes shimmer {
    to { background-position: -200% 0; }
  }

  .card-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;

    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }
  .media-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary), var(--ink-surface));
  }

  .card-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-pill);
    background: rgba(15, 26, 19, 0.7);
    backdrop-filter: blur(8px);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 2rem;
    padding: 1.5rem;

    h3 { font-size: 1.65rem; }
  }

  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .card-price { font-weight: 600; color: var(--ink-text-secondary); }
  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--secondary);
    span { display: inline-flex; }
  }

  .menu-foot {
    display: grid;
    justify-items: center;
    gap: 1.25rem;
    margin-top: 3.5rem;

    .fine-print { color: var(--ink-text-secondary); }
    .arrow-link { color: var(--ink-text); }
  }
`;

export default Wrapper;
