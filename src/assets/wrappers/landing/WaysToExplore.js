import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--secondary);
  color: var(--on-secondary);
  padding: clamp(5rem, 9vw, 8rem) 0;

  .section-heading p { color: rgba(36, 49, 41, 0.78); }

  .ways {
    display: grid;
    gap: 1.5rem;
    margin-top: 3.5rem;
  }

  .way-card {
    position: sticky;
    display: grid;
    overflow: hidden;
    border-radius: var(--radius-lg);
    transform-origin: top center;
    box-shadow: 0 -20px 50px -30px rgba(15, 26, 19, 0.55);
  }

  .way-copy {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: clamp(1.75rem, 4vw, 2.75rem);

    h3 { font-size: clamp(2.5rem, 5vw, 4rem); }
    p { max-width: 24rem; font-size: 1rem; opacity: 0.85; }
  }

  .way-num {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .way-foot {
    display: grid;
    gap: 0.9rem;
    margin-top: auto;
    padding-top: 2rem;
  }
  .way-tags { font-size: 0.8rem; font-weight: 600; opacity: 0.8; }
  .way-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    width: fit-content;
    font-weight: 600;
    color: inherit;
    border-bottom: 1px solid currentColor;
    padding-bottom: 2px;
  }

  .way-media {
    min-height: 16rem;
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }
  .media-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--ink), var(--primary));
  }

  .tone-soft { background: var(--surface-soft); color: var(--text-primary); }
  .tone-green { background: var(--primary); color: #fff; }
  .tone-cream { background: var(--background); color: var(--text-primary); }

  .fine-print { margin-top: 3rem; }

  @media (min-width: 768px) {
    .way-card {
      grid-template-columns: 1fr 1fr;
      min-height: 30rem;
    }
    .way-media { min-height: 100%; }
  }
`;

export default Wrapper;
